import { describe, expect, it } from "vitest";
import { mapStatsToEaAttributes } from "./ea-attributes";

describe("mapStatsToEaAttributes", () => {
  it("keeps every outfield stat between 40 and 99", () => {
    const attrs = mapStatsToEaAttributes({ name: "Erling Haaland", position: "ATT", ovr: 91 });
    for (const key of ["pac", "sho", "pas", "dri", "def", "phy"] as const) {
      expect(attrs[key]).toBeGreaterThanOrEqual(40);
      expect(attrs[key]).toBeLessThanOrEqual(99);
    }
    expect(attrs.div).toBeNull();
  });

  it("gives attackers more shooting than defending", () => {
    const attrs = mapStatsToEaAttributes({ name: "Kylian Mbappé", position: "ATT", ovr: 91 });
    expect(attrs.sho).toBeGreaterThan(attrs.def);
  });

  it("fills GK-only stats for keepers", () => {
    const attrs = mapStatsToEaAttributes({ name: "Alisson", position: "GK", ovr: 89 });
    expect(attrs.div).toBeGreaterThanOrEqual(40);
    expect(attrs.han).toBeGreaterThanOrEqual(40);
    expect(attrs.skillMoves).toBe(1);
  });
});
