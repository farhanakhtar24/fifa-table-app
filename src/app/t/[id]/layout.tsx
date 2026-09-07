import { notFound } from "next/navigation";
import Image from "next/image";
import { getTournament } from "@/app/actions/tournaments";
import { AppShell } from "@/components/layout/app-shell";
import { TournamentTabs } from "@/components/tournament/tournament-tabs";

export default async function TournamentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tournament = await getTournament(id);
  if (!tournament) notFound();

  return (
    <AppShell scene="pitch">
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Tournament</p>
          <h1 className="font-display text-6xl text-foreground">{tournament.name}</h1>
          <div className="mt-3 flex -space-x-2">
            {tournament.teams.map((team) => (
              <span key={team.id} className="flex h-9 w-9 items-center justify-center rounded-full border border-navy bg-ice">
                <Image src={team.crestUrl} alt={team.shortName} width={24} height={24} />
              </span>
            ))}
          </div>
        </div>
        <TournamentTabs id={id} />
      </div>
      {children}
    </AppShell>
  );
}
