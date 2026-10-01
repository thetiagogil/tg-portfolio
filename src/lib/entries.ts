// Where each entry lives, and the order Previous / Next follows.
import { degrees, projects, roles } from "@/content";
import type { Degree, EntryRef, Lang, Project, Role } from "@/content/types";
import { localize } from "./i18n";

export const projectPath = (p: Pick<Project, "slug">) => `/projects/${p.slug}`;
export const recordPath = (r: Pick<Role | Degree, "kind" | "slug">) =>
  `/${r.kind}/${r.slug}`;
export const refPath = (ref: EntryRef) => `/${ref}`;

export const projectHref = (lang: Lang, p: Pick<Project, "slug">) =>
  localize(lang, projectPath(p));
export const recordHref = (
  lang: Lang,
  r: Pick<Role | Degree, "kind" | "slug">,
) => localize(lang, recordPath(r));

/** The entries before and after this one in its list (wrapping round); null when the list has only one other. */
export const neighbours = <T extends { slug: string }>(
  list: T[],
  slug: string,
) => {
  const i = list.findIndex((x) => x.slug === slug);
  const n = list.length;
  const prev = list[(i - 1 + n) % n];
  const next = list[(i + 1) % n];
  return { prev: prev.slug === next.slug ? null : prev, next };
};

export const projectNeighbours = (slug: string) => neighbours(projects, slug);
export const recordNeighbours = (r: Role | Degree) =>
  neighbours<Role | Degree>(r.kind === "experience" ? roles : degrees, r.slug);
