"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/ui/icon";
import { Tab, Tabs } from "@/components/ui/tabs";
import { CATEGORIES, type Category, type Lang } from "@/content/types";
import { cn } from "@/lib/cn";
import { getT } from "@/lib/i18n";
import type { View } from "../timeline-filters";
import { useSearchShortcut } from "./use-search-shortcut";

type TimelineToolbarProps = {
  view: View;
  counts: Record<Category | "all", number>;
  /** How many filters are applied (shown on the Filters button). */
  applied: number;
  onChange: (patch: Partial<View>) => void;
  onOpenFilters: () => void;
  lang: Lang;
};

type ToolButtonProps = {
  active?: boolean;
  /** A spoken name, when it says more than the visible text. */
  label?: string;
  opensDialog?: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function TimelineToolbar({
  view,
  counts,
  applied,
  onChange,
  onOpenFilters,
  lang,
}: TimelineToolbarProps) {
  const searchRef = useSearchShortcut();

  const t = getT(lang);
  const isOldest = view.sort === "oldest";
  const sortLabel = t(isOldest ? "timeline.oldest" : "timeline.newest");
  const sortAction = t(isOldest ? "timeline.sortNewest" : "timeline.sortOldest");

  return (
    <div
      className="sticky top-(--header-h) z-15 -mx-(--gutter) border-b border-line bg-bg/90 px-(--gutter) backdrop-blur-[12px]"
      data-timeline-toolbar
    >
      <div className="flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
        <Tabs label={t("timeline.filterLabel")}>
          {(["all", ...CATEGORIES] as const).map((category) => (
            <Tab
              key={category}
              label={category === "all" ? t("common.all") : t(`section.${category}`)}
              count={counts[category]}
              active={view.category === category}
              disabled={!counts[category] && view.category !== category}
              onSelect={() => onChange({ category })}
            />
          ))}
        </Tabs>

        <div className="flex items-center gap-2">
          <label className="relative flex h-10 min-w-0 flex-1 items-center gap-2 px-3 inset-ring inset-ring-line-2 focus-within:inset-ring-ink focus-within:outline-2 focus-within:outline-offset-3 focus-within:outline-accent lg:w-72 lg:flex-none">
            <Icon name="search" className="text-ink-3" />
            <span className="sr-only">{t("timeline.searchLabel")}</span>
            <input
              ref={searchRef}
              type="search"
              value={view.query}
              placeholder={t("timeline.searchPlaceholder")}
              onChange={(event) => onChange({ query: event.target.value })}
              className="min-w-0 flex-1 border-0 bg-transparent text-[0.875rem] outline-none placeholder:text-ink-3"
            />
            {/* No keyboard on touch screens: the hint goes, so the search box keeps its room. */}
            <kbd
              aria-hidden="true"
              className="px-1.5 font-mono text-[11px] text-ink-3 inset-ring inset-ring-line-2 max-md:hidden pointer-coarse:hidden [@media(hover:none)]:hidden"
            >
              /
            </kbd>
          </label>

          <ToolButton active={applied > 0} opensDialog onClick={onOpenFilters}>
            <Icon name="sliders" />
            {t("timeline.filters")}
            {applied > 0 && (
              <span className="grid size-4 place-items-center bg-accent text-[10px] text-on-accent">
                {applied}
              </span>
            )}
          </ToolButton>

          <ToolButton
            label={`${sortLabel}, ${sortAction.toLowerCase()}`}
            onClick={() => onChange({ sort: isOldest ? "newest" : "oldest" })}
          >
            <Icon name={isOldest ? "up" : "down"} />
            {sortLabel}
          </ToolButton>
        </div>
      </div>
    </div>
  );
}

function ToolButton({
  active = false,
  label,
  opensDialog = false,
  onClick,
  children,
}: ToolButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-haspopup={opensDialog ? "dialog" : undefined}
      onClick={onClick}
      className={cn(
        "flex h-10 flex-none items-center gap-2 px-3 text-[0.875rem] text-ink-2 inset-ring inset-ring-line-2 transition-[color,box-shadow] duration-300 hover:text-ink hover:inset-ring-ink",
        active && "text-ink inset-ring-ink",
      )}
    >
      {children}
    </button>
  );
}
