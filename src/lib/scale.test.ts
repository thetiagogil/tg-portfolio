import { describe, expect, it } from "vitest";
import { fill } from "./format";
import { neighbours } from "./entries";
import { scaleOf, utc } from "./scale";

describe("scale", () => {
  it("maps one segment linearly", () => {
    const sc = scaleOf([[utc(2022, 0), utc(2026, 0)]]);
    expect(sc.pos(utc(2022, 0))).toBe(0);
    expect(sc.pos(utc(2024, 0))).toBeCloseTo(0.5, 2);
    expect(sc.pos(utc(2026, 0))).toBe(1);
    expect(sc.ticks.map((t) => t.year)).toEqual([2022, 2023, 2024, 2025, 2026]);
  });
  it("leaves a gap between segments", () => {
    const sc = scaleOf(
      [
        [utc(2014, 0), utc(2015, 0)],
        [utc(2022, 0), utc(2023, 0)],
      ],
      0.04,
    );
    expect(sc.pos(utc(2015, 0))).toBeCloseTo(0.48, 2);
    expect(sc.pos(utc(2022, 0))).toBeCloseTo(0.52, 2);
    expect(sc.breaks[0]).toBeCloseTo(0.5, 2);
    expect(sc.pos(utc(2018, 0))).toBeCloseTo(0.5, 2);
  });
});

describe("helpers", () => {
  it("fills templates", () =>
    expect(fill("{n} of {total}", { n: 3, total: 7 })).toBe("3 of 7"));
  it("finds neighbours, wrapping round", () => {
    const list = [{ slug: "a" }, { slug: "b" }, { slug: "c" }];
    expect(neighbours(list, "a")).toEqual({
      prev: { slug: "c" },
      next: { slug: "b" },
    });
    expect(neighbours([{ slug: "a" }, { slug: "b" }], "a")).toEqual({
      prev: null,
      next: { slug: "b" },
    });
  });
});
