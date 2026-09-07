import { and, eq, sql } from "drizzle-orm";
import { getDb } from "@/db";
import { ensureDb } from "@/db/ensure";
import { playerAttributes, players, squads, teams } from "@/db/schema";
import { estimatePlayerOvr, mapStatsToEaAttributes } from "@/domain/ea-attributes";
import { deriveTeamRatings } from "@/domain/ratings";
import type { PositionGroup } from "@/domain/ratings";
import { ApiFootballProvider, QuotaExhaustedError } from "./api-football";
import { getFootballProvider } from "./index";
import { hasFootballApiKey, type CachedPlayer } from "./provider";

const CLUB_TTL_MS = 24 * 60 * 60 * 1000;
const SQUAD_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const MIN_COOLDOWN_MS = 60 * 60 * 1000;
const REQUEST_BUFFER = 5;

let lastManualSync = 0;

function teamId(externalId: number) {
  return `team-${externalId}`;
}

function playerId(externalId: number) {
  return `p-${externalId}`;
}

function isPosition(value: string): value is PositionGroup {
  return value === "GK" || value === "DEF" || value === "MID" || value === "ATT";
}

function saneAge(age: number | null) {
  return age != null && age >= 15 && age <= 50 ? age : null;
}

async function withRetry<T>(run: () => Promise<T>) {
  let last: unknown;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      return await run();
    } catch (error) {
      last = error;
      await new Promise((resolve) => setTimeout(resolve, 1200 * (attempt + 1)));
    }
  }
  throw last;
}

export function syncStatus() {
  return {
    provider: hasFootballApiKey() ? "api-football" : "dummy",
    canSync: hasFootballApiKey(),
    clubTtlHours: 24,
    squadTtlDays: 7,
  };
}

export async function syncClubsIfStale(force = false) {
  return syncFootballCache({ force });
}

export async function syncSquadIfStale(teamId: string, force = false) {
  if (!hasFootballApiKey()) {
    return { ok: true, skipped: true, reason: "no-api-key" as const };
  }

  await ensureDb();
  const db = getDb();
  const club = (await db.select().from(teams).where(eq(teams.id, teamId)).limit(1))[0];
  if (!club?.externalId) {
    return { ok: false, skipped: true, reason: "unknown-club" as const };
  }

  const provider = getFootballProvider();
  if (!(provider instanceof ApiFootballProvider)) {
    return { ok: true, skipped: true, reason: "no-api-key" as const };
  }

  const season = await provider.ensureSeason();
  const existingSquad = await db
    .select({ playerId: squads.playerId })
    .from(squads)
    .where(and(eq(squads.teamId, club.id), eq(squads.season, season)))
    .limit(1);

  const stale = Date.now() - club.syncedAt.getTime() > SQUAD_TTL_MS;
  if (!force && existingSquad.length > 0 && !stale) {
    return { ok: true, skipped: true, reason: "fresh" as const };
  }

  const squad = await provider.getSquad(club.externalId);
  await upsertSquad(club, squad, season);

  return { ok: true, skipped: false, teamId, players: squad.length };
}

export async function syncFootballCache(options?: { force?: boolean }) {
  const force = options?.force ?? false;

  if (!hasFootballApiKey()) {
    return { ok: true, skipped: true, reason: "no-api-key" as const };
  }

  if (!force && Date.now() - lastManualSync < MIN_COOLDOWN_MS) {
    return { ok: true, skipped: true, reason: "cooldown" as const };
  }

  await ensureDb();
  const db = getDb();
  const existing = await db.select().from(teams);
  const oldest = existing.reduce<number | null>((min, team) => {
    const time = team.syncedAt.getTime();
    return min == null || time < min ? time : min;
  }, null);

  const clubsStale = existing.length === 0 || oldest == null || Date.now() - oldest > CLUB_TTL_MS;
  const provider = getFootballProvider();
  if (!(provider instanceof ApiFootballProvider)) {
    return { ok: true, skipped: true, reason: "no-api-key" as const };
  }

  lastManualSync = Date.now();
  await provider.readQuota();

  let clubsUpserted = existing.length;
  if (force || clubsStale) {
    const catalog = await provider.listTeams();
    const now = new Date();
    if (catalog.length > 0) {
      await db
        .insert(teams)
        .values(
          catalog.map((club) => ({
            id: teamId(club.externalId),
            externalId: club.externalId,
            name: club.name,
            shortName: club.shortName,
            crestUrl: club.crestUrl,
            league: club.league,
            att: club.att,
            mid: club.mid,
            def: club.def,
            syncedAt: now,
          })),
        )
        .onConflictDoUpdate({
          target: teams.id,
          set: {
            externalId: sql`excluded.external_id`,
            name: sql`excluded.name`,
            shortName: sql`excluded.short_name`,
            crestUrl: sql`excluded.crest_url`,
            league: sql`excluded.league`,
            att: sql`excluded.att`,
            mid: sql`excluded.mid`,
            def: sql`excluded.def`,
            syncedAt: sql`excluded.synced_at`,
          },
        });
      clubsUpserted = catalog.length;
    }
  }

  const stored = await db.select().from(teams);
  const season = await provider.ensureSeason();
  const covered = await db
    .selectDistinct({ teamId: squads.teamId })
    .from(squads)
    .where(eq(squads.season, season));
  const hasSquad = new Set(covered.map((row) => row.teamId));

  let squadsSynced = 0;
  let playersSynced = 0;
  let stoppedForQuota = false;

  for (const club of stored) {
    if (provider.remaining != null && provider.remaining <= REQUEST_BUFFER) {
      stoppedForQuota = true;
      break;
    }
    if (!club.externalId) continue;
    if (!force && hasSquad.has(club.id)) continue;

    try {
      const squad = await provider.getSquad(club.externalId);
      const count = await upsertSquad(club, squad, season);
      hasSquad.add(club.id);
      squadsSynced += 1;
      playersSynced += count;
      console.info(`[football] saved ${club.name} (${count} players)`);
    } catch (error) {
      if (error instanceof QuotaExhaustedError) {
        stoppedForQuota = true;
        console.info(`[football] stopped at ${club.name}: ${error.message}`);
        break;
      }
      console.error(`[football] failed ${club.name}`, error);
    }
  }

  return {
    ok: true,
    skipped: false,
    clubs: clubsUpserted,
    squadsSynced,
    playersSynced,
    missingSquads: stored.filter((club) => club.externalId && !hasSquad.has(club.id)).length,
    apiCalls: provider.calls,
    remaining: provider.remaining,
    season,
    stoppedForQuota,
  };
}

