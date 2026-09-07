import { NextResponse } from "next/server";
import { syncClubsIfStale } from "@/lib/football/sync";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");

  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const result = syncClubsIfStale();
  return NextResponse.json(result);
}
