import { notFound } from "next/navigation";
import { getPlayer } from "@/app/actions/clubs";
import { AppShell } from "@/components/layout/app-shell";
import { PlayerSheet } from "@/components/player/player-sheet";

export default async function PlayerPage({ params }: { params: Promise<{ playerId: string }> }) {
  const { playerId } = await params;
  const player = await getPlayer(playerId);
  if (!player) notFound();

  return (
    <AppShell scene="pitch">
      <PlayerSheet player={player} />
    </AppShell>
  );
}
