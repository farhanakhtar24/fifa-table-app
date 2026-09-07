import { AppShell } from "@/components/layout/app-shell";

export default function Loading() {
  return (
    <AppShell>
      <div className="h-40 animate-pulse rounded-3xl bg-white/5" />
    </AppShell>
  );
}
