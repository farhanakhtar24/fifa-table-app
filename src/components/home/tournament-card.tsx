"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImBin } from "react-icons/im";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTournament } from "@/app/actions/tournaments";
import { Glass } from "@/components/ui/glass";
import { Button } from "@/components/ui/button";
import { queryKeys } from "@/lib/query/keys";
import type { TournamentSummary } from "@/lib/types";

export function TournamentCard({ tournament }: { tournament: TournamentSummary }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [confirming, setConfirming] = useState(false);

  const remove = useMutation({
    mutationFn: () => deleteTournament(tournament.id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.tournaments });
      router.refresh();
    },
  });

  return (
    <Glass className="relative flex h-full flex-col overflow-hidden p-5">
      <Link href={`/t/${tournament.id}`} className="flex flex-1 flex-col gap-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-3xl text-white">{tournament.name}</p>
            <p className="text-xs uppercase tracking-[0.22em] text-ice/50">
              {tournament.played}/{tournament.total} played
            </p>
          </div>
          <span className="rounded-full border border-gold/40 px-3 py-1 text-[10px] uppercase tracking-widest text-gold">
            {tournament.played === tournament.total && tournament.total > 0 ? "Complete" : "Live"}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {tournament.teams.slice(0, 8).map((team) => (
            <div key={team.id} className="flex items-center justify-center rounded-2xl bg-ice/80 p-2">
              <Image src={team.crestUrl} alt={team.shortName} width={48} height={48} className="h-10 w-10 object-contain" />
            </div>
          ))}
        </div>
      </Link>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-ice/50">{tournament.teams.length} clubs</p>
        {confirming ? (
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setConfirming(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => remove.mutate()} disabled={remove.isPending}>
              Delete
            </Button>
          </div>
        ) : (
          <button
            type="button"
            className="text-ice/40 transition hover:text-rose-400"
            onClick={() => setConfirming(true)}
            aria-label={`Delete ${tournament.name}`}
          >
            <ImBin />
          </button>
        )}
      </div>
    </Glass>
  );
}
