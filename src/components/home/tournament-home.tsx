"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getTournaments } from "@/app/actions/tournaments";
import { queryKeys } from "@/lib/query/keys";
import type { TournamentSummary } from "@/lib/types";
import { TournamentCard } from "./tournament-card";
import { Glass } from "@/components/ui/glass";

export function TournamentHome({ initial }: { initial: TournamentSummary[] }) {
  const { data } = useQuery({
    queryKey: queryKeys.tournaments,
    queryFn: getTournaments,
    initialData: initial,
  });

  if (!data.length) {
    return (
      <Glass className="flex flex-col items-center gap-4 px-8 py-16 text-center">
        <p className="font-display text-5xl text-gold">No nights yet</p>
        <p className="max-w-md text-ice/70">Create a tournament, pick clubs, and keep score like a Champions League night.</p>
        <Link
          href="/new"
          className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy"
        >
          Start a night
        </Link>
      </Glass>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((tournament) => (
        <TournamentCard key={tournament.id} tournament={tournament} />
      ))}
    </div>
  );
}
