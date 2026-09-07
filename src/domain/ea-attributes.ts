import { hashString } from "./fixtures";
import type { PositionGroup } from "./ratings";

export type WorkRate = "Low" | "Medium" | "High";

export type EaAttributes = {
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
  attackingWorkRate: WorkRate;
  defensiveWorkRate: WorkRate;
  playstyles: string[];
};

const OUTFIELD_STYLES: Record<PositionGroup, string[]> = {
  GK: ["Far Throw", "Cross Claimer"],
  DEF: ["Block", "Anticipate", "Bruiser", "Jockey"],
  MID: ["Incisive Pass", "Tiki Taka", "Press Proven", "Relentless"],
  ATT: ["Finesse Shot", "Rapid", "Technical", "Chip Shot"],
};

export function mapStatsToEaAttributes(input: {
  name: string;
  position: PositionGroup;
  ovr: number;
}): EaAttributes {
  const ovr = clamp(input.ovr);
  const n = namedNoise(input.name);

  if (input.position === "GK") {
    return {
      ovr,
      pac: clamp(ovr - 28 + n(4)),
      sho: clamp(ovr - 32 + n(3)),
      pas: clamp(ovr - 18 + n(5)),
      dri: clamp(ovr - 22 + n(4)),
      def: clamp(ovr - 20 + n(4)),
      phy: clamp(ovr - 8 + n(5)),
      div: clamp(ovr + n(3)),
      han: clamp(ovr - 1 + n(4)),
      kic: clamp(ovr - 4 + n(5)),
      ref: clamp(ovr + 1 + n(3)),
      spd: clamp(ovr - 24 + n(6)),
      pos: clamp(ovr + n(4)),
      weakFoot: star(n(8), 1, 3),
      skillMoves: 1,
      attackingWorkRate: "Medium",
      defensiveWorkRate: "Medium",
      playstyles: pickStyles(OUTFIELD_STYLES.GK, n, 2),
    };
  }

  const weights = weightsFor(input.position);

  return {
    ovr,
    pac: clamp(ovr + weights.pac + n(6)),
    sho: clamp(ovr + weights.sho + n(6)),
    pas: clamp(ovr + weights.pas + n(5)),
    dri: clamp(ovr + weights.dri + n(5)),
    def: clamp(ovr + weights.def + n(6)),
    phy: clamp(ovr + weights.phy + n(5)),
    div: null,
    han: null,
    kic: null,
    ref: null,
    spd: null,
    pos: null,
    weakFoot: star(n(11), 2, 5),
    skillMoves: input.position === "ATT" ? star(n(9), 3, 5) : star(n(9), 2, 4),
    attackingWorkRate: workRate(n(3), input.position === "ATT"),
    defensiveWorkRate: workRate(n(5), input.position === "DEF"),
    playstyles: pickStyles(OUTFIELD_STYLES[input.position], n, 3),
  };
}

function weightsFor(position: PositionGroup) {
  if (position === "ATT") {
    return { pac: 2, sho: 3, pas: -4, dri: 2, def: -22, phy: -2 };
  }
  if (position === "MID") {
    return { pac: -2, sho: -4, pas: 3, dri: 1, def: -6, phy: -1 };
  }
  return { pac: -6, sho: -20, pas: -8, dri: -10, def: 4, phy: 3 };
}

function namedNoise(name: string): (spread: number) => number {
  const base = hashString(name);
  return (spread: number) => ((base % (spread * 2 + 1)) - spread);
}

function clamp(value: number): number {
  return Math.min(99, Math.max(40, Math.round(value)));
}

function star(noise: number, min: number, max: number): number {
  const value = min + Math.abs(noise) % (max - min + 1);
  return Math.min(max, Math.max(min, value));
}

function workRate(noise: number, preferHigh: boolean): WorkRate {
  if (preferHigh && noise >= 0) return "High";
  if (noise > 2) return "High";
  if (noise < -2) return "Low";
  return "Medium";
}

function pickStyles(pool: string[], noise: (spread: number) => number, count: number): string[] {
  const start = Math.abs(noise(pool.length)) % pool.length;
  return Array.from({ length: Math.min(count, pool.length) }, (_, index) => pool[(start + index) % pool.length]);
}
