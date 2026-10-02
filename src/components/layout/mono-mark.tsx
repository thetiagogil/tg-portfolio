import { cn } from "@/lib/cn";

type MonoMarkProps = {
  className?: string;
};

/** The TG monogram. Inside a `group/brand` link, it fills with the accent on hover. */
export function MonoMark({ className }: MonoMarkProps) {
  return (
    <svg
      className={cn("size-8 flex-none overflow-visible", className)}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="32"
        cy="32"
        r="30"
        strokeWidth="2.5"
        className="fill-transparent stroke-current transition-[fill,stroke] duration-500 group-hover/brand:fill-accent group-hover/brand:stroke-accent"
      />
      <g
        fill="none"
        strokeWidth="4"
        strokeLinecap="square"
        className="stroke-current transition-[stroke] duration-500 group-hover/brand:stroke-on-accent"
      >
        <path d="M13 22.5h13M19.5 22.5v19" />
        <path d="M47.78 25.89A9.5 9.5 0 1 0 50 32h-8" />
      </g>
    </svg>
  );
}
