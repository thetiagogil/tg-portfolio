import { Chips } from "@/components/ui/chips";
import { TOOLS } from "@/content";
import type { ToolId } from "@/content/stack";
import type { Lang } from "@/content/types";
import { cn } from "@/lib/cn";
import { getT } from "@/lib/i18n";

type StackLineProps = {
  techs?: readonly ToolId[];
  className?: string;
};

type StackRowProps = {
  techs: readonly ToolId[];
  lang: Lang;
};

export function StackLine({ techs, className }: StackLineProps) {
  if (!techs?.length) return null;

  return (
    <ul
      className={cn(
        "flex flex-wrap gap-x-2 gap-y-0.5 text-[0.8125rem] leading-normal text-ink-3",
        className,
      )}
    >
      {techs.map((id) => (
        <li
          key={id}
          className="flex items-center gap-2 not-first:before:size-[3px] not-first:before:bg-line-2"
        >
          {TOOLS[id].name}
        </li>
      ))}
    </ul>
  );
}

export function StackRow({ techs, lang }: StackRowProps) {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
      <p className="an text-ink-3">{getT(lang)("project.stack")}</p>
      <Chips techs={techs} />
    </div>
  );
}
