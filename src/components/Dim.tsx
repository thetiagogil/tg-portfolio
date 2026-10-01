import { cn } from "@/lib/cn";

/** A dimension line measuring a span of time: hairline, oblique ticks at each end, an arrow while still running. */
export function Dim({
  label,
  open = false,
  className,
  labelClassName,
}: {
  label?: string;
  open?: boolean;
  className?: string;
  labelClassName?: string;
}) {
  return (
    <div className={cn("dim", className)} aria-hidden="true">
      <span className="dim-line" />
      <span className="dim-ext" style={{ left: 0 }} />
      <span className="dim-tick" style={{ left: 0 }} />
      {open ? (
        <svg className="dim-arrow" viewBox="0 0 8 8">
          <path d="M0 0 8 4 0 8" fill="none" stroke="currentColor" />
        </svg>
      ) : (
        <>
          <span className="dim-ext" style={{ left: "100%" }} />
          <span className="dim-tick" style={{ left: "100%" }} />
        </>
      )}
      {label && (
        <span className={cn("dim-label", labelClassName)}>{label}</span>
      )}
    </div>
  );
}
