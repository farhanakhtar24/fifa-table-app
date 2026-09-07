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

function average(values: number[], fallback: number): number {
  if (values.length === 0) return fallback;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}
