import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getClubs } from "@/app/actions/clubs";
import { AppShell } from "@/components/layout/app-shell";
import { CreateForm } from "@/components/tournament/create-form";
import { queryKeys } from "@/lib/query/keys";

export default async function NewTournamentPage() {
  const clubs = await getClubs();
  const client = new QueryClient();
  await client.prefetchQuery({ queryKey: queryKeys.clubs, queryFn: getClubs });

  return (
    <AppShell scene="create">
      <p className="text-xs uppercase tracking-[0.35em] text-gold">Create</p>
      <h1 className="mt-2 font-display text-6xl text-white">New night</h1>
      <p className="mb-8 mt-2 max-w-xl text-ice/70">Name the session, pick at least three clubs, and the fixtures write themselves.</p>
      <HydrationBoundary state={dehydrate(client)}>
        <CreateForm initialClubs={clubs} />
      </HydrationBoundary>
    </AppShell>
  );
}
