import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "ghost" | "danger";

export function Button({
  className,
  variant = "gold",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
        variant === "gold" && "bg-gold text-navy hover:bg-gold-dim",
        variant === "ghost" && "border border-white/15 bg-white/5 text-ice hover:bg-white/10",
        variant === "danger" && "bg-rose-500/90 text-white hover:bg-rose-400",
        className,
      )}
      {...props}
    />
  );
}
