import { cn } from "@/lib/cn";

type DimProps = {
  label?: string;
  /** Still running: an arrow instead of the closing tick. */
  open?: boolean;
  className?: string;
  labelClassName?: string;
};

/** A dimension line measuring a span of time: a hairline with oblique ticks at each end. */
export function Dim({ label, open = false, className, labelClassName }: DimProps) {
  return (
    <div className={cn("dim", className)} aria-hidden="true">
      <span className="dim-line" />
      <span className="dim-ext at-start" />
      <span className="dim-tick at-start" />
      {open ? (
        <svg className="dim-arrow" viewBox="0 0 8 8">
          <path d="M0 0 8 4 0 8" fill="none" stroke="currentColor" />
        </svg>
      ) : (
        <>
          <span className="dim-ext at-end" />
          <span className="dim-tick at-end" />
        </>
      )}
      {label && <span className={cn("dim-label", labelClassName)}>{label}</span>}
    </div>
  );
}
