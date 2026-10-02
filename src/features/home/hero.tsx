import { Portrait } from "@/components/entries/portrait";
import { Band } from "@/components/ui/band";
import { Button } from "@/components/ui/button";
import { Rise } from "@/components/ui/rise";
import { profile } from "@/content";
import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";
import { delay } from "@/lib/motion";

type HeroProps = {
  lang: Lang;
};

export function Hero({ lang }: HeroProps) {
  const t = getT(lang);

  return (
    <Band className="pt-14 md:pt-18 lg:pt-20">
      <div className="wrap page-grid relative z-1 gap-y-12">
        <div className="col-span-full flex flex-col justify-center gap-8 md:col-span-5 lg:col-span-7">
          <h1 className="text-[clamp(2.5rem,1.1rem+4.6vw,5.25rem)] leading-none tracking-[-0.045em]">
            <Rise delay={80}>{t("home.hero.line1")}</Rise>
            <Rise delay={180} className="text-ink-3">
              {t("home.hero.line2")}
            </Rise>
          </h1>

          <div className="fade" style={delay(320)}>
            <p className="lead text-ink-2 max-w-[46ch]">{t("home.hero.lead")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#work" icon="down">
                {t("home.hero.ctaWork")}
              </Button>
              <Button href={profile.cv} variant="outline" icon="dl">
                {t("contact.cv")}
              </Button>
            </div>
          </div>
        </div>

        <figure
          className="fade col-span-full sm:col-span-3 md:col-span-3 md:col-start-6 lg:col-span-4 lg:col-start-9"
          style={delay(200)}
        >
          <Portrait
            lang={lang}
            priority
            sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 36vw, (min-width: 40rem) 70vw, 100vw"
          />
        </figure>
      </div>
    </Band>
  );
}
