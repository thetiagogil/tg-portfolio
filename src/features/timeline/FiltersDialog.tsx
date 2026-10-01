"use client";

import type { ReactNode } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { Icon } from "@/components/ui/Icon";
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
} from "./filters";
import type { StackGroup } from "./items";

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

/** Current only, project type and stack. An option that would leave nothing to show is faded and disabled. */
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
  const total = results(filters);
  const close = () => onChange(null);

  return (
    <Dialog open={draft !== null} onClose={close} className="fmodal" labelledBy="tl-filters-title">
      <header className="fmodal-head">
        <h2 className="subheading" id="tl-filters-title" tabIndex={-1} autoFocus>
          {t("timeline.filters")}
        </h2>
        <button type="button" className="icon-btn" onClick={close}>
          <Icon name="x" />
          <span className="sr-only">{t("nav.close")}</span>
        </button>
      </header>

      <div className="fmodal-body">
        <div className="fgroup">
          <div className="fopts one">
            <Option
              on={filters.current}
              empty={results({ ...filters, current: true }) === 0}
              onToggle={() => onChange({ ...filters, current: !filters.current })}
            >
              {t("timeline.currentOnly")}
              <span className="fhint">{t("timeline.currentHint")}</span>
            </Option>
          </div>
        </div>
        <div className="fgroup">
          <span className="an">{t("timeline.projectTypes")}</span>
          <div className="fopts">
            {PROJECT_TYPES.map((type) => (
              <Option
                key={type}
                on={filters.types.includes(type)}
                empty={results({ ...filters, types: [...filters.types, type] }) === 0}
                onToggle={() => onChange({ ...filters, types: toggle(filters.types, type) })}
              >
                {t(`project.type.${type}`)}
              </Option>
            ))}
          </div>
        </div>
        <div className="fgroup">
          <span className="an">{t("timeline.techStack")}</span>
          {stack.map(({ group, tools }) => (
            <div key={group} className="fsub">
              <span className="fsub-l">{t(`stack.group.${group}`)}</span>
              <div className="fopts">
                {tools.map((tool) => (
                  <Option
                    key={tool.id}
                    on={filters.techs.includes(tool.id)}
                    empty={results({ ...filters, techs: [...filters.techs, tool.id] }) === 0}
                    onToggle={() => onChange({ ...filters, techs: toggle(filters.techs, tool.id) })}
                  >
                    {tool.name}
                  </Option>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="fmodal-foot">
        <button
          type="button"
          className="fclear"
          disabled={filterCount(filters) === 0}
          onClick={() => onChange(NO_FILTERS)}
        >
          {t("timeline.clearFilters")}
        </button>
        <button type="button" className="btn sm" onClick={() => onApply(filters)}>
          {showLabel(total, lang)}
        </button>
      </footer>
    </Dialog>
  );
}

type OptionProps = {
  on: boolean;
  /** Ticking it would leave no results (a ticked option is never disabled). */
  empty: boolean;
  onToggle: () => void;
  children: ReactNode;
};

function Option({ on, empty, onToggle, children }: OptionProps) {
  return (
    <button
      type="button"
      className={cn("fopt", on && "on")}
      aria-pressed={on}
      disabled={!on && empty}
      onClick={onToggle}
    >
      <span className="fbox">
        <Icon name="check" />
      </span>
      <span>{children}</span>
    </button>
  );
}

function showLabel(total: number, lang: Lang): string {
  const t = getT(lang);
  if (total === 0) return t("timeline.filtersNoResults");
  if (total === 1) return t("timeline.showResult");
  return t("timeline.showResults", { n: total });
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}
