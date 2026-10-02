import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";

/** "Show 12 results", "Show 1 result", or "No results". */
export function showResultsLabel(total: number, lang: Lang): string {
  const t = getT(lang);

  if (total === 0) return t("timeline.filtersNoResults");
  if (total === 1) return t("timeline.showResult");

  return t("timeline.showResults", { n: total });
}

export function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}
