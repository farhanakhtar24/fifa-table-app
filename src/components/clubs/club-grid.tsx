"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getClubs } from "@/app/actions/clubs";
import { Glass } from "@/components/ui/glass";
import { RatingPips } from "@/components/ui/rating-pips";
import { queryKeys } from "@/lib/query/keys";
import type { ClubDto } from "@/lib/types";

export function ClubGrid({ initial }: { initial: ClubDto[] }) {
  const [query, setQuery] = useState("");
  const { data } = useQuery({
    queryKey: queryKeys.clubs,
    queryFn: getClubs,
    initialData: initial,
  });

  const clubs = useMemo(
    () => (data ?? []).filter((club) => club.name.toLowerCase().includes(query.toLowerCase())),
    [data, query],
  );

  return (
    <div>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Find a club"
        className="mb-6 w-full rounded-2xl border border-white/10 bg-navy/40 px-4 py-3 outline-none ring-gold/40 focus:ring-2 sm:max-w-sm"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clubs.map((club) => (
          <Link key={club.id} href={`/clubs/${club.id}`}>
            <Glass className="flex h-full items-center gap-4 p-5 transition hover:-translate-y-1">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ice/90">
                <Image src={club.crestUrl} alt="" width={56} height={56} className="h-12 w-12 object-contain" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-white">{club.name}</p>
                <p className="text-xs text-ice/50">{club.league}</p>
                <div className="mt-3">
                  <RatingPips att={club.att} mid={club.mid} def={club.def} compact />
                </div>
              </div>
            </Glass>
          </Link>
        ))}
      </div>
    </div>
  );
}
