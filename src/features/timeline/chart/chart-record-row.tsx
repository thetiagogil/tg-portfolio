import Link from "next/link";
import type { CSSProperties } from "react";
import { Glyph } from "@/components/entries/glyph";
import type { Lang, RecordEntry } from "@/content/types";
import { cn } from "@/lib/cn";
import { toDate } from "@/lib/dates";
import { recordHref } from "@/lib/entries";
import { pct, type Scale } from "@/lib/scale";
import { ChartRowLabel } from "./chart-row-label";

type ChartRecordRowProps = {
  record: RecordEntry;
  scale: Scale;
  today: Date;
  /** Bars draw one after another, in this order. */
  order: number;
  lang: Lang;
};

/** A role or degree as a bar: solid for work, outlined for studies, accent while still running. */
export function ChartRecordRow({ record, scale, today, order, lang }: ChartRecordRowProps) {
  const start = scale.pos(toDate(record.dateStart));
  const end = scale.pos(record.dateEnd === null ? today : toDate(record.dateEnd));

  return (
    <Link
      className="group/row relative block border-t border-line transition-colors duration-300 hover:bg-hover"
      href={recordHref(lang, record)}
    >
      <div className="grid grid-cols-[var(--label-w)_1fr] px-(--row-pad)">
        <ChartRowLabel
          glyph={<Glyph category={record.kind} className="group-hover/row:text-accent" />}
          title={record.chart?.label[lang] ?? record.org[lang]}
          narrowTitle={record.chart?.labelNarrow}
          meta={record.chart?.role[lang] ?? record.title[lang]}
          fullTitle={`${record.org[lang]} · ${record.title[lang]}`}
        />

        <div className="relative h-12">
          <span
            className={cn(
              "chart-bar absolute top-1/2 h-2.5 origin-left -translate-y-1/2 bg-current text-ink-2 group-hover/row:text-accent",
              record.kind === "education" && "bg-bg inset-ring",
              record.dateEnd === null && "text-accent",
            )}
            style={
              {
                left: pct(start),
                width: pct(Math.max(end - start, 0.006)),
                "--bar-delay": `${150 + order * 110}ms`,
              } as CSSProperties
            }
          />
        </div>
      </div>
    </Link>
  );
}
