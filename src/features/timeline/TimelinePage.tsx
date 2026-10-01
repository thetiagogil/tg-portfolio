import { Band } from "@/components/Band";
import { PageHead } from "@/components/PageHead";
import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";
import { timelineItems, toolGroups } from "@/lib/timeline";
import { TimelineChart } from "./TimelineChart";
import { TimelineExplorer } from "./TimelineExplorer";

export function TimelinePage({ lang }: { lang: Lang }) {
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
          <TimelineExplorer
            items={items}
            groups={toolGroups(items)}
            lang={lang}
          />
        </div>
      </Band>
    </>
  );
}
