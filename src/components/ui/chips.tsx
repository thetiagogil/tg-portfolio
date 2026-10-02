import { TOOLS } from "@/content";
import type { ToolId } from "@/content/stack";

type ChipsProps = {
  techs: readonly ToolId[];
};

export function Chips({ techs }: ChipsProps) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {techs.map((id) => (
        <li
          key={id}
          className="text-ink-2 inset-ring-line-2 inline-flex h-7 items-center px-2.5 text-[0.8125rem] inset-ring"
        >
          {TOOLS[id].name}
        </li>
      ))}
    </ul>
  );
}
