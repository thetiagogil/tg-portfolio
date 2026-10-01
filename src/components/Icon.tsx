import { cn } from "@/lib/cn";

// Line icons: 24-unit box, 1.5 stroke, square caps. Arrows sit in <g class="mv"> so a hover can nudge them the way
// they point while the box stays put (the download icon's tray stays still; only its arrow drops).
const PATHS = {
  right: <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" />,
  left: <path d="M20 12H5M10.5 6.5 5 12l5.5 5.5" />,
  up: <path d="M12 20V5M6.5 10.5 12 5l5.5 5.5" />,
  down: <path d="M12 4v15M6.5 13.5 12 19l5.5-5.5" />,
  out: <path d="M7 17 17 7M8.5 7H17v8.5" />,
  dl: null,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" />
    </>
  ),
  moon: <path d="M19.5 14.6A7.9 7.9 0 0 1 9.4 4.5a7.9 7.9 0 1 0 10.1 10.1Z" />,
  menu: <path d="M4 8.5h16M4 15.5h16" />,
  x: <path d="m6 6 12 12M18 6 6 18" />,
  copy: (
    <>
      <path d="M8.5 8.5h11v11h-11z" />
      <path d="M15.5 8.5v-4h-11v11h4" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5" />
    </>
  ),
  sliders: <path d="M4 7h9M17 7h3M4 17h3M11 17h9M15 5v4M9 15v4" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
};

export type IconName = keyof typeof PATHS;

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      className={cn("ico", `i-${name}`, className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {name === "dl" ? (
        <>
          <g className="mv">
            <path d="M12 4v11M7 10.5l5 5 5-5" />
          </g>
          <path d="M5 20h14" />
        </>
      ) : (
        <g className="mv">{PATHS[name]}</g>
      )}
    </svg>
  );
}
