import Link from "next/link";
import { initials } from "@/lib/utils";
import type { PlayerCardDto } from "@/lib/types";

function tier(ovr: number) {
  if (ovr >= 90) return "from-[#2a2110] via-[#c9a227] to-[#f4e4a6]";
  if (ovr >= 85) return "from-[#8a6a12] via-[#e5c454] to-[#fff1b0]";
  if (ovr >= 75) return "from-[#5c6573] via-[#c5cdd8] to-[#f3f6fb]";
  return "from-[#6b4423] via-[#c08552] to-[#e8c39e]";
}

export function PlayerCard({ player }: { player: PlayerCardDto }) {
  const stats =
    player.primaryPosition === "GK"
      ? [
          ["DIV", player.div],
          ["HAN", player.han],
          ["KIC", player.kic],
          ["REF", player.ref],
          ["SPD", player.spd],
          ["POS", player.pos],
        ]
      : [
          ["PAC", player.pac],
          ["SHO", player.sho],
          ["PAS", player.pas],
          ["DRI", player.dri],
          ["DEF", player.def],
          ["PHY", player.phy],
        ];

  return (
    <Link href={`/players/${player.id}`} className="group block">
      <article
        className={`relative overflow-hidden rounded-[28px] bg-gradient-to-b ${tier(player.ovr)} p-[1px] shadow-xl transition group-hover:-translate-y-1`}
      >
        <div className="rounded-[27px] bg-navy-deep/85 p-4 text-ice">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-display text-5xl leading-none text-gold">{player.ovr}</p>
              <p className="text-xs font-semibold tracking-[0.2em] text-ice/70">
                {player.detailedPosition ?? player.primaryPosition}
              </p>
            </div>
            <p className="rounded-full bg-white/10 px-2 py-1 text-[10px] uppercase tracking-widest">
              {player.primaryPosition}
            </p>
          </div>
          <div className="mx-auto my-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gold/30 to-white/5 text-3xl font-display text-gold">
            {initials(player.name)}
          </div>
          <p className="truncate text-center text-sm font-semibold">{player.name}</p>
          <p className="mt-1 text-center text-[10px] uppercase tracking-[0.2em] text-ice/50">
            {player.number ? `#${player.number}` : "—"} · {player.nationality}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-1.5">
            {stats.map(([label, value]) => (
              <div key={label} className="rounded-lg bg-white/5 py-1 text-center">
                <p className="text-[8px] tracking-widest text-ice/50">{label}</p>
                <p className="font-display text-lg leading-none">{value ?? "—"}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
