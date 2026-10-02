import { Glyph } from "@/components/entries/glyph";
import type { Lang } from "@/content/types";
import { cn } from "@/lib/cn";
import { getT } from "@/lib/i18n";

type ChartLegendProps = {
  lang: Lang;
};

const SWATCH = "inline-block h-2 w-4.5 flex-none text-ink-2";

export function ChartLegend({ lang }: ChartLegendProps) {
  const t = getT(lang);

  return (
    <div className="an mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-ink-3" data-reveal>
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        <li className="flex items-center gap-2">
          <span className={cn(SWATCH, "bg-current")} />
          {t("timeline.legend.experience")}
        </li>
        <li className="flex items-center gap-2">
          <span className={cn(SWATCH, "bg-bg inset-ring")} />
          {t("timeline.legend.education")}
        </li>
      </ul>

      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        <li className="flex items-center gap-2">
          <Glyph category="projects" className="text-ink-2" />
          {t("timeline.legend.projects")}
        </li>
        <li className="flex items-center gap-2">
          <Glyph category="certifications" className="text-ink-2" />
          {t("timeline.legend.certifications")}
        </li>
      </ul>

      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        <li className="flex items-center gap-2">
          <Glyph category="projects" status="in progress" className="text-ink-2" />
          {t("status.in progress")}
        </li>
        <li className="flex items-center gap-2">
          <Glyph category="projects" status="planned" className="text-ink-2" />
          {t("status.planned")}
        </li>
      </ul>
    </div>
  );
}
