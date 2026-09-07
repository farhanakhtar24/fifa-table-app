export type PositionGroup = "GK" | "DEF" | "MID" | "ATT";

export type RatedPlayer = {
  position: PositionGroup;
  ovr: number;
};

export type TeamRatings = {
  att: number;
  mid: number;
  def: number;
};

export function deriveTeamRatings(players: RatedPlayer[]): TeamRatings {
  return {
    att: average(players.filter((player) => player.position === "ATT").map((player) => player.ovr), 75),
    mid: average(players.filter((player) => player.position === "MID").map((player) => player.ovr), 75),
    def: average(
      players.filter((player) => player.position === "DEF" || player.position === "GK").map((player) => player.ovr),
      75,
    ),
  };
}

export function deriveTeamRatingsFromStanding(input: {
  played: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  rank: number;
  teamCount: number;
}): TeamRatings {
  const played = Math.max(input.played, 1);
  const ppg = input.points / played;
  const gpg = input.goalsFor / played;
  const gapg = input.goalsAgainst / played;
  const rankScore = 1 - (input.rank - 1) / Math.max(input.teamCount - 1, 1);

  return {
    att: clampRating(62 + gpg * 10 + rankScore * 8),
    mid: clampRating(62 + ppg * 8 + rankScore * 10),
    def: clampRating(62 + (2.1 - gapg) * 10 + rankScore * 8),
  };
}

function average(values: number[], fallback: number): number {
  if (values.length === 0) return fallback;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function clampRating(value: number): number {
  return Math.min(94, Math.max(58, Math.round(value)));
}
