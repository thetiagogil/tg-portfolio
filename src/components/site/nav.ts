import type { UiKey } from "@/lib/i18n";

/** Main navigation. `match` lists the shared paths that mark a link as the current section. */
export const NAV: { path: string; key: UiKey; match: string[] }[] = [
  { path: "/projects", key: "nav.projects", match: ["/projects"] },
  {
    path: "/timeline",
    key: "nav.timeline",
    match: ["/timeline", "/experience", "/education"],
  },
  { path: "/about", key: "nav.about", match: ["/about"] },
];

export const isCurrent = (shared: string, match: string[]) =>
  match.some((m) => shared === m || shared.startsWith(`${m}/`));
