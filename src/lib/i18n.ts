import type { Lang } from "@/content/types";
import { en, type UiKey } from "@/content/ui/en";
import { pt } from "@/content/ui/pt";

export type { Lang, UiKey };

type Values = Record<string, string | number>;

const DICTIONARIES: Record<Lang, Record<UiKey, string>> = { en, pt };

export const HTML_LANG: Record<Lang, string> = { en: "en", pt: "pt-PT" };

export function fill(template: string, values: Values): string {
  return template.replace(/\{(\w+)\}/g, (match, name: string) => String(values[name] ?? match));
}

export function getT(lang: Lang) {
  return (key: UiKey, values?: Values) =>
    values ? fill(DICTIONARIES[lang][key], values) : DICTIONARIES[lang][key];
}

export function localize(lang: Lang, path: string): string {
  if (lang === "en") return path;

  return path === "/" ? "/pt" : `/pt${path}`;
}

export function langOf(pathname: string): Lang {
  return pathname === "/pt" || pathname.startsWith("/pt/") ? "pt" : "en";
}

export function sharedPath(pathname: string): string {
  if (pathname === "/pt") return "/";

  return pathname.startsWith("/pt/") ? pathname.slice(3) : pathname;
}
