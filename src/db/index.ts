import "server-only";

import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

type DbBundle = {
  sqlite: Database.Database;
  db: ReturnType<typeof drizzle<typeof schema>>;
};

const globalForDb = globalThis as unknown as { __fifaDb?: DbBundle };

function createBundle(): DbBundle {
  const dbPath = path.join(process.cwd(), "data", "app.db");
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const sqlite = new Database(dbPath, { timeout: 10000 });
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");
  sqlite.pragma("busy_timeout = 10000");
  return { sqlite, db: drizzle(sqlite, { schema }) };
}

export function getSqlite() {
  globalForDb.__fifaDb ??= createBundle();
  return globalForDb.__fifaDb.sqlite;
}

export function getDb() {
  globalForDb.__fifaDb ??= createBundle();
  return globalForDb.__fifaDb.db;
}
