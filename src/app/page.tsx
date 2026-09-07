import Image from "next/image";
import Link from "next/link";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { getTournaments } from "@/app/actions/tournaments";
import { TournamentHome } from "@/components/home/tournament-home";
import { AppShell } from "@/components/layout/app-shell";
import { queryKeys } from "@/lib/query/keys";

export default async function HomePage() {
  const tournaments = await getTournaments();
  const client = new QueryClient();
  await client.prefetchQuery({ queryKey: queryKeys.tournaments, queryFn: getTournaments });

  return (
    <AppShell scene="home">
      <section className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Local FIFA nights</p>
          <h1 className="mt-2 font-display text-6xl text-foreground md:text-7xl">The table</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Pick clubs, generate fixtures, keep score from your cached squads.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Image src="/Assets/ucl-trophy.png" alt="" width={72} height={72} className="opacity-90" />
          <Link href="/new" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            New night
          </Link>
        </div>
      </section>
      <HydrationBoundary state={dehydrate(client)}>
        <TournamentHome initial={tournaments} />
      </HydrationBoundary>
    </AppShell>
  );
}
