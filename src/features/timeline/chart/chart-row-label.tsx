import type { ReactNode } from "react";

type ChartRowLabelProps = {
  glyph: ReactNode;
  title: string;
  /** A shorter title for phones. */
  narrowTitle?: string;
  meta: string;
  /** Shown on hover when the title is cut. */
  fullTitle: string;
};

export function ChartRowLabel({ glyph, title, narrowTitle, meta, fullTitle }: ChartRowLabelProps) {
  return (
    <div className="flex min-w-0 items-center gap-3 pr-4">
      {glyph}
      <span className="flex min-w-0 flex-col">
        <span className="block truncate text-[14px] leading-[1.2] font-medium" title={fullTitle}>
          {narrowTitle ? (
            <>
              <span className="hidden md:inline">{title}</span>
              <span className="md:hidden">{narrowTitle}</span>
            </>
          ) : (
            title
          )}
        </span>
        <span className="an text-ink-3 mt-0.5 hidden truncate md:block">{meta}</span>
      </span>
    </div>
  );
}
