"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getClubs } from "@/app/actions/clubs";
import { createTournament } from "@/app/actions/tournaments";
import { Button } from "@/components/ui/button";
import { Glass } from "@/components/ui/glass";
import { RatingPips } from "@/components/ui/rating-pips";
import { queryKeys } from "@/lib/query/keys";
import { cn } from "@/lib/utils";
import type { ClubDto } from "@/lib/types";

export function CreateForm({ initialClubs }: { initialClubs: ClubDto[] }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [league, setLeague] = useState("All");
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const clubsQuery = useQuery({
    queryKey: queryKeys.clubs,
    queryFn: getClubs,
    initialData: initialClubs,
  });

  const leagues = useMemo(
    () => ["All", ...new Set((clubsQuery.data ?? []).map((club) => club.league))],
    [clubsQuery.data],
  );

  const visible = (clubsQuery.data ?? []).filter((club) => {
    const matchesLeague = league === "All" || club.league === league;
    const matchesQuery = club.name.toLowerCase().includes(query.toLowerCase());
    return matchesLeague && matchesQuery;
  });

  const selectedClubs = selected
    .map((id) => (clubsQuery.data ?? []).find((club) => club.id === id))
    .filter((club): club is ClubDto => Boolean(club));

  const create = useMutation({
    mutationFn: () => createTournament({ name, teamIds: selected }),
    onSuccess: async ({ id }) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.tournaments });
      router.push(`/t/${id}`);
    },
    onError: (err: unknown) => {
      setError(err instanceof Error ? err.message : "Could not create tournament.");
    },
  });

  function toggle(id: string) {
    setSelected((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 8) return current;
      return [...current, id];
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <Glass className="p-6">
        <label className="block text-xs uppercase tracking-[0.22em] text-ice/50">Night name</label>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Friday Night"
          className="mt-2 w-full rounded-2xl border border-white/10 bg-navy/40 px-4 py-3 text-lg text-white outline-none ring-gold/40 placeholder:text-ice/30 focus:ring-2"
        />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search clubs"
            className="flex-1 rounded-2xl border border-white/10 bg-navy/40 px-4 py-2.5 outline-none ring-gold/40 focus:ring-2"
          />
          <select
            value={league}
            onChange={(event) => setLeague(event.target.value)}
            className="rounded-2xl border border-white/10 bg-navy/40 px-4 py-2.5 outline-none"
          >
            {leagues.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {visible.map((club) => {
            const active = selected.includes(club.id);
            return (
              <button
                key={club.id}
                type="button"
                onClick={() => toggle(club.id)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition",
                  active ? "border-gold bg-gold/10" : "border-white/10 bg-white/5 hover:border-white/25",
                )}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ice/90">
                  <Image src={club.crestUrl} alt="" width={40} height={40} className="h-9 w-9 object-contain" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-white">{club.name}</span>
                  <span className="block text-xs text-ice/50">{club.league}</span>
                </span>
                <RatingPips att={club.att} mid={club.mid} def={club.def} compact />
              </button>
            );
          })}
        </div>
      </Glass>
      <Glass className="h-fit p-5">
        <p className="font-display text-3xl text-gold">Selected</p>
        <p className="text-xs uppercase tracking-widest text-ice/50">{selected.length}/8 clubs · min 3</p>
        <ul className="mt-4 space-y-2">
          {selectedClubs.map((club) => (
            <li key={club.id} className="flex items-center gap-2 rounded-xl bg-white/5 px-2 py-2">
              <Image src={club.crestUrl} alt="" width={28} height={28} />
              <span className="truncate text-sm">{club.shortName}</span>
            </li>
          ))}
        </ul>
        {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
        <Button
          className="mt-5 w-full"
          disabled={selected.length < 3 || name.trim().length < 2 || create.isPending}
          onClick={() => create.mutate()}
        >
          {create.isPending ? "Creating…" : "Kick off"}
        </Button>
      </Glass>
    </div>
  );
}
