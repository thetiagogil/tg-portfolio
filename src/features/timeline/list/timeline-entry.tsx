import Link from "next/link";
import { Glyph } from "@/components/entries/glyph";
import { StackLine } from "@/components/entries/stack";
import { StatusMark } from "@/components/entries/status-mark";
import { Icon } from "@/components/ui/icon";
import type { Lang } from "@/content/types";
import { cn } from "@/lib/cn";
import type { TimelineItem } from "../timeline-filters";
import { TIMELINE_GRID } from "./timeline-grid";

type TimelineEntryProps = {
  item: TimelineItem;
  lang: Lang;
};

// On desktop only the date and the last column are padded, which keeps the spine on each year's marker.
export function TimelineEntry({ item, lang }: TimelineEntryProps) {
  const { start, end, duration } = item.dates;

  return (
    <li
      className={cn(
        TIMELINE_GRID,
        "group/entry hover:bg-hover relative px-(--row-pad) transition-colors duration-300 lg:px-0",
      )}
    >
      <div
        className="before:bg-line-2 relative col-start-1 row-[1/span_3] flex justify-center before:absolute before:inset-y-0 before:left-1/2 before:w-px before:-translate-x-1/2 lg:col-[3/span_1] lg:row-start-1"
        aria-hidden="true"
      >
        <span className="bg-bg relative mt-7 grid size-5 place-items-center transition-colors duration-300 group-hover/entry:bg-[color-mix(in_oklab,var(--ink)_4%,var(--bg))] lg:mt-[30px]">
          <Glyph
            category={item.category}
            status={item.status}
            className="group-hover/entry:text-accent"
          />
        </span>
      </div>

      {/* A range stays on one line when it fits ("Mar 2024 – Feb 2025"); otherwise it breaks after the dash. */}
      <p className="an text-ink-2 col-start-2 row-start-1 pt-7 lg:col-[1/span_2] lg:pt-8 lg:pl-(--row-pad)">
        <span className="whitespace-nowrap">{start}</span>
        {end && end !== start && (
          <>
            {" – "}
            <span className="whitespace-nowrap">{end}</span>
          </>
        )}
        {duration && <span className="text-ink-3 ml-3 lg:mt-1 lg:ml-0 lg:block">{duration}</span>}
      </p>

      <div className="col-start-2 row-start-2 pt-3 lg:col-[4/span_7] lg:row-start-1 lg:pt-7 lg:pb-8">
        <h3 className="subheading">
          <EntryTitle item={item} />
        </h3>
        {item.org && <p className="text-ink-2 mt-1">{item.org}</p>}
        {item.summary && (
          <p className="text-ink-2 mt-3 max-w-[62ch] text-[0.9375rem]">{item.summary}</p>
        )}
        <StackLine techs={item.techs} className="mt-4" />
      </div>

      <div className="an text-ink-3 col-start-2 row-start-3 flex items-start justify-between gap-4 pt-3 pb-8 lg:col-[11/span_2] lg:row-start-1 lg:flex-col lg:items-end lg:pt-8 lg:pr-(--row-pad)">
        {item.status ? <StatusMark status={item.status} lang={lang} hideCompleted /> : <span />}
        {(item.href || item.external) && (
          <Icon
            name={item.href ? "right" : "out"}
            className="group-hover/entry:text-accent-ink hidden transition-colors duration-300 lg:mt-auto lg:block"
          />
        )}
      </div>
    </li>
  );
}

/** The title links to the entry's page, or out to the certificate; the link covers the whole row. */
function EntryTitle({ item }: { item: TimelineItem }) {
  const link =
    "transition-colors duration-300 after:absolute after:inset-0 group-hover/entry:text-accent-ink";

  if (item.href) {
    return (
      <Link href={item.href} className={link}>
        {item.title}
      </Link>
    );
  }

  if (item.external) {
    return (
      <a href={item.external} target="_blank" rel="noreferrer" className={link}>
        {item.title}
      </a>
    );
  }

  return item.title;
}
