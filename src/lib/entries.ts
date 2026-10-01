// Where each entry lives, and the order Previous / Next follows.
import { degrees, projects, roles } from "@/content";
import type { EntryRef, Lang, Project, RecordEntry } from "@/content/types";
import { localize } from "./i18n";

type ProjectLike = Pick<Project, "slug">;
type RecordLike = Pick<RecordEntry, "kind" | "slug">;

export function projectPath(project: ProjectLike): string {
  return `/projects/${project.slug}`;
}

export function recordPath(record: RecordLike): string {
  return `/${record.kind}/${record.slug}`;
}

export function projectHref(lang: Lang, project: ProjectLike): string {
  return localize(lang, projectPath(project));
}

export function recordHref(lang: Lang, record: RecordLike): string {
  return localize(lang, recordPath(record));
}

export function refHref(lang: Lang, ref: EntryRef): string {
  return localize(lang, `/${ref}`);
}

/** The entries before and after this one in its list, wrapping round; no previous when there's only one other. */
export function neighbours<T extends { slug: string }>(list: T[], slug: string) {
  const index = list.findIndex((entry) => entry.slug === slug);
  const prev = list[(index - 1 + list.length) % list.length];
  const next = list[(index + 1) % list.length];
  return { prev: prev.slug === next.slug ? null : prev, next };
}

export function projectNeighbours(project: Project) {
  return neighbours(projects, project.slug);
}

export function recordNeighbours(record: RecordEntry) {
  return neighbours<RecordEntry>(record.kind === "experience" ? roles : degrees, record.slug);
}
