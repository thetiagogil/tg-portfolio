import Link from "next/link";
import { Glyph } from "@/components/entries/glyph";
import type { Category } from "@/content/types";
import { cn } from "@/lib/cn";
import { pct } from "@/lib/scale";
import { ChartRowLabel } from "./chart-row-label";
import { LANE_HEIGHT, type Marker } from "./chart-utils";

type ChartMarkerRowProps = {
  category: Category;
  label: string;
  count: string;
  markers: Marker[];
  /** The last row closes the chart with a rule. */
  last?: boolean;
};

/** Projects or certificates as markers with a hover tip. They're a mouse shortcut: every one is also in the list
    below with a full-size link, so they stay out of the keyboard order. */
export function ChartMarkerRow({
  category,
  label,
  count,
  markers,
  last = false,
}: ChartMarkerRowProps) {
  const lanesUsed = Math.max(1, ...markers.map((marker) => marker.lane + 1));

  return (
    <div
      className={cn(
        "grid grid-cols-[var(--label-w)_1fr] border-t border-line px-(--row-pad)",
        last && "border-b",
      )}
    >
      <ChartRowLabel
        glyph={<Glyph category={category} />}
        title={label}
        meta={count}
        fullTitle={label}
      />

      <div className="relative" style={{ height: lanesUsed * LANE_HEIGHT + 22 }}>
        {markers.map((marker) => (
          <Link
            key={marker.key}
            href={marker.href}
            {...(marker.external && { target: "_blank", rel: "noreferrer" })}
            className="group/mk absolute z-3 -ml-2 grid size-4 place-items-center text-ink-2 transition-colors duration-300 hover:text-accent"
            style={{ left: pct(marker.pos), top: 11 + marker.lane * LANE_HEIGHT }}
            tabIndex={-1}
            aria-hidden="true"
          >
            {marker.glyph}
            <span className="an pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 translate-y-1 bg-ink px-2 py-1 whitespace-nowrap text-paper opacity-0 [transition:opacity_0.2s,translate_0.3s_var(--settle)] group-hover/mk:translate-y-0 group-hover/mk:opacity-100">
              {`${marker.title} · ${marker.date}`}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
