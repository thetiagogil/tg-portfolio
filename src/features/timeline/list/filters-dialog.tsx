"use client";

import type { ReactNode } from "react";
import { buttonClass } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { IconButton } from "@/components/ui/icon-button";
import { type Lang, PROJECT_TYPES } from "@/content/types";
import { cn } from "@/lib/cn";
import { getT } from "@/lib/i18n";
import {
  filterCount,
  type Filters,
  NO_FILTERS,
  type TimelineItem,
  type View,
  visible,
} from "../timeline-filters";
import type { StackGroup } from "../timeline-items";
import { FilterOption } from "./filter-option";
import { showResultsLabel, toggle } from "./filters-utils";

type FiltersDialogProps = {
  /** The filters being edited; null while the dialog is closed. */
  draft: Filters | null;
  onChange: (draft: Filters | null) => void;
  onApply: (filters: Filters) => void;
  items: TimelineItem[];
  view: View;
  stack: StackGroup[];
  lang: Lang;
};

type FilterGroupProps = {
  label?: string;
  children: ReactNode;
};

const OPTIONS = "-mx-2 grid grid-cols-2 gap-x-2 sm:grid-cols-3";

/** Current only, project type and stack. The dialog edits a draft: only "Show N results" applies it. */
export function FiltersDialog({
  draft,
  onChange,
  onApply,
  items,
  view,
  stack,
  lang,
}: FiltersDialogProps) {
  const t = getT(lang);
  const filters = draft ?? NO_FILTERS;
  const results = (next: Filters) => visible(items, { ...view, ...next }).length;
  const close = () => onChange(null);

  return (
    <Dialog
      open={draft !== null}
      onClose={close}
      labelledBy="timeline-filters-title"
      className="max-h-[min(80vh,44rem)] w-[min(40rem,calc(100%_-_32px))] max-w-none overflow-hidden border-0 bg-paper p-0 text-ink shadow-[0_0_0_1px_var(--line-2),0_32px_80px_-32px_rgb(0_0_0/0.5)] backdrop:bg-[rgb(12_12_16/0.45)] open:flex open:animate-[dialog-rise_0.3s_var(--settle)] open:flex-col max-sm:mx-auto max-sm:mt-auto max-sm:mb-0 max-sm:max-h-[85dvh] max-sm:w-full"
    >
      <header className="flex items-center justify-between gap-4 border-b border-line py-3 pr-3 pl-6">
        <h2
          className="subheading focus:outline-none"
          id="timeline-filters-title"
          tabIndex={-1}
          autoFocus
        >
          {t("timeline.filters")}
        </h2>
        <IconButton icon="x" label={t("nav.close")} onClick={close} />
      </header>

      <div className="grid min-h-0 flex-1 content-start gap-4 overflow-auto px-6 pt-2 pb-6">
        <FilterGroup>
          <div className={cn(OPTIONS, "grid-cols-1 sm:grid-cols-1")}>
            <FilterOption
              on={filters.current}
              empty={results({ ...filters, current: true }) === 0}
              hint={t("timeline.currentHint")}
              onToggle={() => onChange({ ...filters, current: !filters.current })}
            >
              {t("timeline.currentOnly")}
            </FilterOption>
          </div>
        </FilterGroup>

        <FilterGroup label={t("timeline.projectTypes")}>
          <div className={OPTIONS}>
            {PROJECT_TYPES.map((type) => (
              <FilterOption
                key={type}
                on={filters.types.includes(type)}
                empty={results({ ...filters, types: [...filters.types, type] }) === 0}
                onToggle={() => onChange({ ...filters, types: toggle(filters.types, type) })}
              >
                {t(`project.type.${type}`)}
              </FilterOption>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup label={t("timeline.techStack")}>
          {stack.map(({ group, tools }, i) => (
            <div key={group} className={cn("grid gap-1", i > 0 && "mt-3")}>
              <span className="text-[0.8125rem] font-medium text-ink-2">
                {t(`stack.group.${group}`)}
              </span>
              <div className={OPTIONS}>
                {tools.map((tool) => (
                  <FilterOption
                    key={tool.id}
                    on={filters.techs.includes(tool.id)}
                    empty={results({ ...filters, techs: [...filters.techs, tool.id] }) === 0}
                    onToggle={() => onChange({ ...filters, techs: toggle(filters.techs, tool.id) })}
                  >
                    {tool.name}
                  </FilterOption>
                ))}
              </div>
            </div>
          ))}
        </FilterGroup>
      </div>

      <footer className="flex items-center justify-between gap-4 border-t border-line py-3 pr-3 pl-6">
        <button
          type="button"
          className="-my-1.5 py-1.5 text-[0.875rem] text-ink-2 hover:text-ink disabled:cursor-default disabled:opacity-40"
          disabled={filterCount(filters) === 0}
          onClick={() => onChange(NO_FILTERS)}
        >
          {t("timeline.clearFilters")}
        </button>
        <button
          type="button"
          className={buttonClass({ size: "sm" })}
          onClick={() => onApply(filters)}
        >
          {showResultsLabel(results(filters), lang)}
        </button>
      </footer>
    </Dialog>
  );
}

function FilterGroup({ label, children }: FilterGroupProps) {
  return (
    <div className="grid gap-2 border-t border-line pt-4 first:border-t-0">
      {label && <span className="an text-ink-3">{label}</span>}
      {children}
    </div>
  );
}
