import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";

export default function NotFound() {
  return (
    <AppShell>
      <p className="font-display text-6xl text-gold">404</p>
      <p className="mt-2 text-ice/70">That night, club, or player is not on the sheet.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-gold px-5 py-2 text-sm font-semibold text-navy">
        Back to the table
      </Link>
    </AppShell>
  );
}
