// Dates in content are "YYYY-MM-DD" and mean that calendar day anywhere, so everything here is read in UTC
// (otherwise "2025-01-01" shows as Dec 2024 west of GMT).
import type { ISODate, Lang } from "@/content/types";

// en-US for English months: en-GB writes September as "Sept"; the design uses three letters ("Sep").
const LOCALE: Record<Lang, string> = { en: "en-US", pt: "pt-PT" };

export const toDate = (iso: ISODate): Date => new Date(`${iso}T00:00:00Z`);

const monthFormatters = new Map<string, Intl.DateTimeFormat>();
const monthFormatter = (lang: Lang) => {
  let f = monthFormatters.get(lang);
  if (!f) {
    f = new Intl.DateTimeFormat(LOCALE[lang], {
      month: "short",
      timeZone: "UTC",
    });
    monthFormatters.set(lang, f);
  }
  return f;
};

/** "Jan", "jan" (pt-PT). Formatted on its own: pt-PT turns a short month plus a year into "01/2025". */
export const shortMonth = (date: Date, lang: Lang): string =>
  monthFormatter(lang).format(date).replace(".", "");

/** "Jan 2025" / "jan 2025". */
export const monthYear = (iso: ISODate, lang: Lang): string => {
  const d = toDate(iso);
  return `${shortMonth(d, lang)} ${d.getUTCFullYear()}`;
};

/** "1 Oct 2026" / "1 out 2026" (the footer's last-updated date). */
export const dayMonthYear = (date: Date, lang: Lang): string =>
  `${date.getUTCDate()} ${shortMonth(date, lang)} ${date.getUTCFullYear()}`;

export const year = (iso: ISODate): number => toDate(iso).getUTCFullYear();

/** Inclusive month count, the way CVs count it: Jan 2025 – Sep 2026 is 1 year 9 months. */
export const monthsBetween = (
  start: ISODate,
  end: ISODate | null | undefined,
  now = new Date(),
): number => {
  const s = toDate(start);
  const e = end === null ? now : end ? toDate(end) : s;
  return Math.max(
    1,
    (e.getUTCFullYear() - s.getUTCFullYear()) * 12 +
      (e.getUTCMonth() - s.getUTCMonth()) +
      1,
  );
};

export interface DurationWords {
  year: string;
  years: string;
  month: string;
  months: string;
}

/** "1 yr 9 mos" / "1 ano 9 meses". */
export const formatDuration = (
  months: number,
  words: DurationWords,
): string => {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts: string[] = [];
  if (y > 0) parts.push(`${y} ${y === 1 ? words.year : words.years}`);
  if (m > 0 || y === 0)
    parts.push(`${m} ${m === 1 ? words.month : words.months}`);
  return parts.join(" ");
};
