import { Band } from "@/components/Band";
import { PageHead } from "@/components/PageHead";
import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";

// Phase 3 placeholder: the page header is final; the rest of the page comes in Phase 4.
export function TimelinePage({ lang }: { lang: Lang }) {
  const t = getT(lang);
  return (
    <>
      <Band>
        <PageHead
          eyebrow={t("nav.timeline")}
          title={t("timeline.title")}
          intro={t("timeline.subtitle")}
        />
      </Band>
      <Band>
        <div className="wrap" />
      </Band>
    </>
  );
}
