import { notFound } from "next/navigation";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getTournament } from "@/app/actions/tournaments";
import { PointsTable } from "@/components/tournament/points-table";
import { RatingPips } from "@/components/ui/rating-pips";
import { Glass } from "@/components/ui/glass";
import { queryKeys } from "@/lib/query/keys";

export default async function TournamentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tournament = await getTournament(id);
  if (!tournament) notFound();

  const client = new QueryClient();
  await client.prefetchQuery({ queryKey: queryKeys.tournament(id), queryFn: () => getTournament(id) });

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <div className="mb-6 flex flex-wrap gap-3">
        {tournament.teams.map((team) => (
          <Glass key={team.id} className="flex items-center gap-3 px-4 py-3">
            <p className="text-sm font-semibold text-foreground">{team.shortName}</p>
            <RatingPips att={team.att} mid={team.mid} def={team.def} compact />
          </Glass>
        ))}
      </div>
      <PointsTable rows={tournament.table} />
    </HydrationBoundary>
  );
}
