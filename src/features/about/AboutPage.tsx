import { Band } from "@/components/Band";
import { PageHead } from "@/components/PageHead";
import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";

// Phase 3 placeholder: the page header is final; the rest of the page comes in Phase 4.
export function AboutPage({ lang }: { lang: Lang }) {
  const t = getT(lang);
  return (
    <>
      <Band>
        <PageHead
          eyebrow={t("nav.about")}
          title={t("about.title")}
          intro={t("about.intro")}
        />
      </Band>
      <Band>
        <div className="wrap" />
      </Band>
    </>
  );
}
