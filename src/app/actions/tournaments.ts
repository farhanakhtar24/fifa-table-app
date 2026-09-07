"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/db";
import { ensureDb } from "@/db/ensure";
import { fixtures, teams, tournamentTeams, tournaments } from "@/db/schema";
import { assignMatchdays, generateRoundRobin } from "@/domain/fixtures";
import { computePointsTable } from "@/domain/points-table";
import type {
  FixtureDto,
  TournamentDetail,
  TournamentSummary,
  TournamentTeamDto,
} from "@/lib/types";

const createSchema = z.object({
  name: z.string().trim().min(2).max(40),
  teamIds: z.array(z.string().min(1)).min(3).max(8),
});

export async function getTournaments(): Promise<TournamentSummary[]> {
  await ensureDb();
  const db = getDb();
  const rows = await db.select().from(tournaments);
  const allTeams = await db.select().from(tournamentTeams);
  const allFixtures = await db.select().from(fixtures);

  return rows
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .map((tournament) => {
      const snapshot = allTeams.filter((team) => team.tournamentId === tournament.id);
      const games = allFixtures.filter((fixture) => fixture.tournamentId === tournament.id);
      return {
        id: tournament.id,
        name: tournament.name,
        createdAt: tournament.createdAt.toISOString(),
        teams: snapshot.map(toTeamDto),
        played: games.filter((fixture) => fixture.played).length,
        total: games.length,
      };
    });
}

export async function getTournament(id: string): Promise<TournamentDetail | null> {
  await ensureDb();
  const db = getDb();
  const tournament = (await db.select().from(tournaments).where(eq(tournaments.id, id)).limit(1))[0];
  if (!tournament) return null;

  const snapshot = await db.select().from(tournamentTeams).where(eq(tournamentTeams.tournamentId, id));
  const games = await db.select().from(fixtures).where(eq(fixtures.tournamentId, id));
  const teamMap = new Map(snapshot.map((team) => [team.teamId, toTeamDto(team)]));

  const table = computePointsTable(
    snapshot.map((team) => team.teamId),
    games.map((fixture) => ({
      homeTeamId: fixture.homeTeamId,
      awayTeamId: fixture.awayTeamId,
      homeGoals: fixture.homeGoals,
      awayGoals: fixture.awayGoals,
    })),
  );

  return {
    id: tournament.id,
    name: tournament.name,
    createdAt: tournament.createdAt.toISOString(),
    teams: snapshot.map(toTeamDto),
    fixtures: games
      .map((fixture) => toFixtureDto(fixture, teamMap))
      .filter((fixture): fixture is FixtureDto => fixture !== null)
      .sort((a, b) => a.matchday - b.matchday || a.id.localeCompare(b.id)),
    table: table.flatMap((row) => {
      const team = teamMap.get(row.teamId);
      return team ? [{ ...row, team }] : [];
    }),
  };
}

export async function createTournament(input: { name: string; teamIds: string[] }) {
  await ensureDb();
  const db = getDb();
  const parsed = createSchema.parse(input);
  const uniqueIds = [...new Set(parsed.teamIds)];
  if (uniqueIds.length < 3) {
    throw new Error("Pick at least 3 clubs.");
  }

  const catalog = await db.select().from(teams);
  const selected = catalog.filter((team) => uniqueIds.includes(team.id));
  if (selected.length !== uniqueIds.length) {
    throw new Error("One or more clubs could not be found.");
  }

  const id = crypto.randomUUID();
  await db.insert(tournaments).values({
    id,
    name: parsed.name,
    createdAt: new Date(),
  });

  for (const team of selected) {
    await db.insert(tournamentTeams).values({
      tournamentId: id,
      teamId: team.id,
      name: team.name,
      shortName: team.shortName,
      crestUrl: team.crestUrl,
      att: team.att,
      mid: team.mid,
      def: team.def,
    });
  }

  const pairings = assignMatchdays(generateRoundRobin(uniqueIds));
  for (const pairing of pairings) {
    await db.insert(fixtures).values({
      id: crypto.randomUUID(),
      tournamentId: id,
      homeTeamId: pairing.homeTeamId,
      awayTeamId: pairing.awayTeamId,
      homeGoals: null,
      awayGoals: null,
      played: false,
      matchday: pairing.matchday,
    });
  }

  revalidatePath("/");
  revalidatePath(`/t/${id}`);
  return { id };
}

export async function deleteTournament(id: string) {
  await ensureDb();
  const db = getDb();
  await db.delete(fixtures).where(eq(fixtures.tournamentId, id));
  await db.delete(tournamentTeams).where(eq(tournamentTeams.tournamentId, id));
  await db.delete(tournaments).where(eq(tournaments.id, id));
  revalidatePath("/");
}

function toTeamDto(team: typeof tournamentTeams.$inferSelect): TournamentTeamDto {
  return {
    id: team.teamId,
    teamId: team.teamId,
    name: team.name,
    shortName: team.shortName,
    crestUrl: team.crestUrl,
    league: "",
    att: team.att,
    mid: team.mid,
    def: team.def,
  };
}

function toFixtureDto(
  fixture: typeof fixtures.$inferSelect,
  teamMap: Map<string, TournamentTeamDto>,
): FixtureDto | null {
  const home = teamMap.get(fixture.homeTeamId);
  const away = teamMap.get(fixture.awayTeamId);
  if (!home || !away) return null;

  return {
    id: fixture.id,
    matchday: fixture.matchday,
    played: fixture.played,
    homeGoals: fixture.homeGoals,
    awayGoals: fixture.awayGoals,
    home,
    away,
  };
}
