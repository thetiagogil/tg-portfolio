import { describe, expect, it } from "vitest";
import { neighbours, projectHref, recordHref } from "./entries";

describe("entries", () => {
  it("finds the previous and next entry, wrapping round", () => {
    const list = [{ slug: "a" }, { slug: "b" }, { slug: "c" }];
    expect(neighbours(list, "a")).toEqual({ prev: { slug: "c" }, next: { slug: "b" } });
  });

  it("has no previous entry when there's only one other", () => {
    expect(neighbours([{ slug: "a" }, { slug: "b" }], "a")).toEqual({
      prev: null,
      next: { slug: "b" },
    });
  });

  it("builds page links in both languages", () => {
    expect(projectHref("en", { slug: "voydex" })).toBe("/projects/voydex");
    expect(recordHref("pt", { kind: "education", slug: "faul" })).toBe("/pt/education/faul");
  });
});
