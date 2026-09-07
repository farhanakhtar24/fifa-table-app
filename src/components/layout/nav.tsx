"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Nights" },
  { href: "/clubs", label: "Clubs" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/Assets/ucl-logo.png" alt="Champions Night" width={36} height={36} />
          <div>
            <p className="font-display text-2xl leading-none text-gold">Champions Night</p>
            <p className="text-[10px] uppercase tracking-[0.28em] text-ice/60">FIFA table</p>
          </div>
        </Link>
        <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-navy/50 px-2 py-1 backdrop-blur-xl">
          {links.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition",
                  active ? "bg-gold text-navy" : "text-ice/80 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/new"
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-gold hover:bg-white/15"
          >
            New night
          </Link>
        </nav>
      </div>
    </header>
  );
}
