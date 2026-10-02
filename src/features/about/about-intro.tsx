import Link from "next/link";
import { Portrait } from "@/components/entries/portrait";
import { Band } from "@/components/ui/band";
import { Fact, Facts } from "@/components/ui/facts";
import { PageHead } from "@/components/ui/page-head";
import { currentRole, degreeBySlug, profile } from "@/content";
import type { Lang } from "@/content/types";
import { year } from "@/lib/dates";
import { recordHref } from "@/lib/entries";
import { getT } from "@/lib/i18n";

type AboutIntroProps = {
  lang: Lang;
};

export function AboutIntro({ lang }: AboutIntroProps) {
  const t = getT(lang);
  const faul = degreeBySlug("faul")!;
  const ironhack = degreeBySlug("ironhack")!;
  const bio = t("about.bio").split(/\n{2,}/);

  return (
    <Band>
      <PageHead eyebrow={t("nav.about")} title={t("about.title")} intro={t("about.intro")} />

      <section className="wrap page-grid mt-16 gap-y-12 md:mt-24">
        <figure className="col-span-full sm:col-span-3 md:col-span-3 lg:col-span-4" data-reveal>
          <Portrait lang={lang} sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 36vw, 100vw" />
        </figure>

        <div className="col-span-full md:col-span-5 lg:col-span-7 lg:col-start-6" data-reveal>
          <div className="space-y-5">
            {bio.map((paragraph) => (
              <p key={paragraph} className="read">
                {paragraph}
              </p>
            ))}
          </div>

          <Facts className="mt-12 grid-cols-2">
            <Fact label={t("about.facts.based")}>{profile.location[lang]}</Fact>
            <Fact label={t("about.facts.current")}>
              <Link className="lk" href={recordHref(lang, currentRole)}>
                {currentRole.title[lang]}, {currentRole.org[lang]}
              </Link>
            </Fact>
            <Fact label={t("about.facts.degree")}>{faul.title[lang]}</Fact>
            <Fact label={t("about.facts.frontendSince")}>{year(ironhack.dateStart)}</Fact>
          </Facts>
        </div>
      </section>
    </Band>
  );
}
