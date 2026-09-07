import { describe, expect, it } from "vitest";
import { computePointsTable } from "./points-table";

describe("computePointsTable", () => {
  it("ranks by points, then goal difference, then goals for", () => {
    const table = computePointsTable(
      ["city", "united", "arsenal"],
      [
        { homeTeamId: "city", awayTeamId: "united", homeGoals: 3, awayGoals: 1 },
        { homeTeamId: "arsenal", awayTeamId: "city", homeGoals: 0, awayGoals: 2 },
        { homeTeamId: "united", awayTeamId: "arsenal", homeGoals: 1, awayGoals: 1 },
      ],
    );

    expect(table.map((row) => row.teamId)).toEqual(["city", "united", "arsenal"]);
    expect(table[0]).toMatchObject({ played: 2, won: 2, points: 6, goalsFor: 5, goalDifference: 4 });
    expect(table[1]).toMatchObject({ points: 1, drawn: 1, goalsFor: 2 });
  });

  it("ignores unplayed fixtures", () => {
    const table = computePointsTable(
      ["a", "b"],
      [{ homeTeamId: "a", awayTeamId: "b", homeGoals: null, awayGoals: null }],
    );

    expect(table.every((row) => row.played === 0 && row.points === 0)).toBe(true);
  });
});
