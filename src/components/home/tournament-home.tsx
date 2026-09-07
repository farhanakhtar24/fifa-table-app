"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getTournaments } from "@/app/actions/tournaments";
import { TournamentGridSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { Glass } from "@/components/ui/glass";
import { queryKeys } from "@/lib/query/keys";
import type { TournamentSummary } from "@/lib/types";
import { TournamentCard } from "./tournament-card";

export function TournamentHome({ initial }: { initial: TournamentSummary[] }) {
  const { data, isPending } = useQuery({
    queryKey: queryKeys.tournaments,
    queryFn: getTournaments,
    initialData: initial,
  });

  if (isPending) return <TournamentGridSkeleton />;

  if (!data.length) {
    return (
      <Glass className="flex flex-col items-center gap-4 px-8 py-16 text-center">
        <p className="font-display text-5xl text-gold">No nights yet</p>
        <p className="max-w-md text-muted-foreground">
          Create a tournament, pick clubs, and keep score like a Champions League night.
        </p>
        <Button asChild>
          <Link href="/new">Start a night</Link>
        </Button>
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
