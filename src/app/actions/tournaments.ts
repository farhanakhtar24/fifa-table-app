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
  ensureDb();
  const db = getDb();
  const rows = db.select().from(tournaments).all();
  const allTeams = db.select().from(tournamentTeams).all();
  const allFixtures = db.select().from(fixtures).all();

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
  ensureDb();
  const db = getDb();
  const tournament = db.select().from(tournaments).where(eq(tournaments.id, id)).get();
  if (!tournament) return null;

  const snapshot = db.select().from(tournamentTeams).where(eq(tournamentTeams.tournamentId, id)).all();
  const games = db.select().from(fixtures).where(eq(fixtures.tournamentId, id)).all();
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
  ensureDb();
  const db = getDb();
  const parsed = createSchema.parse(input);
  const uniqueIds = [...new Set(parsed.teamIds)];
  if (uniqueIds.length < 3) {
    throw new Error("Pick at least 3 clubs.");
  }

  const selected = db.select().from(teams).all().filter((team) => uniqueIds.includes(team.id));
  if (selected.length !== uniqueIds.length) {
    throw new Error("One or more clubs could not be found.");
  }

  const id = crypto.randomUUID();
  db.insert(tournaments)
    .values({
      id,
      name: parsed.name,
      createdAt: new Date(),
    })
    .run();

  for (const team of selected) {
    db.insert(tournamentTeams)
      .values({
        tournamentId: id,
        teamId: team.id,
        name: team.name,
        shortName: team.shortName,
        crestUrl: team.crestUrl,
        att: team.att,
        mid: team.mid,
        def: team.def,
      })
      .run();
  }

  const pairings = assignMatchdays(generateRoundRobin(uniqueIds));
  pairings.forEach((pairing, index) => {
    db.insert(fixtures)
      .values({
        id: crypto.randomUUID(),
        tournamentId: id,
        homeTeamId: pairing.homeTeamId,
        awayTeamId: pairing.awayTeamId,
        homeGoals: null,
        awayGoals: null,
        played: false,
        matchday: pairing.matchday,
      })
      .run();
    void index;
  });

  revalidatePath("/");
  revalidatePath(`/t/${id}`);
  return { id };
}

export async function deleteTournament(id: string) {
  ensureDb();
  const db = getDb();
  db.delete(fixtures).where(eq(fixtures.tournamentId, id)).run();
  db.delete(tournamentTeams).where(eq(tournamentTeams.tournamentId, id)).run();
  db.delete(tournaments).where(eq(tournaments.id, id)).run();
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
