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
        "group/entry relative px-(--row-pad) transition-colors duration-300 hover:bg-hover lg:px-0",
      )}
    >
      <div
        className="relative col-start-1 row-[1/span_3] flex justify-center before:absolute before:inset-y-0 before:left-1/2 before:w-px before:-translate-x-1/2 before:bg-line-2 lg:col-[3/span_1] lg:row-start-1"
        aria-hidden="true"
      >
        <span className="relative mt-7 grid size-5 place-items-center bg-bg transition-colors duration-300 group-hover/entry:bg-[color-mix(in_oklab,var(--ink)_4%,var(--bg))] lg:mt-[30px]">
          <Glyph
            category={item.category}
            status={item.status}
            className="group-hover/entry:text-accent"
          />
        </span>
      </div>

      <p className="an col-start-2 row-start-1 pt-7 text-ink-2 lg:col-[1/span_2] lg:pt-8 lg:pl-(--row-pad)">
        <span className="whitespace-nowrap">{start}</span>
        {end && end !== start && (
          <>
            {" – "}
            <span className="whitespace-nowrap">{end}</span>
          </>
        )}
        {duration && <span className="ml-3 text-ink-3 lg:mt-1 lg:ml-0 lg:block">{duration}</span>}
      </p>

      <div className="col-start-2 row-start-2 pt-3 lg:col-[4/span_7] lg:row-start-1 lg:pt-7 lg:pb-8">
        <h3 className="subheading">
          <EntryTitle item={item} />
        </h3>
        {item.org && <p className="mt-1 text-ink-2">{item.org}</p>}
        {item.summary && (
          <p className="mt-3 max-w-[62ch] text-[0.9375rem] text-ink-2">{item.summary}</p>
        )}
        <StackLine techs={item.techs} className="mt-4" />
      </div>

      <div className="an col-start-2 row-start-3 flex items-start justify-between gap-4 pt-3 pb-8 text-ink-3 lg:col-[11/span_2] lg:row-start-1 lg:flex-col lg:items-end lg:pt-8 lg:pr-(--row-pad)">
        {item.status ? <StatusMark status={item.status} lang={lang} hideCompleted /> : <span />}
        {(item.href || item.external) && (
          <Icon
            name={item.href ? "right" : "out"}
            className="hidden transition-colors duration-300 group-hover/entry:text-accent-ink lg:mt-auto lg:block"
          />
        )}
      </div>
    </li>
  );
}

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
