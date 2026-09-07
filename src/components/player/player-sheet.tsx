import Image from "next/image";
import { Glass } from "@/components/ui/glass";
import { PlayerCard } from "./player-card";
import type { PlayerCardDto } from "@/lib/types";

export function PlayerSheet({ player }: { player: PlayerCardDto }) {
  const lines = [
    ["Club", player.teamName],
    ["Nation", player.nationality ?? "—"],
    ["Age", player.age ?? "—"],
    ["Number", player.number ?? "—"],
    ["Position", player.detailedPosition ?? player.primaryPosition],
    ["Weak foot", `${player.weakFoot}★`],
    ["Skill moves", `${player.skillMoves}★`],
    ["Work rates", `${player.attackingWorkRate} / ${player.defensiveWorkRate}`],
    ["Source", player.source],
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <PlayerCard player={player} />
      <Glass className="p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ice/90">
            <Image src={player.teamCrest} alt="" width={40} height={40} />
          </span>
          <div>
            <p className="font-display text-4xl text-white">{player.name}</p>
            <p className="text-xs uppercase tracking-[0.22em] text-ice/50">{player.teamName}</p>
          </div>
        </div>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          {lines.map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white/5 px-4 py-3">
              <dt className="text-[10px] uppercase tracking-widest text-ice/40">{label}</dt>
              <dd className="text-sm font-semibold text-white">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex flex-wrap gap-2">
          {player.playstyles.map((style) => (
            <span key={style} className="rounded-full border border-gold/30 px-3 py-1 text-xs text-gold">
              {style}
            </span>
          ))}
        </div>
      </Glass>
    </div>
  );
}
