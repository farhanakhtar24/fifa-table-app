"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveFixtureScore } from "@/app/actions/fixtures";
import { Button } from "@/components/ui/button";
import { Glass } from "@/components/ui/glass";
import { queryKeys } from "@/lib/query/keys";
import type { FixtureDto } from "@/lib/types";

export function FixturesBoard({
  tournamentId,
  fixtures,
}: {
  tournamentId: string;
  fixtures: FixtureDto[];
}) {
  const upcoming = fixtures.filter((fixture) => !fixture.played);
  const played = fixtures.filter((fixture) => fixture.played);

  return (
    <div className="grid gap-8">
      <section>
        <h2 className="font-display text-3xl text-gold">To play</h2>
        <div className="mt-4 grid gap-4">
          {upcoming.length === 0 ? (
            <p className="text-muted-foreground">Every fixture is in the book.</p>
          ) : (
            upcoming.map((fixture) => (
              <ScoreCard key={fixture.id} tournamentId={tournamentId} fixture={fixture} />
            ))
          )}
        </div>
      </section>
      <section>
        <h2 className="font-display text-3xl text-gold">Played</h2>
        <div className="mt-4 grid gap-3">
          {played.map((fixture) => (
            <Glass key={fixture.id} className="flex items-center justify-between px-5 py-4">
              <ClubSide team={fixture.home} />
              <p className="font-display text-4xl text-foreground">
                {fixture.homeGoals} – {fixture.awayGoals}
              </p>
              <ClubSide team={fixture.away} align="right" />
            </Glass>
          ))}
        </div>
      </section>
    </div>
  );
}

function ScoreCard({
  tournamentId,
  fixture,
}: {
  tournamentId: string;
  fixture: FixtureDto;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [home, setHome] = useState(0);
  const [away, setAway] = useState(0);

  const save = useMutation({
    mutationFn: () => saveFixtureScore({ fixtureId: fixture.id, homeGoals: home, awayGoals: away }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.tournament(tournamentId) });
      await queryClient.invalidateQueries({ queryKey: queryKeys.tournaments });
      router.refresh();
    },
  });

  return (
    <Glass className="grid gap-4 p-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
      <ClubSide team={fixture.home} />
      <div className="flex items-center justify-center gap-3">
        <Stepper value={home} onChange={setHome} />
        <span className="font-display text-3xl text-muted-foreground">:</span>
        <Stepper value={away} onChange={setAway} />
      </div>
      <div className="flex items-center justify-between gap-3 md:justify-end">
        <ClubSide team={fixture.away} align="right" />
        <Button onClick={() => save.mutate()} disabled={save.isPending}>
          {save.isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </Glass>
  );
}

function Stepper({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="h-8 w-8 rounded-full bg-muted text-lg"
        onClick={() => onChange(Math.max(0, value - 1))}
      >
        −
      </button>
      <span className="font-display w-8 text-center text-4xl text-gold">{value}</span>
      <button
        type="button"
        className="h-8 w-8 rounded-full bg-muted text-lg"
        onClick={() => onChange(Math.min(99, value + 1))}
      >
        +
      </button>
    </div>
  );
}

function ClubSide({
  team,
  align = "left",
}: {
  team: FixtureDto["home"];
  align?: "left" | "right";
}) {
  return (
    <div className={`flex items-center gap-3 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ice/90">
        <Image src={team.crestUrl} alt="" width={40} height={40} className="h-9 w-9 object-contain" />
      </span>
      <div>
        <p className="font-semibold text-foreground">{team.shortName}</p>
        <p className="hidden text-xs text-muted-foreground sm:block">{team.name}</p>
      </div>
    </div>
  );
}
