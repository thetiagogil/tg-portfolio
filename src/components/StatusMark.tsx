import type { Lang, ProjectStatus } from "@/content/types";
import { cn } from "@/lib/cn";
import { getT } from "@/lib/i18n";

/** Line types for status: solid = completed, hatched = in progress, dashed = planned. */
export function StatusGlyph({ status }: { status: ProjectStatus }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      {status === "completed" && (
        <rect x="0.5" y="0.5" width="11" height="11" fill="currentColor" />
      )}
      {status === "in progress" && (
        <>
          <rect
            x="0.5"
            y="0.5"
            width="11"
            height="11"
            fill="none"
            stroke="currentColor"
          />
          <path
            d="M0.5 7.5 7.5 0.5M0.5 11.5l11-11M4.5 11.5l7-7"
            stroke="currentColor"
          />
        </>
      )}
      {status === "planned" && (
        <rect
          x="0.5"
          y="0.5"
          width="11"
          height="11"
          fill="none"
          stroke="currentColor"
          strokeDasharray="2.5 1.5"
        />
      )}
    </svg>
  );
}

export function StatusMark({
  status,
  lang,
}: {
  status: ProjectStatus;
  lang: Lang;
}) {
  return (
    <span className={cn("an status", status === "in progress" && "running")}>
      <StatusGlyph status={status} />
      {getT(lang)(`status.${status}`)}
    </span>
  );
}

/** In lists only the exceptions are labelled: finished work carries no status. */
export function ListStatus({
  status,
  lang,
}: {
  status: ProjectStatus;
  lang: Lang;
}) {
  return status === "completed" ? null : (
    <StatusMark status={status} lang={lang} />
  );
}
