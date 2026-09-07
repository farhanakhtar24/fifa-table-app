import { deriveTeamRatingsFromStanding } from "@/domain/ratings";
import type { PositionGroup } from "@/domain/ratings";
import { COMPETITIONS } from "./competitions";
import type { CachedPlayer, CachedTeam, FootballProvider } from "./provider";

const BASE_URL = "https://v3.football.api-sports.io";
const REQUEST_BUFFER = 5;

type ApiEnvelope<T> = {
  errors: unknown;
  results: number;
  response: T;
};

type StandingRow = {
  rank: number;
  points: number;
  team: { id: number; name: string; logo: string };
  all: {
    played: number;
    goals: { for: number; against: number };
  };
};

type StandingResponse = Array<{
  league: { standings: StandingRow[][] };
}>;

type TeamListResponse = Array<{
  team: { id: number; name: string; logo: string };
}>;

type SquadResponse = Array<{
  players: Array<{
    id: number;
    name: string;
    age: number | null;
    number: number | string | null;
    position: string;
    photo: string | null;
  }>;
}>;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shortName(name: string) {
  const parts = name.replace(/[^a-zA-Z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 3).toUpperCase();
  return parts
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function mapPosition(value: string): PositionGroup {
  const normalized = value.toLowerCase();
  if (normalized.includes("goal")) return "GK";
  if (normalized.includes("def")) return "DEF";
  if (normalized.includes("mid")) return "MID";
  if (normalized.includes("att") || normalized.includes("forw")) return "ATT";
  return "MID";
}

function mapSlot(position: PositionGroup) {
  if (position === "GK") return "GK";
  if (position === "DEF") return "CB";
  if (position === "MID") return "CM";
  return "ST";
}

export class QuotaExhaustedError extends Error {
  constructor(message = "API-Football daily quota exhausted") {
    super(message);
    this.name = "QuotaExhaustedError";
  }
}

export class ApiFootballProvider implements FootballProvider {
  id = "api-football" as const;
  remaining: number | null = null;
  minuteRemaining: number | null = null;
  calls = 0;
  season: number | null = null;
  private standingsCache = new Map<string, StandingRow[]>();

  constructor(private readonly apiKey: string) {}

  async readQuota() {
    await this.request<unknown>("/status");
    return this.remaining;
  }

  async ensureSeason() {
    this.season ??= await this.resolveSeason();
    return this.season;
  }

  async listTeams(): Promise<CachedTeam[]> {
    const season = await this.resolveSeason();
    this.season = season;
    const byId = new Map<number, CachedTeam>();

    for (const competition of COMPETITIONS) {
      let rows = await this.standings(competition.id, season);
      if (rows.length === 0) {
        rows = await this.teamsAsStandings(competition.id, season);
      }

      const teamCount = Math.max(rows.length, 1);
      for (const row of rows) {
        if (byId.has(row.team.id)) continue;
        const ratings = deriveTeamRatingsFromStanding({
          played: row.all.played,
          points: row.points,
          goalsFor: row.all.goals.for,
          goalsAgainst: row.all.goals.against,
          rank: row.rank,
          teamCount,
        });

        byId.set(row.team.id, {
          externalId: row.team.id,
          name: row.team.name,
          shortName: shortName(row.team.name),
          crestUrl: row.team.logo,
          league: competition.name,
          att: ratings.att,
          mid: ratings.mid,
          def: ratings.def,
        });
      }
    }

    return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));
  }

  async getSquad(externalTeamId: number): Promise<CachedPlayer[]> {
    const payload = await this.request<SquadResponse>(`/players/squads?team=${externalTeamId}`);
    const players = payload[0]?.players ?? [];

    return players.map((player) => {
      const position = mapPosition(player.position ?? "");
      const number = typeof player.number === "string" ? Number.parseInt(player.number, 10) : player.number;

      return {
        externalId: player.id,
        name: player.name,
        photoUrl: player.photo ?? null,
        number: Number.isFinite(number) ? Number(number) : null,
        age: player.age ?? null,
        nationality: null,
        primaryPosition: position,
        detailedPosition: mapSlot(position),
        ovr: 75,
      };
    });
  }

  private async resolveSeason(): Promise<number> {
    for (const year of [2024, 2023, 2022]) {
      const rows = await this.standings(39, year);
      if (rows.length > 0) return year;
    }

    return 2024;
  }

  private async standings(leagueId: number, season: number): Promise<StandingRow[]> {
    const key = `${leagueId}:${season}`;
    const cached = this.standingsCache.get(key);
    if (cached) return cached;

    const payload = await this.request<StandingResponse>(`/standings?league=${leagueId}&season=${season}`);
    const rows = payload[0]?.league.standings.flat() ?? [];
    this.standingsCache.set(key, rows);
    return rows;
  }

  private async teamsAsStandings(leagueId: number, season: number): Promise<StandingRow[]> {
    const payload = await this.request<TeamListResponse>(`/teams?league=${leagueId}&season=${season}`);
    return payload.map((row, index) => ({
      rank: index + 1,
      points: 0,
      team: row.team,
      all: { played: 0, goals: { for: 0, against: 0 } },
    }));
  }

  private async request<T>(path: string, attempt = 0): Promise<T> {
    if (this.remaining != null && this.remaining <= REQUEST_BUFFER) {
      throw new QuotaExhaustedError();
    }
    if (this.minuteRemaining != null && this.minuteRemaining <= 1) {
      console.info("[football] per-minute limit, waiting 65s");
      await sleep(65_000);
    }

    this.calls += 1;
    console.info(`[football] GET ${path} (#${this.calls})`);
    await sleep(6500);

    const response = await fetch(`${BASE_URL}${path}`, {
      headers: { "x-apisports-key": this.apiKey },
      cache: "no-store",
    });

    const daily = response.headers.get("x-ratelimit-requests-remaining");
    const minute = response.headers.get("x-ratelimit-remaining");
    if (daily) this.remaining = Number(daily);
    if (minute) this.minuteRemaining = Number(minute);

    if (response.status === 429) {
      if (attempt >= 2) throw new QuotaExhaustedError(`API-Football 429 for ${path}`);
      console.info("[football] 429, waiting 65s then retry");
      await sleep(65_000);
      this.calls -= 1;
      return this.request<T>(path, attempt + 1);
    }

    if (!response.ok) {
      throw new Error(`API-Football ${response.status} for ${path}`);
    }

    const json = (await response.json()) as ApiEnvelope<T>;
    if (json.errors && !Array.isArray(json.errors) && Object.keys(json.errors as object).length > 0) {
      const message = JSON.stringify(json.errors);
      if (message.includes("Free plans do not have access to this season")) {
        return [] as T;
      }
      throw new Error(`API-Football error on ${path}: ${message}`);
    }

    return json.response;
  }
}
