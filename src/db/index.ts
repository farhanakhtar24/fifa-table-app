import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

function createBundle() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is missing.");
  }

  const sql = neon(url);
  return { sql, db: drizzle(sql, { schema }) };
}

type DbBundle = ReturnType<typeof createBundle>;

const globalForDb = globalThis as unknown as { __fifaPg?: DbBundle };

function getBundle(): DbBundle {
  globalForDb.__fifaPg ??= createBundle();
  return globalForDb.__fifaPg;
}

export function getSql() {
  return getBundle().sql;
}

export function getDb() {
  return getBundle().db;
}
