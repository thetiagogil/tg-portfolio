import Link from "next/link";
import { Glyph } from "@/components/entries/glyph";
import { StackLine } from "@/components/entries/stack";
import { StatusMark } from "@/components/entries/status-mark";
import { Icon } from "@/components/ui/icon";
import type { Lang } from "@/content/types";
import type { TimelineItem } from "./filters";

type TimelineEntryProps = {
  item: TimelineItem;
  lang: Lang;
};

/** One row of the list: marker on the spine, dates, title and summary, then status and an arrow. */
export function TimelineEntry({ item, lang }: TimelineEntryProps) {
  const { start, end, duration } = item.dates;
  return (
    <li className="tgrid entry">
      <div className="e-spine" aria-hidden="true">
        <span className="gl">
          <Glyph category={item.category} status={item.status} />
        </span>
      </div>
      <p className="an e-date">
        <span className="nw">{start}</span>
        {end && end !== start && (
          <>
            {" – "}
            <span className="end nw">{end}</span>
          </>
        )}
        {duration && <span className="d">{duration}</span>}
      </p>
      <div className="e-body">
        <h3 className="subheading">
          <EntryTitle item={item} />
        </h3>
        {item.org && <p className="org">{item.org}</p>}
        {item.summary && <p className="sum">{item.summary}</p>}
        <StackLine techs={item.techs} />
      </div>
      <div className="an e-meta">
        {item.status ? <StatusMark status={item.status} lang={lang} hideCompleted /> : <span />}
        {item.href && <Icon name="right" />}
        {item.external && <Icon name="out" />}
      </div>
    </li>
  );
}

function EntryTitle({ item }: { item: TimelineItem }) {
  if (item.href) return <Link href={item.href}>{item.title}</Link>;
  if (item.external) {
    return (
      <a href={item.external} target="_blank" rel="noreferrer">
        {item.title}
      </a>
    );
  }
  return item.title;
}
