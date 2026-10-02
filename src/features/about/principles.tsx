import { Section } from "@/components/ui/section";
import type { Lang } from "@/content/types";
import { cn } from "@/lib/cn";
import { getT } from "@/lib/i18n";
import { PRINCIPLES } from "./principle-icons";

// Thin lines between the columns: two columns on tablets, four on desktops. The first column's text lines up with
// the lists above (--row-pad); the others keep 24px from their line.
const EDGES = [
  "sm:pr-6",
  "sm:border-l sm:px-6",
  "sm:pr-6 lg:border-l lg:pl-6",
  "sm:border-l sm:px-6",
];

type PrinciplesProps = {
  lang: Lang;
};

export function Principles({ lang }: PrinciplesProps) {
  const t = getT(lang);

  return (
    <Section title={t("about.method.title")} intro={t("about.method.intro")}>
      <ol className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {PRINCIPLES.map((principle, i) => (
          <li
            key={principle.key}
            className={cn("group border-line flex flex-col gap-3 px-(--row-pad) sm:py-1", EDGES[i])}
            data-reveal
          >
            <span className="mb-3 flex">
              <svg
                className="ico text-ink group-hover:text-accent-ink size-6 transition-colors duration-300"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {principle.icon}
              </svg>
            </span>
            <h3 className="text-[clamp(1.25rem,1.05rem+0.5vw,1.5rem)] leading-[1.15] font-medium tracking-[-0.025em]">
              {t(`about.method.${principle.key}.title`)}
            </h3>
            <p className="text-ink-2 max-w-[40ch]">{t(`about.method.${principle.key}.body`)}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
