import { Band } from "@/components/ui/Band";
import { PageHead } from "@/components/ui/PageHead";
import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";
import { stackGroups, timelineItems } from "./items";
import { TimelineChart } from "./TimelineChart";
import { TimelineExplorer } from "./TimelineExplorer";

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
