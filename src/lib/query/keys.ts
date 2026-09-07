export const queryKeys = {
  tournaments: ["tournaments"] as const,
  tournament: (id: string) => ["tournament", id] as const,
  clubs: ["clubs"] as const,
  squad: (teamId: string) => ["squad", teamId] as const,
  player: (id: string) => ["player", id] as const,
};
