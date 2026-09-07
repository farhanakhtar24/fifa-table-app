"use server";

import { and, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { ensureDb } from "@/db/ensure";
import { playerAttributes, players, squads, teams } from "@/db/schema";
import type { ClubDto, PlayerCardDto, SquadDto } from "@/lib/types";

export async function getClubs(): Promise<ClubDto[]> {
  ensureDb();
  const db = getDb();
  return db
    .select()
    .from(teams)
    .all()
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(toClubDto);
}

export async function getSquad(teamId: string): Promise<SquadDto | null> {
  ensureDb();
  const db = getDb();
  const club = db.select().from(teams).where(eq(teams.id, teamId)).get();
  if (!club) return null;

  const rows = db
    .select({
      player: players,
      attrs: playerAttributes,
    })
    .from(squads)
    .innerJoin(players, eq(squads.playerId, players.id))
    .innerJoin(playerAttributes, eq(players.id, playerAttributes.playerId))
    .where(and(eq(squads.teamId, teamId), eq(squads.season, 2026)))
    .all();

  const ordered = rows.sort((a, b) => {
    const rank = (pos: string) => ({ GK: 0, DEF: 1, MID: 2, ATT: 3 }[pos] ?? 9);
    const byPos = rank(a.player.primaryPosition) - rank(b.player.primaryPosition);
    if (byPos !== 0) return byPos;
    return b.attrs.ovr - a.attrs.ovr;
  });

  return {
    club: toClubDto(club),
    players: ordered.map((row) => toPlayerDto(row.player, row.attrs, club)),
  };
}

export async function getPlayer(playerId: string): Promise<PlayerCardDto | null> {
  ensureDb();
  const db = getDb();
  const row = db
    .select({
      player: players,
      attrs: playerAttributes,
      squad: squads,
      team: teams,
    })
    .from(players)
    .innerJoin(playerAttributes, eq(players.id, playerAttributes.playerId))
    .innerJoin(squads, eq(players.id, squads.playerId))
    .innerJoin(teams, eq(squads.teamId, teams.id))
    .where(eq(players.id, playerId))
    .get();

  if (!row) return null;
  return toPlayerDto(row.player, row.attrs, row.team);
}

function toClubDto(team: typeof teams.$inferSelect): ClubDto {
  return {
    id: team.id,
    name: team.name,
    shortName: team.shortName,
    crestUrl: team.crestUrl,
    league: team.league,
    att: team.att,
    mid: team.mid,
    def: team.def,
  };
}

function toPlayerDto(
  player: typeof players.$inferSelect,
  attrs: typeof playerAttributes.$inferSelect,
  team: typeof teams.$inferSelect,
): PlayerCardDto {
  return {
    id: player.id,
    teamId: team.id,
    teamName: team.name,
    teamCrest: team.crestUrl,
    name: player.name,
    number: player.number,
    age: player.age,
    nationality: player.nationality,
    primaryPosition: player.primaryPosition,
    detailedPosition: player.detailedPosition,
    ovr: attrs.ovr,
    pac: attrs.pac,
    sho: attrs.sho,
    pas: attrs.pas,
    dri: attrs.dri,
    def: attrs.def,
    phy: attrs.phy,
    div: attrs.div,
    han: attrs.han,
    kic: attrs.kic,
    ref: attrs.ref,
    spd: attrs.spd,
    pos: attrs.pos,
    weakFoot: attrs.weakFoot,
    skillMoves: attrs.skillMoves,
    attackingWorkRate: attrs.attackingWorkRate,
    defensiveWorkRate: attrs.defensiveWorkRate,
    playstyles: JSON.parse(attrs.playstyles) as string[],
    source: attrs.source,
  };
}
