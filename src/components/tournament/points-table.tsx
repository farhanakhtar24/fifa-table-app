import Image from "next/image";
import { Glass } from "@/components/ui/glass";
import { formColor } from "@/lib/utils";
import type { TableEntry } from "@/lib/types";

export function PointsTable({ rows }: { rows: TableEntry[] }) {
  return (
    <Glass className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-muted text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <tr>
              {["#", "Club", "P", "W", "D", "L", "GF", "GA", "GD", "Pts"].map((heading) => (
                <th key={heading} className="px-3 py-3 text-left font-medium">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.teamId} className="border-t border-border odd:bg-muted/40">
                <td className="px-3 py-3 font-display text-xl text-gold">{index + 1}</td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ice/90">
                      <Image src={row.team.crestUrl} alt="" width={28} height={28} className="h-6 w-6 object-contain" />
                    </span>
                    <span className="font-semibold text-foreground">{row.team.name}</span>
                  </div>
                </td>
                <td className="px-3 py-3">{row.played}</td>
                <td className="px-3 py-3">{row.won}</td>
                <td className="px-3 py-3">{row.drawn}</td>
                <td className="px-3 py-3">{row.lost}</td>
                <td className="px-3 py-3">{row.goalsFor}</td>
                <td className="px-3 py-3">{row.goalsAgainst}</td>
                <td className={`px-3 py-3 ${formColor(row.goalDifference)}`}>
                  {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                </td>
                <td className="px-3 py-3 font-display text-2xl text-gold">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Glass>
  );
}
