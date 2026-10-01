// The Timeline's filtering rules, pure so they can be tested and run in the browser without the content.
import type { ToolId } from "@/content/stack";
import type { ISODate, ProjectStatus, ProjectType } from "@/content/types";

export const CATEGORIES = [
  "experience",
  "projects",
  "education",
  "certifications",
] as const;
export type Category = (typeof CATEGORIES)[number];

/** One row of the Timeline, already in the page's language. */
export interface TimelineItem {
  key: string;
  category: Category;
  title: string;
  org?: string;
  summary?: string;
  dateStart: ISODate;
  /** null = still running; absent = a single date. */
  dateEnd?: ISODate | null;
  year: number;
  dates: { start: string; end?: string; duration?: string };
  techs: ToolId[];
  status?: ProjectStatus;
  type?: ProjectType;
  /** Internal page, or an external link (certificates). */
  href?: string;
  external?: string;
  /** Lower-case text the search looks through. */
  search: string;
}

export interface Filters {
  techs: ToolId[];
  types: ProjectType[];
  /** "Current only": the role with no end date and projects in progress. */
  current: boolean;
}

export interface View extends Filters {
  category: Category | "all";
  query: string;
  sort: "newest" | "oldest";
}

export const NO_FILTERS: Filters = { techs: [], types: [], current: false };
export const DEFAULT_VIEW: View = {
  ...NO_FILTERS,
  category: "all",
  query: "",
  sort: "newest",
};

const STOP = new Set([
  "a",
  "an",
  "and",
  "as",
  "the",
  "to",
  "of",
  "in",
  "for",
  "with",
  "e",
  "de",
  "do",
  "da",
  "em",
  "o",
  "os",
  "para",
  "com",
]);

export const queryTokens = (query: string) =>
  query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((x) => x && !STOP.has(x));

/** Search and filters (not the category tab). Stack filters combine as AND; types as OR. */
export const matches = (item: TimelineItem, query: string, f: Filters) => {
  const tokens = queryTokens(query);
  if (tokens.length && !tokens.every((t) => item.search.includes(t)))
    return false;
  if (f.techs.length && !f.techs.every((t) => item.techs.includes(t)))
    return false;
  if (
    f.types.length &&
    !(item.category === "projects" && item.type && f.types.includes(item.type))
  )
    return false;
  if (f.current && !(item.dateEnd === null || item.status === "in progress"))
    return false;
  return true;
};

export const inCategory = (item: TimelineItem, category: View["category"]) =>
  category === "all" || item.category === category;

/** What the list shows: matching items in the tab, sorted. */
export const visible = (items: TimelineItem[], v: View) => {
  const list = items.filter(
    (it) => inCategory(it, v.category) && matches(it, v.query, v),
  );
  const sorted = [...list].sort(
    (a, b) => Date.parse(b.dateStart) - Date.parse(a.dateStart),
  );
  return v.sort === "oldest" ? sorted.reverse() : sorted;
};

/** Grouped by start year, in list order. */
export const byYear = (items: TimelineItem[]) => {
  const groups: { year: number; items: TimelineItem[] }[] = [];
  for (const it of items) {
    const last = groups[groups.length - 1];
    if (last && last.year === it.year) last.items.push(it);
    else groups.push({ year: it.year, items: [it] });
  }
  return groups;
};

/** Tab counts under the current search and filters. */
export const counts = (items: TimelineItem[], v: View) => {
  const m = items.filter((it) => matches(it, v.query, v));
  return {
    all: m.length,
    ...Object.fromEntries(
      CATEGORIES.map((c) => [c, m.filter((x) => x.category === c).length]),
    ),
  } as Record<Category | "all", number>;
};

export const filterCount = (f: Filters) =>
  f.techs.length + f.types.length + (f.current ? 1 : 0);

// The URL holds the view, so a filtered Timeline can be shared: ?cat=projects&q=react&stack=nextjs,supabase&type=client&now=1&sort=oldest
export const viewFromSearch = (
  search: string,
  knownTools: readonly string[],
): View => {
  const p = new URLSearchParams(search);
  const list = (k: string) => (p.get(k) ?? "").split(",").filter(Boolean);
  const cat = p.get("cat");
  return {
    category: (CATEGORIES as readonly string[]).includes(cat ?? "")
      ? (cat as Category)
      : "all",
    query: p.get("q") ?? "",
    sort: p.get("sort") === "oldest" ? "oldest" : "newest",
    techs: list("stack").filter((t) => knownTools.includes(t)) as ToolId[],
    types: list("type").filter((t): t is ProjectType =>
      ["client", "personal", "learning"].includes(t),
    ),
    current: p.get("now") === "1",
  };
};

export const searchFromView = (v: View) => {
  const p = new URLSearchParams();
  if (v.category !== "all") p.set("cat", v.category);
  if (v.query.trim()) p.set("q", v.query);
  if (v.techs.length) p.set("stack", v.techs.join(","));
  if (v.types.length) p.set("type", v.types.join(","));
  if (v.current) p.set("now", "1");
  if (v.sort === "oldest") p.set("sort", "oldest");
  const s = p.toString();
  return s ? `?${s}` : "";
};
