import { cn } from "@/lib/cn";

type DimProps = {
  label?: string;
  open?: boolean;
  className?: string;
  labelClassName?: string;
};

const LINE = "absolute top-1/2 w-px bg-current";
const EXTENSION = cn(LINE, "h-[17px] -translate-1/2 opacity-45");
const TICK = cn(LINE, "h-[11px] -translate-1/2 rotate-45");

export function Dim({ label, open = false, className, labelClassName }: DimProps) {
  return (
    <div className={cn("relative h-5", className)} aria-hidden="true">
      <span className="absolute inset-x-0 top-1/2 h-px bg-current" />
      <span className={cn(EXTENSION, "left-0")} />
      <span className={cn(TICK, "left-0")} />

      {open ? (
        <svg
          className="absolute top-1/2 left-full size-2 -translate-x-full -translate-y-1/2 overflow-visible"
          viewBox="0 0 8 8"
        >
          <path d="M0 0 8 4 0 8" fill="none" stroke="currentColor" />
        </svg>
      ) : (
        <>
          <span className={cn(EXTENSION, "left-full")} />
          <span className={cn(TICK, "left-full")} />
        </>
      )}

      {label && (
        <span
          className={cn(
            "absolute bottom-[calc(50%+5px)] left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.08em] whitespace-nowrap uppercase",
            labelClassName,
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}
