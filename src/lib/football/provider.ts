export type CachedTeam = {
  externalId: number;
  name: string;
  shortName: string;
  crestUrl: string;
  league: string;
  att: number;
  mid: number;
  def: number;
};

export type CachedPlayer = {
  externalId: number;
  name: string;
  photoUrl: string | null;
  number: number | null;
  age: number | null;
  nationality: string | null;
  primaryPosition: "GK" | "DEF" | "MID" | "ATT";
  detailedPosition: string | null;
  ovr: number;
};

export interface FootballProvider {
  id: "dummy" | "api-football";
  listTeams(): Promise<CachedTeam[]>;
  getSquad(externalTeamId: number): Promise<CachedPlayer[]>;
}

export function hasFootballApiKey(): boolean {
  return Boolean(process.env.FOOTBALL_API_KEY);
}
