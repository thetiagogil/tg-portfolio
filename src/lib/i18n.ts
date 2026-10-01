// Languages: English at "/", Portuguese mirrored under "/pt" with the same paths.
import type { Lang } from "@/content/types";
import { en, type UiKey } from "@/content/ui/en";
import { pt } from "@/content/ui/pt";

export type { Lang, UiKey };

const DICTIONARIES: Record<Lang, Record<UiKey, string>> = { en, pt };

/** The interface text for a language: `t("nav.projects")`. */
export const getT = (lang: Lang) => (key: UiKey) => DICTIONARIES[lang][key];

/** The value for the `lang` attribute and `hreflang`. */
export const HTML_LANG: Record<Lang, string> = { en: "en", pt: "pt-PT" };

/** A shared path in a language: localize("pt", "/projects") → "/pt/projects". */
export const localize = (lang: Lang, path: string): string =>
  lang === "en" ? path : path === "/" ? "/pt" : `/pt${path}`;

/** The language of a URL path. */
export const langOf = (pathname: string): Lang =>
  pathname === "/pt" || pathname.startsWith("/pt/") ? "pt" : "en";

/** The path both languages share: "/pt/projects" → "/projects". */
export const sharedPath = (pathname: string): string =>
  pathname === "/pt"
    ? "/"
    : pathname.startsWith("/pt/")
      ? pathname.slice(3)
      : pathname;
