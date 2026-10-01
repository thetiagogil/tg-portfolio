import { Chips } from "@/components/ui/chips";
import { TOOLS } from "@/content";
import type { ToolId } from "@/content/stack";
import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";

/** Tools separated by small dots (Timeline entries, products, collections). */
export function StackLine({ techs }: { techs?: readonly ToolId[] }) {
  if (!techs?.length) return null;
  return (
    <ul className="stack">
      {techs.map((id) => (
        <li key={id}>{TOOLS[id].name}</li>
      ))}
    </ul>
  );
}

/** Entry pages: "STACK", then the tools as chips, in one row under the brief or overview. */
export function StackRow({ techs, lang }: { techs: readonly ToolId[]; lang: Lang }) {
  return (
    <div className="b-stack">
      <p className="an text-ink-3">{getT(lang)("project.stack")}</p>
      <Chips techs={techs} />
    </div>
  );
}
