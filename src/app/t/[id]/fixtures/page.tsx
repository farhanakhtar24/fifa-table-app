import { notFound } from "next/navigation";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getTournament } from "@/app/actions/tournaments";
import { FixturesBoard } from "@/components/tournament/fixtures-board";
import { queryKeys } from "@/lib/query/keys";

export default async function FixturesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tournament = await getTournament(id);
  if (!tournament) notFound();

  const client = new QueryClient();
  await client.prefetchQuery({ queryKey: queryKeys.tournament(id), queryFn: () => getTournament(id) });

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <FixturesBoard tournamentId={id} fixtures={tournament.fixtures} />
    </HydrationBoundary>
  );
}
