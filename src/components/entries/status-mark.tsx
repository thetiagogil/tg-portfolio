import type { Lang, ProjectStatus } from "@/content/types";
import { cn } from "@/lib/cn";
import { getT } from "@/lib/i18n";

type StatusMarkProps = {
  status: ProjectStatus;
  lang: Lang;
  hideCompleted?: boolean;
};

export function StatusMark({ status, lang, hideCompleted = false }: StatusMarkProps) {
  if (hideCompleted && status === "completed") return null;

  return (
    <span
      className={cn(
        "an inline-flex items-center gap-2 text-ink-2",
        status === "in progress" && "text-accent-ink",
      )}
    >
      <StatusGlyph status={status} />
      {getT(lang)(`status.${status}`)}
    </span>
  );
}

function StatusGlyph({ status }: { status: ProjectStatus }) {
  return (
    <svg className="size-2.5 flex-none overflow-visible" viewBox="0 0 12 12" aria-hidden="true">
      {status === "completed" && (
        <rect x="0.5" y="0.5" width="11" height="11" fill="currentColor" />
      )}
      {status === "in progress" && (
        <>
          <rect x="0.5" y="0.5" width="11" height="11" fill="none" stroke="currentColor" />
          <path d="M0.5 7.5 7.5 0.5M0.5 11.5l11-11M4.5 11.5l7-7" stroke="currentColor" />
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
