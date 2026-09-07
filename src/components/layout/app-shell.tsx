import type { ReactNode } from "react";
import { Nav } from "./nav";

const scenes = {
  home: "/Assets/background-img/select_tournament_page.jpg",
  create: "/Assets/background-img/new_tournament_page.jpg",
  pitch: "/Assets/background-img/table_fixture_page.jpg",
};

export function AppShell({
  children,
  scene = "home",
}: {
  children: ReactNode;
  scene?: keyof typeof scenes;
}) {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={scenes[scene]} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 via-navy/88 to-navy-deep" />
      </div>
      <Nav />
      <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-28">{children}</main>
    </div>
  );
}
