export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function formColor(goalDifference: number): string {
  if (goalDifference > 0) return "text-emerald-300";
  if (goalDifference < 0) return "text-rose-300";
  return "text-ice/70";
}
