"use client";

import { useMemo, useState } from "react";
import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";
import {
  byYear,
  filterCount,
  type Filters,
  tabCounts,
  type TimelineItem,
  visible,
} from "../timeline-filters";
import type { StackGroup } from "../timeline-items";
import { FiltersDialog } from "./filters-dialog";
import { TimelineToolbar } from "./timeline-toolbar";
import { TimelineYear } from "./timeline-year";
import { useTimelineView } from "./use-timeline-view";

type TimelineExplorerProps = {
  items: TimelineItem[];
  stack: StackGroup[];
  lang: Lang;
};

export function TimelineExplorer({ items, stack, lang }: TimelineExplorerProps) {
  const knownTools = useMemo(() => stack.flatMap((g) => g.tools.map((tool) => tool.id)), [stack]);
  const [view, setView] = useTimelineView(knownTools);
  const [draft, setDraft] = useState<Filters | null>(null);

  const t = getT(lang);
  const shown = visible(items, view);
  const years = byYear(shown);

  return (
    <>
      <TimelineToolbar
        view={view}
        counts={tabCounts(items, view)}
        applied={filterCount(view)}
        onChange={setView}
        onOpenFilters={() =>
          setDraft({ techs: [...view.techs], types: [...view.types], current: view.current })
        }
        lang={lang}
      />

      <p className="sr-only" role="status">
        {shown.length === 1
          ? t("timeline.resultCount.one")
          : t("timeline.resultCount", { n: shown.length })}
      </p>

      {years.length === 0 ? (
        <div className="hatch mt-12 grid min-h-60 place-items-center p-8 text-center">
          <p className="max-w-[40ch] bg-bg px-4 py-2 text-ink-2">{t("timeline.noResults")}</p>
        </div>
      ) : (
        <ol>
          {years.map((group, i) => (
            <TimelineYear
              key={group.year}
              year={group.year}
              items={group.items}
              first={i === 0}
              lang={lang}
            />
          ))}
        </ol>
      )}

      <FiltersDialog
        draft={draft}
        onChange={setDraft}
        onApply={(filters) => {
          setView(filters);
          setDraft(null);
        }}
        items={items}
        view={view}
        stack={stack}
        lang={lang}
      />
    </>
  );
}
