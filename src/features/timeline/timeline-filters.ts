import type { ToolId } from "@/content/stack";
import {
  CATEGORIES,
  type Category,
  type ISODate,
  PROJECT_TYPES,
  type ProjectStatus,
  type ProjectType,
} from "@/content/types";

export type TimelineItem = {
  key: string;
  category: Category;
  title: string;
  org?: string;
  summary?: string;
  dateStart: ISODate;
  dateEnd?: ISODate | null;
  year: number;
  dates: { start: string; end?: string; duration?: string };
  techs: ToolId[];
  status?: ProjectStatus;
  type?: ProjectType;
  href?: string;
  external?: string;
  search: string;
};

export type Filters = {
  techs: ToolId[];
  types: ProjectType[];
  current: boolean;
};

export type View = Filters & {
  category: Category | "all";
  query: string;
  sort: "newest" | "oldest";
};

export const NO_FILTERS: Filters = { techs: [], types: [], current: false };

export const DEFAULT_VIEW: View = { ...NO_FILTERS, category: "all", query: "", sort: "newest" };

const STOP_WORDS = new Set([
  ...["a", "an", "and", "as", "the", "to", "of", "in", "for", "with"],
  ...["e", "de", "do", "da", "em", "o", "os", "para", "com"],
]);

// Stack filters combine as AND; project types as OR.
export function matches(item: TimelineItem, query: string, filters: Filters): boolean {
  const words = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word && !STOP_WORDS.has(word));

  if (!words.every((word) => item.search.includes(word))) return false;
  if (!filters.techs.every((tech) => item.techs.includes(tech))) return false;
  if (filters.types.length && !(item.type && filters.types.includes(item.type))) return false;
  if (filters.current && !(item.dateEnd === null || item.status === "in progress")) return false;

  return true;
}

export function visible(items: TimelineItem[], view: View): TimelineItem[] {
  const shown = items.filter(
    (item) =>
      (view.category === "all" || item.category === view.category) &&
      matches(item, view.query, view),
  );
  const newest = shown.sort((a, b) => Date.parse(b.dateStart) - Date.parse(a.dateStart));

  return view.sort === "oldest" ? newest.reverse() : newest;
}

export function byYear(items: TimelineItem[]) {
  const groups: { year: number; items: TimelineItem[] }[] = [];

  for (const item of items) {
    const last = groups.at(-1);

    if (last?.year === item.year) last.items.push(item);
    else groups.push({ year: item.year, items: [item] });
  }

  return groups;
}

export function tabCounts(items: TimelineItem[], view: View): Record<Category | "all", number> {
  const shown = items.filter((item) => matches(item, view.query, view));
  const counts = { all: shown.length } as Record<Category | "all", number>;

  for (const category of CATEGORIES)
    counts[category] = shown.filter((item) => item.category === category).length;

  return counts;
}

export function filterCount(filters: Filters): number {
  return filters.techs.length + filters.types.length + (filters.current ? 1 : 0);
}

export function viewFromSearch(search: string, knownTools: readonly string[]): View {
  const params = new URLSearchParams(search);
  const list = (key: string) => (params.get(key) ?? "").split(",").filter(Boolean);
  const category = params.get("cat");

  return {
    category: isOneOf(CATEGORIES, category) ? category : "all",
    query: params.get("q") ?? "",
    sort: params.get("sort") === "oldest" ? "oldest" : "newest",
    techs: list("stack").filter((tech) => knownTools.includes(tech)) as ToolId[],
    types: list("type").filter((type) => isOneOf(PROJECT_TYPES, type)),
    current: params.get("now") === "1",
  };
}

export function searchFromView(view: View): string {
  const params = new URLSearchParams();

  if (view.category !== "all") params.set("cat", view.category);
  if (view.query.trim()) params.set("q", view.query);
  if (view.techs.length) params.set("stack", view.techs.join(","));
  if (view.types.length) params.set("type", view.types.join(","));
  if (view.current) params.set("now", "1");
  if (view.sort === "oldest") params.set("sort", "oldest");
  const search = params.toString();

  return search ? `?${search}` : "";
}

function isOneOf<T extends string>(options: readonly T[], value: string | null): value is T {
  return options.includes(value as T);
}
