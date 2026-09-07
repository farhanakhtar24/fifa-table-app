export type Pairing = {
  homeTeamId: string;
  awayTeamId: string;
};

export function generateRoundRobin(teamIds: string[]): Pairing[] {
  if (teamIds.length < 2) {
    return [];
  }

  const fixtures: Pairing[] = [];

  for (let i = 0; i < teamIds.length; i += 1) {
    for (let j = i + 1; j < teamIds.length; j += 1) {
      fixtures.push({
        homeTeamId: teamIds[i],
        awayTeamId: teamIds[j],
      });
    }
  }

  return shuffleDeterministic(fixtures, teamIds.join("|"));
}

export function assignMatchdays(fixtures: Pairing[]): (Pairing & { matchday: number })[] {
  const teamsPerMatchday = Math.max(1, Math.floor(new Set(flattenIds(fixtures)).size / 2));
  return fixtures.map((fixture, index) => ({
    ...fixture,
    matchday: Math.floor(index / teamsPerMatchday) + 1,
  }));
}

function flattenIds(fixtures: Pairing[]): string[] {
  return fixtures.flatMap((fixture) => [fixture.homeTeamId, fixture.awayTeamId]);
}

function shuffleDeterministic<T>(items: T[], seed: string): T[] {
  const copy = [...items];
  let state = hashString(seed);

  for (let i = copy.length - 1; i > 0; i -= 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const j = state % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export function hashString(value: string): number {
  let hash = 2166136261;

  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}
