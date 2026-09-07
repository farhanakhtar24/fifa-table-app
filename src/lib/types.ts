import type { TableRow } from "@/domain/points-table";

export type ClubDto = {
  id: string;
  name: string;
  shortName: string;
  crestUrl: string;
  league: string;
  att: number;
  mid: number;
  def: number;
};

export type TournamentTeamDto = ClubDto & {
  teamId: string;
};

export type FixtureDto = {
  id: string;
  matchday: number;
  played: boolean;
  homeGoals: number | null;
  awayGoals: number | null;
  home: TournamentTeamDto;
  away: TournamentTeamDto;
};

export type TournamentSummary = {
  id: string;
  name: string;
  createdAt: string;
  teams: TournamentTeamDto[];
  played: number;
  total: number;
};

export type TableEntry = TableRow & {
  team: TournamentTeamDto;
};

export type TournamentDetail = {
  id: string;
  name: string;
  createdAt: string;
  teams: TournamentTeamDto[];
  fixtures: FixtureDto[];
  table: TableEntry[];
};

export type PlayerCardDto = {
  id: string;
  teamId: string;
  teamName: string;
  teamCrest: string;
  name: string;
  number: number | null;
  age: number | null;
  nationality: string | null;
  primaryPosition: string;
  detailedPosition: string | null;
  ovr: number;
  pac: number;
  sho: number;
  pas: number;
  dri: number;
  def: number;
  phy: number;
  div: number | null;
  han: number | null;
  kic: number | null;
  ref: number | null;
  spd: number | null;
  pos: number | null;
  weakFoot: number;
  skillMoves: number;
  attackingWorkRate: string;
  defensiveWorkRate: string;
  playstyles: string[];
  source: string;
};

export type SquadDto = {
  club: ClubDto;
  players: PlayerCardDto[];
};
