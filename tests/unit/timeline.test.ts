import { describe, expect, it } from "vitest";
import {
  DEFAULT_VIEW,
  matches,
  NO_FILTERS,
  searchFromView,
  tabCounts,
  type TimelineItem,
  type View,
  viewFromSearch,
  visible,
} from "@/features/timeline/timeline-filters";
import { stackGroups, timelineItems } from "@/features/timeline/timeline-items";

const items = timelineItems("en");
const titles = (list: TimelineItem[]) => list.map((item) => item.title);
const show = (view: Partial<View>) => visible(items, { ...DEFAULT_VIEW, ...view });

describe("timeline items", () => {
  it("has every role, degree, project and certificate", () => {
    expect(tabCounts(items, DEFAULT_VIEW)).toEqual({
      all: 23,
      experience: 4,
      projects: 14,
      education: 2,
      certifications: 3,
    });
  });

  it("groups the stack options, leaving out tools no entry lists", () => {
    const groups = stackGroups(items);

    expect(groups.map((g) => g.group)).toEqual(["frontend", "backend", "tools", "architecture"]);
    expect(groups.flatMap((g) => g.tools.map((tool) => tool.id))).not.toContain("vercel");
  });
});

describe("timeline filters", () => {
  it("lists newest first, or oldest first", () => {
    expect(show({})[0].title).toBe("Lifeflow");
    expect(show({ sort: "oldest" })[0].org).toMatch(/Faculty of Architecture/);
  });

  it("searches every word, ignoring small words", () => {
    expect(titles(show({ query: "pokémon" }))).toEqual(["Voydex"]);
    expect(show({ query: "the react" }).length).toBe(show({ query: "react" }).length);
  });

  it("combines stack filters with AND, and never shows React on Next.js work", () => {
    expect(titles(show({ techs: ["react"] }))).not.toContain("Voydex");
    const both = show({ techs: ["nextjs", "supabase"] });

    expect(both.every((i) => i.techs.includes("nextjs") && i.techs.includes("supabase"))).toBe(
      true,
    );
  });

  it("keeps the running role and projects in progress for 'Current only'", () => {
    expect(titles(show({ current: true })).sort()).toEqual(["Frontend Developer", "Voydex"]);
  });

  it("filters projects by type, and nothing else", () => {
    expect(titles(show({ types: ["client"] })).sort()).toEqual(["Onesbryne", "Uparque"]);
    const role = items.find((item) => item.category === "experience")!;

    expect(matches(role, "", { ...NO_FILTERS, types: ["client"] })).toBe(false);
  });

  it("keeps the view in the URL", () => {
    const view: View = {
      ...DEFAULT_VIEW,
      category: "projects",
      query: "react",
      techs: ["nextjs"],
      current: true,
    };
    const search = searchFromView(view);

    expect(search).toBe("?cat=projects&q=react&stack=nextjs&now=1");
    expect(viewFromSearch(search, ["nextjs"])).toEqual(view);
    expect(viewFromSearch("?cat=nope&stack=madeup&type=client", ["nextjs"])).toEqual({
      ...DEFAULT_VIEW,
      types: ["client"],
    });
    expect(searchFromView(DEFAULT_VIEW)).toBe("");
  });
});
