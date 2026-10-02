// Content dates are "YYYY-MM-DD" and mean that calendar day anywhere, so everything here reads them in UTC
// (otherwise "2025-01-01" shows as Dec 2024 west of GMT).
import type { ISODate, Lang } from "@/content/types";
import { getT } from "./i18n";

// en-US for English months: en-GB writes September as "Sept"; the design uses three letters ("Sep").
const LOCALES: Record<Lang, string> = { en: "en-US", pt: "pt-PT" };

const monthFormats = new Map<Lang, Intl.DateTimeFormat>();

export function toDate(iso: ISODate): Date {
  return new Date(`${iso}T00:00:00Z`);
}

export function year(iso: ISODate): number {
  return toDate(iso).getUTCFullYear();
}

/** "Jan" / "jan". Formatted on its own: pt-PT turns a short month plus a year into "01/2025". */
export function shortMonth(date: Date, lang: Lang): string {
  let format = monthFormats.get(lang);

  if (!format) {
    format = new Intl.DateTimeFormat(LOCALES[lang], { month: "short", timeZone: "UTC" });
    monthFormats.set(lang, format);
  }

  return format.format(date).replace(".", "");
}

export function monthYear(iso: ISODate, lang: Lang): string {
  const date = toDate(iso);

  return `${shortMonth(date, lang)} ${date.getUTCFullYear()}`;
}

export function endLabel(end: ISODate | null, lang: Lang): string {
  return end === null ? getT(lang)("common.present") : monthYear(end, lang);
}

export function dayMonthYear(date: Date, lang: Lang): string {
  return `${date.getUTCDate()} ${shortMonth(date, lang)} ${date.getUTCFullYear()}`;
}

/** Inclusive month count, the way CVs count it: Jan 2025 – Sep 2026 is 1 year 9 months. */
export function monthsBetween(
  start: ISODate,
  end: ISODate | null | undefined,
  now = new Date(),
): number {
  const from = toDate(start);
  let to = from;

  if (end === null) to = now;
  else if (end) to = toDate(end);
  const months =
    (to.getUTCFullYear() - from.getUTCFullYear()) * 12 + (to.getUTCMonth() - from.getUTCMonth());

  return Math.max(1, months + 1);
}

export function formatDuration(months: number, lang: Lang): string {
  const t = getT(lang);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];

  if (years > 0) parts.push(`${years} ${t(years === 1 ? "duration.year" : "duration.years")}`);
  if (rest > 0 || years === 0)
    parts.push(`${rest} ${t(rest === 1 ? "duration.month" : "duration.months")}`);

  return parts.join(" ");
}

export function duration(start: ISODate, end: ISODate | null | undefined, lang: Lang): string {
  return formatDuration(monthsBetween(start, end), lang);
}
