import type { CSSProperties } from "react";
import { Section } from "@/components/ui/section";
import { MAIN_STACK, TOOLS } from "@/content";
import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";
import { TOOL_ICONS } from "./tool-icons";

type ToolboxProps = {
  lang: Lang;
};

export function Toolbox({ lang }: ToolboxProps) {
  const t = getT(lang);

  return (
    <Section title={t("about.toolbox.title")}>
      <ul className="grid grid-cols-2 gap-px bg-line ring ring-line md:grid-cols-4">
        {MAIN_STACK.map((id) => {
          const { name, brand } = TOOLS[id];

          return (
            <li
              key={id}
              className="group flex min-w-0 items-center gap-4 bg-bg px-(--row-pad) py-5 transition-colors duration-300 hover:bg-[color-mix(in_oklab,var(--ink)_4%,var(--bg))]"
              style={brand ? ({ "--brand": brand } as CSSProperties) : undefined}
              data-reveal
            >
              <span className="grid size-10 flex-none place-items-center inset-ring inset-ring-line-2 transition-shadow duration-300 group-hover:inset-ring-ink">
                <svg
                  className="size-5 fill-current text-ink transition-colors duration-300 group-hover:text-[color:var(--brand,var(--ink))]"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d={TOOL_ICONS[id]} />
                </svg>
              </span>
              <span className="min-w-0 text-[1rem] leading-[1.3] font-medium tracking-[-0.01em]">
                {name}
              </span>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
