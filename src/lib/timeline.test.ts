import { describe, expect, it } from "vitest";
import { timelineItems, toolGroups } from "./timeline";
import {
  counts,
  DEFAULT_VIEW,
  matches,
  NO_FILTERS,
  searchFromView,
  viewFromSearch,
  visible,
} from "./timeline-filter";

const items = timelineItems("en");
const titles = (list: typeof items) => list.map((i) => i.title);

describe("timeline", () => {
  it("has every role, degree, project and certificate", () => {
    expect(items.length).toBe(4 + 2 + 14 + 3);
    expect(counts(items, DEFAULT_VIEW)).toEqual({
      all: 23,
      experience: 4,
      projects: 14,
      education: 2,
      certifications: 3,
    });
  });

  it("lists newest first, or oldest first", () => {
    const list = visible(items, DEFAULT_VIEW);
    expect(list[0].title).toBe("Lifeflow");
    expect(visible(items, { ...DEFAULT_VIEW, sort: "oldest" })[0].org).toMatch(
      /Faculty of Architecture/,
    );
  });

  it("searches every word, ignoring small words", () => {
    expect(
      titles(visible(items, { ...DEFAULT_VIEW, query: "pokémon" })),
    ).toEqual(["Voydex"]);
    expect(visible(items, { ...DEFAULT_VIEW, query: "the react" }).length).toBe(
      visible(items, { ...DEFAULT_VIEW, query: "react" }).length,
    );
  });

  it("combines stack filters with AND and never shows React on Next.js work", () => {
    const react = visible(items, { ...DEFAULT_VIEW, techs: ["react"] });
    expect(titles(react)).not.toContain("Voydex");
    const both = visible(items, {
      ...DEFAULT_VIEW,
      techs: ["nextjs", "supabase"],
    });
    expect(
      both.every(
        (i) => i.techs.includes("nextjs") && i.techs.includes("supabase"),
      ),
    ).toBe(true);
  });

  it("'Current only' keeps the running role and projects in progress", () => {
    const now = visible(items, { ...DEFAULT_VIEW, current: true });
    expect(titles(now).sort()).toEqual(["Frontend Developer", "Voydex"]);
  });

  it("filters projects by type", () => {
    const client = visible(items, { ...DEFAULT_VIEW, types: ["client"] });
    expect(titles(client).sort()).toEqual(["Onesbryne", "Uparque"]);
    expect(
      matches(
        items.find((i) => i.category === "experience")!,
        "",
        { ...NO_FILTERS, types: ["client"] },
      ),
    ).toBe(false);
  });

  it("keeps the view in the URL", () => {
    const v = {
      ...DEFAULT_VIEW,
      category: "projects" as const,
      query: "react",
      techs: ["nextjs" as const],
      current: true,
    };
    const s = searchFromView(v);
    expect(s).toBe("?cat=projects&q=react&stack=nextjs&now=1");
    expect(viewFromSearch(s, ["nextjs"])).toEqual(v);
    expect(
      viewFromSearch("?cat=nope&stack=madeup&type=client", ["nextjs"]),
    ).toEqual({ ...DEFAULT_VIEW, types: ["client"] });
    expect(searchFromView(DEFAULT_VIEW)).toBe("");
  });

  it("groups the stack options", () => {
    const groups = toolGroups(items);
    expect(groups.map((g) => g.group)).toEqual([
      "frontend",
      "backend",
      "tools",
      "architecture",
    ]);
    expect(groups.flatMap((g) => g.tools.map((t) => t.id))).not.toContain(
      "vercel",
    );
  });
});
