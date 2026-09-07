import { ensureDb } from "../db/ensure";
import { syncFootballCache } from "../lib/football/sync";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing");
  }
  if (!process.env.FOOTBALL_API_KEY) {
    throw new Error("FOOTBALL_API_KEY is missing");
  }

  await ensureDb();
  const force = process.argv.includes("--force");
  const result = await syncFootballCache({ force });
  console.info(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