async function upsertSquad(club: typeof teams.$inferSelect, squad: CachedPlayer[], season: number) {
  const db = getDb();
  const now = new Date();
  const teamRatings = { att: club.att, mid: club.mid, def: club.def };

  const rated = squad.map((player) => {
    const position = isPosition(player.primaryPosition) ? player.primaryPosition : "MID";
    const age = saneAge(player.age);
    const ovr = estimatePlayerOvr({
      name: player.name,
      position,
      age,
      team: teamRatings,
    });
    const id = playerId(player.externalId);
    return {
      id,
        player: { ...player, age },
      position,
      ovr,
      attrs: mapStatsToEaAttributes({ name: player.name, position, ovr }),
    };
  });

  if (rated.length === 0) return 0;

  await withRetry(() => db.delete(squads).where(and(eq(squads.teamId, club.id), eq(squads.season, season))));

  await withRetry(() =>
    db
      .insert(players)
      .values(
        rated.map((row) => ({
          id: row.id,
          externalId: row.player.externalId,
          name: row.player.name,
          photoUrl: row.player.photoUrl,
          number: row.player.number,
          age: row.player.age,
          nationality: row.player.nationality,
          primaryPosition: row.position,
          detailedPosition: row.player.detailedPosition,
          syncedAt: now,
        })),
      )
      .onConflictDoUpdate({
        target: players.id,
        set: {
          name: sql`excluded.name`,
          photoUrl: sql`excluded.photo_url`,
          number: sql`excluded.number`,
          age: sql`excluded.age`,
          nationality: sql`excluded.nationality`,
          primaryPosition: sql`excluded.primary_position`,
          detailedPosition: sql`excluded.detailed_position`,
          syncedAt: sql`excluded.synced_at`,
        },
      }),
  );

  await withRetry(() =>
    db
      .insert(playerAttributes)
      .values(
        rated.map((row) => ({
          playerId: row.id,
          ovr: row.attrs.ovr,
          pac: row.attrs.pac,
          sho: row.attrs.sho,
          pas: row.attrs.pas,
          dri: row.attrs.dri,
          def: row.attrs.def,
          phy: row.attrs.phy,
          div: row.attrs.div,
          han: row.attrs.han,
          kic: row.attrs.kic,
          ref: row.attrs.ref,
          spd: row.attrs.spd,
          pos: row.attrs.pos,
          weakFoot: row.attrs.weakFoot,
          skillMoves: row.attrs.skillMoves,
          attackingWorkRate: row.attrs.attackingWorkRate,
          defensiveWorkRate: row.attrs.defensiveWorkRate,
          playstyles: JSON.stringify(row.attrs.playstyles),
          source: "api-football",
        })),
      )
      .onConflictDoUpdate({
        target: playerAttributes.playerId,
        set: {
          ovr: sql`excluded.ovr`,
          pac: sql`excluded.pac`,
          sho: sql`excluded.sho`,
          pas: sql`excluded.pas`,
          dri: sql`excluded.dri`,
          def: sql`excluded.def`,
          phy: sql`excluded.phy`,
          div: sql`excluded.div`,
          han: sql`excluded.han`,
          kic: sql`excluded.kic`,
          ref: sql`excluded.ref`,
          spd: sql`excluded.spd`,
          pos: sql`excluded.pos`,
          weakFoot: sql`excluded.weak_foot`,
          skillMoves: sql`excluded.skill_moves`,
          attackingWorkRate: sql`excluded.attacking_work_rate`,
          defensiveWorkRate: sql`excluded.defensive_work_rate`,
          playstyles: sql`excluded.playstyles`,
          source: sql`excluded.source`,
        },
      }),
  );

  await withRetry(() =>
    db
      .insert(squads)
      .values(rated.map((row) => ({ teamId: club.id, playerId: row.id, season })))
      .onConflictDoNothing(),
  );

  const ratings = deriveTeamRatings(rated.map((row) => ({ position: row.position, ovr: row.ovr })));
  await withRetry(() =>
    db
      .update(teams)
      .set({ att: ratings.att, mid: ratings.mid, def: ratings.def, syncedAt: now })
      .where(eq(teams.id, club.id)),
  );

  return rated.length;
}
