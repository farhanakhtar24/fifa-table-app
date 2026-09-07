import "server-only";

import { dummyClubs } from "@/data/dummy/clubs";
import { mapStatsToEaAttributes } from "@/domain/ea-attributes";
import { assignMatchdays, generateRoundRobin } from "@/domain/fixtures";
import { getDb, getSqlite } from "./index";
import { fixtures, playerAttributes, players, squads, teams, tournamentTeams, tournaments } from "./schema";

const SEASON = 2026;

export function seedIfEmpty() {
  const existing = getSqlite().prepare("SELECT COUNT(*) as count FROM teams").get() as { count: number };
  if (existing.count > 0) return;

  const now = new Date();
  const db = getDb();

  for (const club of dummyClubs) {
    db.insert(teams)
      .values({
        id: club.id,
        externalId: club.externalId,
        name: club.name,
        shortName: club.shortName,
        crestUrl: club.crestUrl,
        league: club.league,
        att: club.att,
        mid: club.mid,
        def: club.def,
        syncedAt: now,
      })
      .run();

    club.players.forEach((player, index) => {
      const playerId = `${club.id}-${index + 1}`;
      const attrs = mapStatsToEaAttributes({
        name: player.name,
        position: player.pos,
        ovr: player.ovr,
      });

      db.insert(players)
        .values({
          id: playerId,
          externalId: club.externalId * 100 + index,
          name: player.name,
          photoUrl: null,
          number: player.number,
          age: player.age,
          nationality: player.nationality,
          primaryPosition: player.pos,
          detailedPosition: player.slot,
          syncedAt: now,
        })
        .run();

      db.insert(playerAttributes)
        .values({
          playerId,
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
          playstyles: JSON.stringify(attrs.playstyles),
          source: "dummy",
        })
        .run();

      db.insert(squads)
        .values({
          teamId: club.id,
          playerId,
          season: SEASON,
        })
        .run();
    });
  }

  seedDemoTournament();
}

function seedDemoTournament() {
  const db = getDb();
  const id = "demo-friday-night";
  const teamIds = ["real-madrid", "barcelona", "bayern", "liverpool"];
  const clubMap = new Map(dummyClubs.map((club) => [club.id, club]));

  db.insert(tournaments)
    .values({
      id,
      name: "Friday Night",
      createdAt: new Date(),
    })
    .run();

  for (const teamId of teamIds) {
    const club = clubMap.get(teamId);
    if (!club) continue;
    db.insert(tournamentTeams)
      .values({
        tournamentId: id,
        teamId: club.id,
        name: club.name,
        shortName: club.shortName,
        crestUrl: club.crestUrl,
        att: club.att,
        mid: club.mid,
        def: club.def,
      })
      .run();
  }

  const pairings = assignMatchdays(generateRoundRobin(teamIds));
  const preset: Record<string, [number, number]> = {
    "real-madrid|barcelona": [3, 2],
    "bayern|liverpool": [1, 1],
    "real-madrid|bayern": [2, 1],
  };

  pairings.forEach((pairing, index) => {
    const key = `${pairing.homeTeamId}|${pairing.awayTeamId}`;
    const score = preset[key];

    db.insert(fixtures)
      .values({
        id: `demo-${index + 1}`,
        tournamentId: id,
        homeTeamId: pairing.homeTeamId,
        awayTeamId: pairing.awayTeamId,
        homeGoals: score?.[0] ?? null,
        awayGoals: score?.[1] ?? null,
        played: Boolean(score),
        matchday: pairing.matchday,
      })
      .run();
  });
}
