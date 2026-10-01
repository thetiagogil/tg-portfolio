import { describe, expect, it } from "vitest";
import type { ISODate } from "@/content/types";
import {
  dayMonthYear,
  formatDuration,
  monthYear,
  monthsBetween,
  shortMonth,
  toDate,
  year,
} from "./dates";

const EN = { year: "yr", years: "yrs", month: "mo", months: "mos" };

describe("dates", () => {
  it("formats month and year in both languages, never as numbers", () => {
    expect(monthYear("2025-01-01", "en")).toBe("Jan 2025");
    expect(monthYear("2025-01-01", "pt")).toBe("jan 2025");
    expect(monthYear("2024-02-01", "pt")).toBe("fev 2024");
    expect(monthYear("2026-09-01", "pt")).toBe("set 2026");
    expect(monthYear("2022-09-01", "en")).toBe("Sep 2022");
    for (let m = 1; m <= 12; m++)
      expect(
        monthYear(`2025-${String(m).padStart(2, "0")}-01` as ISODate, "en"),
      ).toMatch(/^[A-Z][a-z]{2} 2025$/);
    for (let m = 1; m <= 12; m++) {
      const iso = `2025-${String(m).padStart(2, "0")}-01` as ISODate;
      expect(monthYear(iso, "pt")).toMatch(/^[a-zç]{3,4} 2025$/);
    }
  });

  it("reads dates in UTC", () => {
    expect(toDate("2025-01-01").getUTCFullYear()).toBe(2025);
    expect(year("2025-01-01")).toBe(2025);
    expect(shortMonth(toDate("2025-01-01"), "en")).toBe("Jan");
  });

  it("formats the footer date", () => {
    expect(dayMonthYear(toDate("2026-10-01"), "en")).toBe("1 Oct 2026");
    expect(dayMonthYear(toDate("2026-10-01"), "pt")).toBe("1 out 2026");
  });

  it("counts months inclusively", () => {
    expect(monthsBetween("2025-01-01", "2026-09-01")).toBe(21);
    expect(monthsBetween("2023-12-01", "2024-02-01")).toBe(3);
    expect(monthsBetween("2024-03-01", undefined)).toBe(1);
    expect(monthsBetween("2025-01-01", null, toDate("2026-10-01"))).toBe(22);
  });

  it("formats durations", () => {
    expect(formatDuration(21, EN)).toBe("1 yr 9 mos");
    expect(formatDuration(12, EN)).toBe("1 yr");
    expect(formatDuration(3, EN)).toBe("3 mos");
    expect(formatDuration(1, EN)).toBe("1 mo");
    expect(formatDuration(95, EN)).toBe("7 yrs 11 mos");
  });
});
