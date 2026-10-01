"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { CATEGORIES, type Lang } from "@/content/types";
import { cn } from "@/lib/cn";
import { getT } from "@/lib/i18n";
import {
  byYear,
  filterCount,
  type Filters,
  tabCounts,
  type TimelineItem,
  visible,
} from "./filters";
import { FiltersDialog } from "./filters-dialog";
import type { StackGroup } from "./items";
import { TimelineEntry } from "./timeline-entry";
import { useTimelineView } from "./use-timeline-view";

type TimelineExplorerProps = {
  items: TimelineItem[];
  stack: StackGroup[];
  lang: Lang;
};

/** The list under the chart: category tabs, search, filters and sort, then the entries grouped by year. */
export function TimelineExplorer({ items, stack, lang }: TimelineExplorerProps) {
  const t = getT(lang);
  const knownTools = useMemo(() => stack.flatMap((g) => g.tools.map((tool) => tool.id)), [stack]);
  const [view, setView] = useTimelineView(knownTools);
  // The filters dialog edits a draft; only "Show N results" applies it, and closing discards it.
  const [draft, setDraft] = useState<Filters | null>(null);
  const searchRef = useSearchShortcut();

  const counts = tabCounts(items, view);
  const shown = visible(items, view);
  const applied = filterCount(view);
  const sortLabel = t(view.sort === "oldest" ? "timeline.oldest" : "timeline.newest");
  const sortAction = t(view.sort === "oldest" ? "timeline.sortNewest" : "timeline.sortOldest");

  return (
    <>
      <div className="fbar">
        <div className="fbar-row">
          <div className="tabs" role="group" aria-label={t("timeline.filterLabel")}>
            {(["all", ...CATEGORIES] as const).map((category) => (
              <button
                key={category}
                type="button"
                className={cn(view.category === category && "on")}
                aria-pressed={view.category === category}
                disabled={!counts[category] && view.category !== category}
                onClick={() => setView({ category })}
              >
                {category === "all" ? t("common.all") : t(`section.${category}`)}
                <span className="an num">{counts[category]}</span>
              </button>
            ))}
          </div>
          <div className="ftools">
            <label className="search">
              <Icon name="search" className="text-ink-3" />
              <span className="sr-only">{t("timeline.searchLabel")}</span>
              <input
                ref={searchRef}
                type="search"
                value={view.query}
                placeholder={t("timeline.searchPlaceholder")}
                onChange={(event) => setView({ query: event.target.value })}
              />
              <kbd aria-hidden="true">/</kbd>
            </label>
            <button
              type="button"
              className={cn("tool-btn", applied > 0 && "on")}
              aria-haspopup="dialog"
              onClick={() =>
                setDraft({ techs: [...view.techs], types: [...view.types], current: view.current })
              }
            >
              <Icon name="sliders" />
              {t("timeline.filters")}
              {applied > 0 && <span className="cnt">{applied}</span>}
            </button>
            <button
              type="button"
              className="tool-btn"
              aria-label={`${sortLabel}, ${sortAction.toLowerCase()}`}
              onClick={() => setView({ sort: view.sort === "oldest" ? "newest" : "oldest" })}
            >
              <Icon name={view.sort === "oldest" ? "up" : "down"} />
              {sortLabel}
            </button>
          </div>
        </div>
      </div>

      <p className="sr-only" role="status">
        {shown.length === 1
          ? t("timeline.resultCount.one")
          : t("timeline.resultCount", { n: shown.length })}
      </p>
      <div>
        {shown.length === 0 ? (
          <div className="empty hatch">
            <p>{t("timeline.noResults")}</p>
          </div>
        ) : (
          <ol>
            {byYear(shown).map((group, i) => (
              <li key={group.year}>
                <div className="tgrid level">
                  {i > 0 && <span className="l-spine" aria-hidden="true" />}
                  <h2 className="heading num">{group.year}</h2>
                  <div className="an datum">
                    <DatumMark />
                    {group.items.length}{" "}
                    {t(group.items.length === 1 ? "common.entry" : "common.entries")}
                  </div>
                </div>
                <ol>
                  {group.items.map((item) => (
                    <TimelineEntry key={item.key} item={item} lang={lang} />
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        )}
      </div>

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

/** "/" jumps to the search, unless you're already typing somewhere or a dialog is open. */
function useSearchShortcut() {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (event.key !== "/" || event.metaKey || event.ctrlKey) return;
      if (target.closest("input, textarea, [contenteditable], dialog")) return;
      event.preventDefault();
      ref.current?.focus();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return ref;
}

/** The level mark beside each year, like a datum on a section drawing. */
function DatumMark() {
  return (
    <svg viewBox="0 0 14 10" aria-hidden="true">
      <path d="M0.5 0.5h13L7 9.5Z" fill="var(--bg)" stroke="currentColor" />
      <path d="M7 0.5h6.5L7 9.5Z" fill="currentColor" />
    </svg>
  );
}
