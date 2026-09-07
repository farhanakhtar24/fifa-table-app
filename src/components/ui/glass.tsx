import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Glass({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-card text-card-foreground shadow-[0_20px_80px_rgba(6,18,70,0.12)] backdrop-blur-xl dark:shadow-[0_20px_80px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
