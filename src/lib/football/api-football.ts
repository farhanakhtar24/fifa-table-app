import type { CachedPlayer, CachedTeam, FootballProvider } from "./provider";

export class ApiFootballProvider implements FootballProvider {
  id = "api-football" as const;

  constructor(private readonly apiKey: string) {}

  async listTeams(): Promise<CachedTeam[]> {
    void this.apiKey;
    throw new Error("API-Football is not wired yet. Add FOOTBALL_API_KEY and complete phase 4.");
  }

  async getSquad(): Promise<CachedPlayer[]> {
    void this.apiKey;
    throw new Error("API-Football is not wired yet. Add FOOTBALL_API_KEY and complete phase 4.");
  }
}
