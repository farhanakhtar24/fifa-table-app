import { cn } from "@/lib/utils";

export function RatingPips({
  att,
  mid,
  def,
  compact = false,
}: {
  att: number;
  mid: number;
  def: number;
  compact?: boolean;
}) {
  const items = [
    { label: "ATT", value: att },
    { label: "MID", value: mid },
    { label: "DEF", value: def },
  ];

  return (
    <div className={cn("flex gap-2", compact && "gap-1")}>
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            "rounded-xl border border-border bg-muted text-center",
            compact ? "min-w-12 px-1.5 py-1" : "min-w-16 px-2 py-1.5",
          )}
        >
          <p className="text-[9px] uppercase tracking-widest text-muted-foreground">{item.label}</p>
          <p className="font-display text-lg leading-none text-gold">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
