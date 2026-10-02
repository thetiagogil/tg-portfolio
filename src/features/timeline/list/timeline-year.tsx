import type { Lang } from "@/content/types";
import { cn } from "@/lib/cn";
import { getT } from "@/lib/i18n";
import type { TimelineItem } from "../timeline-filters";
import { TimelineEntry } from "./timeline-entry";
import { TIMELINE_GRID } from "./timeline-grid";

type TimelineYearProps = {
  year: number;
  items: TimelineItem[];
  first: boolean;
  lang: Lang;
};

/** A year: the number on a level line with its entry count, then its entries. The spine runs on from the previous
    year down to this one's marker, so the timeline reads as one continuous line. */
export function TimelineYear({ year, items, first, lang }: TimelineYearProps) {
  const t = getT(lang);

  return (
    <li>
      <div className={cn(TIMELINE_GRID, "items-end pt-6", first && "pt-16")}>
        {!first && (
          <span
            className="before:bg-line-2 relative col-start-1 row-[1/span_2] -mt-6 translate-x-(--row-pad) self-stretch before:absolute before:inset-y-0 before:left-1/2 before:w-px before:-translate-x-1/2 lg:col-[3/span_1] lg:row-start-1 lg:translate-none"
            aria-hidden="true"
          />
        )}

        <h2 className="heading col-[2/-1] row-start-1 pl-(--row-pad) tabular-nums lg:col-[1/span_2] lg:pl-0">
          {year}
        </h2>

        <div className="an border-ink text-ink-3 relative col-span-full row-start-2 mt-4 flex justify-end border-b pb-2 lg:col-[3/span_10] lg:row-start-1 lg:mt-0">
          <DatumMark />
          {items.length} {t(items.length === 1 ? "common.entry" : "common.entries")}
        </div>
      </div>

      <ol>
        {items.map((item) => (
          <TimelineEntry key={item.key} item={item} lang={lang} />
        ))}
      </ol>
    </li>
  );
}

function DatumMark() {
  return (
    <svg
      className="text-ink absolute bottom-0 left-[calc(10px_+_var(--row-pad))] h-2.5 w-3.5 -translate-x-1/2 overflow-visible lg:left-[calc((100%_-_9*var(--grid-gap))/20)]"
      viewBox="0 0 14 10"
      aria-hidden="true"
    >
      <path d="M0.5 0.5h13L7 9.5Z" fill="var(--bg)" stroke="currentColor" />
      <path d="M7 0.5h6.5L7 9.5Z" fill="currentColor" />
    </svg>
  );
}
