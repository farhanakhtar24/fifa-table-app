import { notFound } from "next/navigation";
import Image from "next/image";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getSquad } from "@/app/actions/clubs";
import { AppShell } from "@/components/layout/app-shell";
import { PlayerCard } from "@/components/player/player-card";
import { RatingPips } from "@/components/ui/rating-pips";
import { queryKeys } from "@/lib/query/keys";

export default async function ClubPage({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;
  const squad = await getSquad(teamId);
  if (!squad) notFound();

  const client = new QueryClient();
  await client.prefetchQuery({ queryKey: queryKeys.squad(teamId), queryFn: () => getSquad(teamId) });

  return (
    <AppShell scene="pitch">
      <div className="mb-8 flex flex-wrap items-end gap-5">
        <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-ice/90">
          <Image src={squad.club.crestUrl} alt="" width={72} height={72} className="h-16 w-16 object-contain" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">{squad.club.league}</p>
          <h1 className="font-display text-6xl text-white">{squad.club.name}</h1>
        </div>
        <RatingPips att={squad.club.att} mid={squad.club.mid} def={squad.club.def} />
      </div>
      <HydrationBoundary state={dehydrate(client)}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {squad.players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </HydrationBoundary>
    </AppShell>
  );
}
