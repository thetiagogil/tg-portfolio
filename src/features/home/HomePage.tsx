import { Band } from "@/components/Band";
import { SectionHead } from "@/components/SectionHead";
import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";

// Phase 3 placeholder: the real Home (hero, selected work, where I've worked, let's talk) comes in Phase 4.
export function HomePage({ lang }: { lang: Lang }) {
  const t = getT(lang);
  return (
    <>
      <Band className="hero">
        <div className="wrap page-head">
          <h1 className="display">
            <span className="rise-mask">
              <span className="rise">{t("home.hero.line1")}</span>
            </span>
            <span className="rise-mask text-ink-3">
              <span
                className="rise"
                style={{ "--d": "80ms" } as React.CSSProperties}
              >
                {t("home.hero.line2")}
              </span>
            </span>
          </h1>
          <p className="lead intro fade text-ink-2 max-w-[46ch]">
            {t("home.hero.lead")}
          </p>
        </div>
      </Band>
      <Band>
        <div className="wrap">
          <SectionHead title={t("home.work.title")} />
        </div>
      </Band>
      <Band>
        <div className="wrap">
          <SectionHead title={t("home.experience.title")} />
        </div>
      </Band>
      <Band>
        <div className="wrap">
          <SectionHead title={t("contact.title")} intro={t("contact.body")} />
        </div>
      </Band>
    </>
  );
}
