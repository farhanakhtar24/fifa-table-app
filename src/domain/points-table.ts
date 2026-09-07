export type FixtureScore = {
  homeTeamId: string;
  awayTeamId: string;
  homeGoals: number | null;
  awayGoals: number | null;
};

export type TableRow = {
  teamId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
};

export function computePointsTable(teamIds: string[], fixtures: FixtureScore[]): TableRow[] {
  const rows = new Map<string, TableRow>();

  for (const teamId of teamIds) {
    rows.set(teamId, emptyRow(teamId));
  }

  for (const fixture of fixtures) {
    if (fixture.homeGoals === null || fixture.awayGoals === null) {
      continue;
    }

    const home = rows.get(fixture.homeTeamId);
    const away = rows.get(fixture.awayTeamId);
    if (!home || !away) {
      continue;
    }

    applyResult(home, away, fixture.homeGoals, fixture.awayGoals);
  }

  return [...rows.values()].sort(compareTableRows);
}

export function compareTableRows(a: TableRow, b: TableRow): number {
  if (b.points !== a.points) return b.points - a.points;
  if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
  if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
  return a.teamId.localeCompare(b.teamId);
}

function emptyRow(teamId: string): TableRow {
  return {
    teamId,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
  };
}

function applyResult(home: TableRow, away: TableRow, homeGoals: number, awayGoals: number) {
  home.played += 1;
  away.played += 1;
  home.goalsFor += homeGoals;
  home.goalsAgainst += awayGoals;
  away.goalsFor += awayGoals;
  away.goalsAgainst += homeGoals;
  home.goalDifference = home.goalsFor - home.goalsAgainst;
  away.goalDifference = away.goalsFor - away.goalsAgainst;

  if (homeGoals > awayGoals) {
    home.won += 1;
    away.lost += 1;
    home.points += 3;
    return;
  }

  if (homeGoals < awayGoals) {
    away.won += 1;
    home.lost += 1;
    away.points += 3;
    return;
  }

  home.drawn += 1;
  away.drawn += 1;
  home.points += 1;
  away.points += 1;
}
