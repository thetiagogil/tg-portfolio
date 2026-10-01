// Languages: English at "/", Portuguese mirrored under "/pt" with the same paths.
import type { Lang } from "@/content/types";
import { en, type UiKey } from "@/content/ui/en";
import { pt } from "@/content/ui/pt";

export type { Lang, UiKey };

type Values = Record<string, string | number>;

const DICTIONARIES: Record<Lang, Record<UiKey, string>> = { en, pt };

/** The value for the `lang` attribute and `hreflang`. */
export const HTML_LANG: Record<Lang, string> = { en: "en", pt: "pt-PT" };

/** Fills "{name}" placeholders: fill("{n} of {total}", { n: 3, total: 7 }) → "3 of 7". */
export function fill(template: string, values: Values): string {
  return template.replace(/\{(\w+)\}/g, (match, name: string) => String(values[name] ?? match));
}

/** The interface text for a language: t("nav.projects"), t("lightbox.counter", { n: 2, total: 4 }). */
export function getT(lang: Lang) {
  return (key: UiKey, values?: Values) =>
    values ? fill(DICTIONARIES[lang][key], values) : DICTIONARIES[lang][key];
}

/** A shared path in a language: localize("pt", "/projects") → "/pt/projects". */
export function localize(lang: Lang, path: string): string {
  if (lang === "en") return path;
  return path === "/" ? "/pt" : `/pt${path}`;
}

/** The language of a URL path. */
export function langOf(pathname: string): Lang {
  return pathname === "/pt" || pathname.startsWith("/pt/") ? "pt" : "en";
}

/** The path both languages share: "/pt/projects" → "/projects". */
export function sharedPath(pathname: string): string {
  if (pathname === "/pt") return "/";
  return pathname.startsWith("/pt/") ? pathname.slice(3) : pathname;
}
