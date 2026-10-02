import type { Lang, RecordEntry } from "@/content/types";
import { year } from "@/lib/dates";
import { getT } from "@/lib/i18n";

export function yearSpan(records: RecordEntry[], lang: Lang): string {
  const start = Math.min(...records.map((record) => year(record.dateStart)));

  if (records.some((record) => record.dateEnd === null)) {
    return `${start} – ${getT(lang)("common.present")}`;
  }

  const end = Math.max(...records.map((record) => year(record.dateEnd ?? record.dateStart)));

  return start === end ? `${start}` : `${start} – ${end}`;
}
