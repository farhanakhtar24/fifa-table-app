import { AppShell } from "@/components/layout/app-shell";
import { Skeleton } from "@/components/ui/skeleton";

export function PageHeaderSkeleton() {
  return (
    <div className="mb-8 space-y-3">
      <Skeleton className="h-3 w-28" />
      <Skeleton className="h-14 w-64" />
      <Skeleton className="h-4 w-96 max-w-full" />
    </div>
  );
}

export function TournamentGridSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-56 rounded-3xl" />
      ))}
    </div>
  );
}

export function ClubGridSkeleton() {
  return (
    <div>
      <Skeleton className="mb-6 h-11 w-full max-w-sm rounded-2xl" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <Skeleton key={index} className="h-28 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}

export function SquadGridSkeleton() {
  return (
    <div>
      <div className="mb-8 flex items-end gap-5">
        <Skeleton className="h-20 w-20 rounded-3xl" />
        <div className="space-y-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-12 w-56" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-80 rounded-[28px]" />
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-40 rounded-3xl" />
        ))}
      </div>
      <Skeleton className="h-80 rounded-3xl" />
    </div>
  );
}

export function FixturesSkeleton() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-28 rounded-3xl" />
      ))}
    </div>
  );
}

export function CreateSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <Skeleton className="h-[28rem] rounded-3xl" />
      <Skeleton className="h-72 rounded-3xl" />
    </div>
  );
}

export function PlayerSheetSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <Skeleton className="h-96 rounded-[28px]" />
      <Skeleton className="h-96 rounded-3xl" />
    </div>
  );
}

export function HomeLoading() {
  return (
    <AppShell scene="home">
      <PageHeaderSkeleton />
      <TournamentGridSkeleton />
    </AppShell>
  );
}

export function ClubsLoading() {
  return (
    <AppShell scene="home">
      <PageHeaderSkeleton />
      <ClubGridSkeleton />
    </AppShell>
  );
}

export function SquadLoading() {
  return (
    <AppShell scene="pitch">
      <SquadGridSkeleton />
    </AppShell>
  );
}

export function NewNightLoading() {
  return (
    <AppShell scene="create">
      <PageHeaderSkeleton />
      <CreateSkeleton />
    </AppShell>
  );
}

export function TournamentLoading() {
  return (
    <AppShell scene="pitch">
      <PageHeaderSkeleton />
      <TableSkeleton />
    </AppShell>
  );
}

export function PlayerLoading() {
  return (
    <AppShell scene="pitch">
      <PlayerSheetSkeleton />
    </AppShell>
  );
}
