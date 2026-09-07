import "server-only";

import { getSqlite } from "./index";
import { seedIfEmpty } from "./seed";

let ready = false;

export function ensureDb() {
  if (ready) return;

  const sqlite = getSqlite();
  const boot = sqlite.transaction(() => {
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS teams (
        id TEXT PRIMARY KEY,
        external_id INTEGER,
        name TEXT NOT NULL,
        short_name TEXT NOT NULL,
        crest_url TEXT NOT NULL,
        league TEXT NOT NULL,
        att INTEGER NOT NULL,
        mid INTEGER NOT NULL,
        def INTEGER NOT NULL,
        synced_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS players (
        id TEXT PRIMARY KEY,
        external_id INTEGER,
        name TEXT NOT NULL,
        photo_url TEXT,
        number INTEGER,
        age INTEGER,
        nationality TEXT,
        primary_position TEXT NOT NULL,
        detailed_position TEXT,
        synced_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS player_attributes (
        player_id TEXT PRIMARY KEY REFERENCES players(id) ON DELETE CASCADE,
        ovr INTEGER NOT NULL,
        pac INTEGER NOT NULL,
        sho INTEGER NOT NULL,
        pas INTEGER NOT NULL,
        dri INTEGER NOT NULL,
        def INTEGER NOT NULL,
        phy INTEGER NOT NULL,
        div INTEGER,
        han INTEGER,
        kic INTEGER,
        ref INTEGER,
        spd INTEGER,
        pos INTEGER,
        weak_foot INTEGER NOT NULL,
        skill_moves INTEGER NOT NULL,
        attacking_work_rate TEXT NOT NULL,
        defensive_work_rate TEXT NOT NULL,
        playstyles TEXT NOT NULL,
        source TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS squads (
        team_id TEXT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
        player_id TEXT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
        season INTEGER NOT NULL,
        PRIMARY KEY (team_id, player_id, season)
      );

      CREATE TABLE IF NOT EXISTS tournaments (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        created_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS tournament_teams (
        tournament_id TEXT NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
        team_id TEXT NOT NULL,
        name TEXT NOT NULL,
        short_name TEXT NOT NULL,
        crest_url TEXT NOT NULL,
        att INTEGER NOT NULL,
        mid INTEGER NOT NULL,
        def INTEGER NOT NULL,
        PRIMARY KEY (tournament_id, team_id)
      );

      CREATE TABLE IF NOT EXISTS fixtures (
        id TEXT PRIMARY KEY,
        tournament_id TEXT NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
        home_team_id TEXT NOT NULL,
        away_team_id TEXT NOT NULL,
        home_goals INTEGER,
        away_goals INTEGER,
        played INTEGER NOT NULL DEFAULT 0,
        matchday INTEGER NOT NULL
      );
    `);
    seedIfEmpty();
  });

  for (let attempt = 0; attempt < 8; attempt += 1) {
    try {
      boot.immediate();
      ready = true;
      return;
    } catch (error) {
      const busy = error instanceof Error && /SQLITE_BUSY|database is locked/.test(error.message);
      if (!busy || attempt === 7) throw error;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 150 * (attempt + 1));
    }
  }
}
