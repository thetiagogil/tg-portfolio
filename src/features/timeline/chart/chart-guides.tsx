import { cn } from "@/lib/cn";
import { pct, type Scale } from "@/lib/scale";

type ChartGuidesProps = {
  scale: Scale;
  switchPos: number;
  todayPos: number;
};

const GUIDE = "absolute inset-y-0 w-px";

export function ChartGuides({ scale, switchPos, todayPos }: ChartGuidesProps) {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-(--row-pad) left-[calc(var(--label-w)+var(--row-pad))]"
      aria-hidden="true"
    >
      {scale.ticks.map((tick) => (
        <span key={tick.year} className={cn(GUIDE, "bg-line")} style={{ left: pct(tick.pos) }} />
      ))}
      <span
        className={cn(GUIDE, "border-l border-dashed border-accent/70")}
        style={{ left: pct(switchPos) }}
      />
      <span className={cn(GUIDE, "bg-ink")} style={{ left: pct(todayPos) }} />

      {scale.breaks.map((center) => (
        <div
          key={center}
          className="absolute inset-y-0 z-2 bg-bg"
          style={{ left: pct(center - scale.gap / 2), width: pct(scale.gap) }}
        >
          <BreakLine className="-left-1.5" />
          <BreakLine className="-right-1.5" />
        </div>
      ))}
    </div>
  );
}

/** A drawing's break line: straight, with a zigzag in the middle. */
function BreakLine({ className }: { className: string }) {
  return (
    <svg
      className={cn("absolute inset-y-0 h-full w-3 text-ink-3", className)}
      viewBox="0 0 12 100"
      preserveAspectRatio="none"
    >
      <path
        d="M6 0V46L1 48.5 11 51.5 6 54V100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
