import type { PositionGroup } from "@/domain/ratings";

export type DummyPlayer = {
  name: string;
  pos: PositionGroup;
  slot: string;
  ovr: number;
  number: number;
  nationality: string;
  age: number;
};

export type DummyClub = {
  id: string;
  externalId: number;
  name: string;
  shortName: string;
  crestUrl: string;
  league: string;
  att: number;
  mid: number;
  def: number;
  players: DummyPlayer[];
};
