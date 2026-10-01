import { TOOLS } from "@/content";
import type { ToolId } from "@/content/stack";

type ChipsProps = {
  techs: readonly ToolId[];
};

export function Chips({ techs }: ChipsProps) {
  return (
    <ul className="chips">
      {techs.map((id) => (
        <li key={id} className="chip">
          {TOOLS[id].name}
        </li>
      ))}
    </ul>
  );
}
