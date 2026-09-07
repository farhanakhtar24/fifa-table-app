import { dummyClubs } from "@/data/dummy/clubs";
import type { CachedPlayer, CachedTeam, FootballProvider } from "./provider";

export class DummyFootballProvider implements FootballProvider {
  id = "dummy" as const;

  async listTeams(): Promise<CachedTeam[]> {
    return dummyClubs.map((club) => ({
      externalId: club.externalId,
      name: club.name,
      shortName: club.shortName,
      crestUrl: club.crestUrl,
      league: club.league,
      att: club.att,
      mid: club.mid,
      def: club.def,
    }));
  }

  async getSquad(externalTeamId: number): Promise<CachedPlayer[]> {
    const club = dummyClubs.find((item) => item.externalId === externalTeamId);
    if (!club) return [];

    return club.players.map((player, index) => ({
      externalId: club.externalId * 100 + index,
      name: player.name,
      photoUrl: null,
      number: player.number,
      age: player.age,
      nationality: player.nationality,
      primaryPosition: player.pos,
      detailedPosition: player.slot,
      ovr: player.ovr,
    }));
  }
}
