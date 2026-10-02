import { describe, expect, it } from "vitest";
import { scaleOf, utc } from "@/lib/scale";

describe("scale", () => {
  it("maps one segment linearly, with a tick each 1 January", () => {
    const scale = scaleOf([[utc(2022, 0), utc(2026, 0)]]);

    expect(scale.pos(utc(2022, 0))).toBe(0);
    expect(scale.pos(utc(2024, 0))).toBeCloseTo(0.5, 2);
    expect(scale.pos(utc(2026, 0))).toBe(1);
    expect(scale.ticks.map((tick) => tick.year)).toEqual([2022, 2023, 2024, 2025, 2026]);
  });

  it("leaves a gap between segments, with dates inside it at its centre", () => {
    const scale = scaleOf(
      [
        [utc(2014, 0), utc(2015, 0)],
        [utc(2022, 0), utc(2023, 0)],
      ],
      0.04,
    );

    expect(scale.pos(utc(2015, 0))).toBeCloseTo(0.48, 2);
    expect(scale.pos(utc(2022, 0))).toBeCloseTo(0.52, 2);
    expect(scale.breaks[0]).toBeCloseTo(0.5, 2);
    expect(scale.pos(utc(2018, 0))).toBeCloseTo(0.5, 2);
  });
});
