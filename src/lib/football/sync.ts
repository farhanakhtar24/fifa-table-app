import "server-only";

import { hasFootballApiKey } from "./provider";

const CLUB_TTL_MS = 24 * 60 * 60 * 1000;
const SQUAD_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const MIN_COOLDOWN_MS = 60 * 60 * 1000;

let lastManualSync = 0;

export function syncStatus() {
  return {
    provider: hasFootballApiKey() ? "api-football" : "dummy",
    canSync: hasFootballApiKey(),
    clubTtlHours: 24,
    squadTtlDays: 7,
  };
}

export function syncClubsIfStale(force = false) {
  if (!hasFootballApiKey()) {
    return { ok: true, skipped: true, reason: "no-api-key" as const };
  }

  if (!force && Date.now() - lastManualSync < MIN_COOLDOWN_MS) {
    return { ok: true, skipped: true, reason: "cooldown" as const };
  }

  lastManualSync = Date.now();
  void CLUB_TTL_MS;
  void SQUAD_TTL_MS;
  return { ok: false, skipped: true, reason: "phase-4" as const };
}

export function syncSquadIfStale() {
  if (!hasFootballApiKey()) {
    return { ok: true, skipped: true, reason: "no-api-key" as const };
  }

  return { ok: false, skipped: true, reason: "phase-4" as const };
}
