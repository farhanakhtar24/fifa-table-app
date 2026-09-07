"use server";

import { syncClubsIfStale, syncStatus } from "@/lib/football/sync";

export async function getSyncStatus() {
  return syncStatus();
}

export async function refreshFootballCache() {
  return syncClubsIfStale(true);
}
