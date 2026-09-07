import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getClubs } from "@/app/actions/clubs";
import { ClubGrid } from "@/components/clubs/club-grid";
import { AppShell } from "@/components/layout/app-shell";
import { queryKeys } from "@/lib/query/keys";

export default async function ClubsPage() {
  const clubs = await getClubs();
  const client = new QueryClient();
  await client.prefetchQuery({ queryKey: queryKeys.clubs, queryFn: getClubs });

  return (
    <AppShell scene="home">
      <p className="text-xs uppercase tracking-[0.35em] text-gold">Catalog</p>
      <h1 className="mb-8 mt-2 font-display text-6xl text-foreground">Clubs</h1>
      <HydrationBoundary state={dehydrate(client)}>
        <ClubGrid initial={clubs} />
      </HydrationBoundary>
    </AppShell>
  );
}
