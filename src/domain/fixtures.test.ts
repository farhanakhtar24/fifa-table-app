import { describe, expect, it } from "vitest";
import { generateRoundRobin } from "./fixtures";

describe("generateRoundRobin", () => {
  it("creates n(n-1)/2 fixtures", () => {
    const teamIds = ["a", "b", "c", "d"];
    const fixtures = generateRoundRobin(teamIds);
    expect(fixtures).toHaveLength(6);
  });

  it("gives every team n-1 matches", () => {
    const teamIds = ["a", "b", "c", "d"];
    const fixtures = generateRoundRobin(teamIds);
    const counts = Object.fromEntries(teamIds.map((id) => [id, 0]));

    for (const fixture of fixtures) {
      counts[fixture.homeTeamId] += 1;
      counts[fixture.awayTeamId] += 1;
    }

    expect(counts).toEqual({ a: 3, b: 3, c: 3, d: 3 });
  });

  it("returns nothing for a single team", () => {
    expect(generateRoundRobin(["only"])).toEqual([]);
  });
});
