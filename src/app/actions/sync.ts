"use server";

import { revalidatePath } from "next/cache";
import { syncFootballCache, syncStatus } from "@/lib/football/sync";

export async function getSyncStatus() {
  return syncStatus();
}

export async function refreshFootballCache() {
  const result = await syncFootballCache({ force: true });
  revalidatePath("/clubs");
  revalidatePath("/");
  revalidatePath("/new");
  return result;
}
