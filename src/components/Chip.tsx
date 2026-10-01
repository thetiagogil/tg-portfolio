import { TOOLS, type ToolId } from "@/content/stack";

export function Chips({ techs }: { techs: readonly ToolId[] }) {
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
