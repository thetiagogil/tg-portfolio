import { Band } from "@/components/ui/band";
import { PageHead } from "@/components/ui/page-head";
import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";
import { TimelineChart } from "./chart/timeline-chart";
import { TimelineExplorer } from "./list/timeline-explorer";
import { stackGroups, timelineItems } from "./timeline-items";

type TimelinePageProps = {
  lang: Lang;
};

export function TimelinePage({ lang }: TimelinePageProps) {
  const t = getT(lang);
  const items = timelineItems(lang);

  return (
    <>
      <Band>
        <PageHead
          eyebrow={t("nav.timeline")}
          title={t("timeline.title")}
          intro={t("timeline.subtitle")}
        />
        <div className="wrap">
          <p className="sr-only">{t("timeline.chart.summary")}</p>
          <TimelineChart lang={lang} />
        </div>
      </Band>

      <Band>
        <div className="wrap">
          <TimelineExplorer items={items} stack={stackGroups(items)} lang={lang} />
        </div>
      </Band>
    </>
  );
}
