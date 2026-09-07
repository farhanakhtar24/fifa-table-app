"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function TournamentTabs({ id }: { id: string }) {
  const pathname = usePathname();
  const items = [
    { href: `/t/${id}`, label: "Table" },
    { href: `/t/${id}/fixtures`, label: "Fixtures" },
  ];

  return (
    <div className="flex gap-2">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold",
              active ? "bg-gold text-navy" : "bg-white/5 text-ice/80 hover:bg-white/10",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
