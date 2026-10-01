"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Dialog } from "@/components/Dialog";
import { Glyph } from "@/components/Glyph";
import { Icon } from "@/components/Icon";
import { StackLine } from "@/components/Stack";
import { ListStatus } from "@/components/StatusMark";
import type { ToolGroup, ToolId } from "@/content/stack";
import type { Lang, ProjectType } from "@/content/types";
import { cn } from "@/lib/cn";
import { fill } from "@/lib/format";
import { getT } from "@/lib/i18n";
import {
  byYear,
  CATEGORIES,
  counts,
  filterCount,
  NO_FILTERS,
  searchFromView,
  type Filters,
  type TimelineItem,
  type View,
  viewFromSearch,
  visible,
} from "@/lib/timeline-filter";

const TYPES: ProjectType[] = ["client", "personal", "learning"];

// The view lives in the URL (?cat=…&q=…&stack=…), so a filtered Timeline can be shared and Back works.
const URL_EVENT = "timeline:url";
const subscribe = (onChange: () => void) => {
  window.addEventListener("popstate", onChange);
  window.addEventListener(URL_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(URL_EVENT, onChange);
  };
};

export function TimelineExplorer({
  items,
  groups,
  lang,
}: {
  items: TimelineItem[];
  groups: { group: ToolGroup; tools: { id: ToolId; name: string }[] }[];
  lang: Lang;
}) {
  const t = getT(lang);
  const toolIds = useMemo(
    () => groups.flatMap((g) => g.tools.map((x) => x.id)),
    [groups],
  );
  const search = useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => "",
  );
  const view = useMemo(
    () => viewFromSearch(search, toolIds),
    [search, toolIds],
  );
  const setView = (patch: Partial<View>) => {
    const next = { ...view, ...patch };
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${searchFromView(next)}`,
    );
    window.dispatchEvent(new Event(URL_EVENT));
  };

  // "/" jumps to the search, unless you're already typing somewhere.
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (
        e.key !== "/" ||
        e.metaKey ||
        e.ctrlKey ||
        el.closest("input, textarea, [contenteditable], dialog")
      )
        return;
      e.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // The filters modal edits a draft; only "Show N results" applies it. Closing discards it.
  const [draft, setDraft] = useState<Filters | null>(null);
  const applied = filterCount(view);
  const tabCounts = counts(items, view);
  const groupsByYear = byYear(visible(items, view));

  return (
    <>
      <div className="fbar">
        <div className="fbar-row">
          <div
            className="tabs"
            role="group"
            aria-label={t("timeline.filterLabel")}
          >
            {(["all", ...CATEGORIES] as const).map((c) => (
              <button
                key={c}
                type="button"
                className={cn(view.category === c && "on")}
                aria-pressed={view.category === c}
                disabled={!tabCounts[c] && view.category !== c}
                onClick={() => setView({ category: c })}
              >
                {c === "all" ? t("timeline.all") : t(`section.${c}`)}
                <span className="an num">{tabCounts[c]}</span>
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
                onChange={(e) => setView({ query: e.target.value })}
              />
              <kbd aria-hidden="true">/</kbd>
            </label>
            <button
              type="button"
              className={cn("tool-btn", applied > 0 && "on")}
              aria-haspopup="dialog"
              onClick={() =>
                setDraft({
                  techs: [...view.techs],
                  types: [...view.types],
                  current: view.current,
                })
              }
            >
              <Icon name="sliders" />
              {t("timeline.filters")}
              {applied > 0 && <span className="cnt">{applied}</span>}
            </button>
            <button
              type="button"
              className="tool-btn"
              aria-label={`${t(view.sort === "oldest" ? "timeline.oldest" : "timeline.newest")}, ${t(view.sort === "oldest" ? "timeline.sortNewest" : "timeline.sortOldest").toLowerCase()}`}
              onClick={() =>
                setView({ sort: view.sort === "oldest" ? "newest" : "oldest" })
              }
            >
              <Icon name={view.sort === "oldest" ? "up" : "down"} />
              {t(
                view.sort === "oldest" ? "timeline.oldest" : "timeline.newest",
              )}
            </button>
          </div>
        </div>
      </div>

      <div aria-live="polite">
        {groupsByYear.length === 0 ? (
          <div className="empty hatch">
            <p>{t("timeline.noResults")}</p>
          </div>
        ) : (
          <ol>
            {groupsByYear.map((g, gi) => (
              <li key={g.year}>
                <div className="tgrid level">
                  {gi > 0 && <span className="l-spine" aria-hidden="true" />}
                  <h2 className="heading num">{g.year}</h2>
                  <div className="an datum">
                    <svg viewBox="0 0 14 10" aria-hidden="true">
                      <path
                        d="M0.5 0.5h13L7 9.5Z"
                        fill="var(--bg)"
                        stroke="currentColor"
                      />
                      <path d="M7 0.5h6.5L7 9.5Z" fill="currentColor" />
                    </svg>
                    {g.items.length}{" "}
                    {t(
                      g.items.length === 1
                        ? "timeline.entry"
                        : "timeline.entries",
                    )}
                  </div>
                </div>
                <ol>
                  {g.items.map((it) => (
                    <Entry key={it.key} item={it} lang={lang} />
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        )}
      </div>

      <FiltersModal
        draft={draft}
        setDraft={setDraft}
        items={items}
        view={view}
        groups={groups}
        lang={lang}
        onApply={(f) => {
          setView(f);
          setDraft(null);
        }}
      />
    </>
  );
}

function Entry({ item: it, lang }: { item: TimelineItem; lang: Lang }) {
  const title = it.href ? (
    <Link href={it.href}>{it.title}</Link>
  ) : it.external ? (
    <a href={it.external} target="_blank" rel="noreferrer">
      {it.title}
    </a>
  ) : (
    it.title
  );
  return (
    <li className="tgrid entry">
      <div className="e-spine" aria-hidden="true">
        <span className="gl">
          <Glyph category={it.category} status={it.status} />
        </span>
      </div>
      <p className="an e-date">
        <span className="nw">{it.dates.start}</span>
        {it.dates.end && it.dates.end !== it.dates.start && (
          <>
            {" – "}
            <span className="end nw">{it.dates.end}</span>
          </>
        )}
        {it.dates.duration && <span className="d">{it.dates.duration}</span>}
      </p>
      <div className="e-body">
        <h3 className="subheading">{title}</h3>
        {it.org && <p className="org">{it.org}</p>}
        {it.summary && <p className="sum">{it.summary}</p>}
        <StackLine techs={it.techs} />
      </div>
      <div className="an e-meta">
        {it.category === "projects" && it.status ? (
          <ListStatus status={it.status} lang={lang} />
        ) : (
          <span />
        )}
        {(it.href || it.external) && <Icon name={it.href ? "right" : "out"} />}
      </div>
    </li>
  );
}

function FiltersModal({
  draft,
  setDraft,
  items,
  view,
  groups,
  lang,
  onApply,
}: {
  draft: Filters | null;
  setDraft: (f: Filters | null) => void;
  items: TimelineItem[];
  view: View;
  groups: { group: ToolGroup; tools: { id: ToolId; name: string }[] }[];
  lang: Lang;
  onApply: (f: Filters) => void;
}) {
  const t = getT(lang);
  const f = draft ?? NO_FILTERS;
  const results = (next: Filters) =>
    visible(items, { ...view, ...next }).length;
  const n = results(f);
  // An option that would leave nothing to show is faded and disabled; ticked options never are.
  const option = (
    on: boolean,
    next: Filters,
    label: React.ReactNode,
    onToggle: () => void,
    key: string,
  ) => (
    <button
      key={key}
      type="button"
      className={cn("fopt", on && "on")}
      aria-pressed={on}
      disabled={!on && results(next) === 0}
      onClick={onToggle}
    >
      <span className="fbox">
        <Icon name="check" />
      </span>
      <span>{label}</span>
    </button>
  );
  const toggle = <T,>(list: T[], v: T) =>
    list.includes(v) ? list.filter((x) => x !== v) : [...list, v];

  return (
    <Dialog
      open={draft !== null}
      onClose={() => setDraft(null)}
      className="fmodal"
      labelledBy="tl-filters-title"
    >
      <header className="fmodal-head">
        <h2
          className="subheading"
          id="tl-filters-title"
          tabIndex={-1}
          autoFocus
        >
          {t("timeline.filters")}
        </h2>
        <button
          type="button"
          className="icon-btn"
          onClick={() => setDraft(null)}
        >
          <Icon name="x" />
          <span className="sr-only">{t("nav.close")}</span>
        </button>
      </header>
      <div className="fmodal-body">
        <div className="fgroup">
          <div className="fopts one">
            {option(
              f.current,
              { ...f, current: true },
              <>
                {t("timeline.currentOnly")}
                <span className="fhint">{t("timeline.currentHint")}</span>
              </>,
              () => setDraft({ ...f, current: !f.current }),
              "current",
            )}
          </div>
        </div>
        <div className="fgroup">
          <span className="an">{t("timeline.projectTypes")}</span>
          <div className="fopts">
            {TYPES.map((ty) =>
              option(
                f.types.includes(ty),
                { ...f, types: [...f.types, ty] },
                t(`project.type.${ty}`),
                () => setDraft({ ...f, types: toggle(f.types, ty) }),
                ty,
              ),
            )}
          </div>
        </div>
        <div className="fgroup">
          <span className="an">{t("timeline.techStack")}</span>
          {groups.map((g) => (
            <div key={g.group} className="fsub">
              <span className="fsub-l">{t(`stack.group.${g.group}`)}</span>
              <div className="fopts">
                {g.tools.map((tool) =>
                  option(
                    f.techs.includes(tool.id),
                    { ...f, techs: [...f.techs, tool.id] },
                    tool.name,
                    () => setDraft({ ...f, techs: toggle(f.techs, tool.id) }),
                    tool.id,
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="fmodal-foot">
        <button
          type="button"
          className="fclear"
          disabled={filterCount(f) === 0}
          onClick={() => setDraft(NO_FILTERS)}
        >
          {t("timeline.clearAdvancedFilters")}
        </button>
        <button type="button" className="btn sm" onClick={() => onApply(f)}>
          {n === 0
            ? t("timeline.filtersNoResults")
            : n === 1
              ? t("timeline.showResult")
              : fill(t("timeline.showResults"), { n })}
        </button>
      </footer>
    </Dialog>
  );
}
