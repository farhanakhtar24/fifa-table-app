import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
  if (goalDifference > 0) return "text-emerald-600 dark:text-emerald-300";
  if (goalDifference < 0) return "text-rose-600 dark:text-rose-300";
  return "text-muted-foreground";
}
