import type { UiKey } from "@/lib/i18n";

type NavItem = {
  path: string;
  key: UiKey;
  sections: string[];
};

export const HOME: NavItem = { path: "/", key: "nav.home", sections: [] };

export const NAV: NavItem[] = [
  { path: "/projects", key: "nav.projects", sections: ["/projects"] },
  { path: "/timeline", key: "nav.timeline", sections: ["/timeline", "/experience", "/education"] },
  { path: "/about", key: "nav.about", sections: ["/about"] },
];

export function isCurrent(item: NavItem, sharedPath: string): boolean {
  if (item.path === "/") return sharedPath === "/";

  return item.sections.some(
    (section) => sharedPath === section || sharedPath.startsWith(`${section}/`),
  );
}
