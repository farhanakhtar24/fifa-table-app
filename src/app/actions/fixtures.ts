"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb } from "@/db";
import { ensureDb } from "@/db/ensure";
import { fixtures } from "@/db/schema";

const scoreSchema = z.object({
  fixtureId: z.string().min(1),
  homeGoals: z.number().int().min(0).max(99),
  awayGoals: z.number().int().min(0).max(99),
});

export async function saveFixtureScore(input: {
  fixtureId: string;
  homeGoals: number;
  awayGoals: number;
}) {
  await ensureDb();
  const db = getDb();
  const parsed = scoreSchema.parse(input);
  const fixture = (await db.select().from(fixtures).where(eq(fixtures.id, parsed.fixtureId)).limit(1))[0];
  if (!fixture) {
    throw new Error("Fixture not found.");
  }

  await db
    .update(fixtures)
    .set({
      homeGoals: parsed.homeGoals,
      awayGoals: parsed.awayGoals,
      played: true,
    })
    .where(eq(fixtures.id, parsed.fixtureId));

  revalidatePath("/");
  revalidatePath(`/t/${fixture.tournamentId}`);
  revalidatePath(`/t/${fixture.tournamentId}/fixtures`);
}
