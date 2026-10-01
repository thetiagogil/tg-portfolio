import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/ArrowLink";
import { Band } from "@/components/Band";
import { Button } from "@/components/Button";
import { CopyEmail } from "@/components/CopyEmail";
import { Dim } from "@/components/Dim";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHead } from "@/components/SectionHead";
import { featuredProjects, profile, projects, roles } from "@/content";
import type { Lang } from "@/content/types";
import { formatDuration, monthsBetween, monthYear, toDate } from "@/lib/dates";
import { recordHref } from "@/lib/entries";
import { getT, localize } from "@/lib/i18n";
import { pct, scaleOf, utc } from "@/lib/scale";
import type { CSSProperties } from "react";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function HomePage({ lang }: { lang: Lang }) {
  const t = getT(lang);
  const words = {
    year: t("duration.year"),
    years: t("duration.years"),
    month: t("duration.month"),
    months: t("duration.months"),
  };

  // "Where I've worked": a track from two months before the first role to today (the build date).
  const now = new Date();
  const first = toDate(roles[roles.length - 1].dateStart);
  const sc = scaleOf([
    [utc(first.getUTCFullYear(), first.getUTCMonth() - 2), now],
  ]);

  return (
    <>
      <Band className="hero">
        <div className="wrap page-grid hero-grid">
          <div className="hero-text col-span-full md:col-span-5 lg:col-span-7">
            <h1 className="hero-title">
              <span className="rise-mask">
                <span className="rise" style={delay(80)}>
                  {t("home.hero.line1")}
                </span>
              </span>
              <span className="rise-mask">
                <span className="rise text-ink-3" style={delay(180)}>
                  {t("home.hero.line2")}
                </span>
              </span>
            </h1>
            <div className="hero-lead fade" style={delay(320)}>
              <p className="lead text-ink-2">{t("home.hero.lead")}</p>
              <div className="btns">
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
            className="hero-portrait fade col-span-full sm:col-span-3 md:col-span-3 md:col-start-6 lg:col-span-4 lg:col-start-9"
            style={delay(200)}
          >
            <div className="portrait">
              <Image
                src={`portrait/${profile.portrait}`}
                alt={t("home.hero.portraitAlt")}
                fill
                priority
                sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 36vw, (min-width: 40rem) 70vw, 100vw"
              />
            </div>
          </figure>
        </div>
      </Band>

      <Band id="work">
        <div className="wrap">
          <SectionHead
            title={t("home.work.title")}
            action={
              <ArrowLink href={localize(lang, "/projects")}>
                {t("home.work.all")} ({projects.length})
              </ArrowLink>
            }
          />
          <ul className="cards three">
            {featuredProjects.map((p) => (
              <li key={p.slug} data-reveal>
                <ProjectCard
                  project={p}
                  lang={lang}
                  sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 45vw, 100vw"
                />
              </li>
            ))}
          </ul>
        </div>
      </Band>

      <Band>
        <div className="wrap">
          <SectionHead
            title={t("home.experience.title")}
            action={
              <ArrowLink href={localize(lang, "/timeline")}>
                {t("home.experience.timeline")}
              </ArrowLink>
            }
          />
          <ol className="exp-list sec-body">
            {roles.map((r) => {
              const running = r.dateEnd === null;
              const s = sc.pos(toDate(r.dateStart));
              const e = sc.pos(running ? now : toDate(r.dateEnd!));
              return (
                <li key={r.slug} data-reveal>
                  <Link
                    className="page-grid exp-row"
                    href={recordHref(lang, r)}
                  >
                    <div className="exp-when an col-span-full md:col-span-2 lg:col-span-3">
                      <p className="text-ink-2">
                        {monthYear(r.dateStart, lang)} –{" "}
                        {running
                          ? t("timeline.present")
                          : monthYear(r.dateEnd!, lang)}
                      </p>
                      <p className="text-ink-3">
                        {formatDuration(
                          monthsBetween(r.dateStart, r.dateEnd),
                          words,
                        )}
                      </p>
                    </div>
                    <div className="exp-role col-span-full md:col-span-3 lg:col-span-4">
                      <h3 className="subheading">{r.title[lang]}</h3>
                      <p>{r.org[lang]}</p>
                    </div>
                    <div
                      className="track col-span-full md:col-span-3 lg:col-span-5"
                      aria-hidden="true"
                    >
                      {sc.ticks.map((tick) => (
                        <span
                          key={tick.year}
                          className="yr"
                          style={{ left: pct(tick.pos) }}
                        />
                      ))}
                      <div
                        className="bar"
                        style={{
                          left: pct(s),
                          width: pct(Math.max(e - s, 0.012)),
                        }}
                      >
                        <Dim
                          open={running}
                          className={running ? "text-accent-ink" : "text-ink-2"}
                        />
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
          <div className="page-grid scale-row" aria-hidden="true">
            <div className="scale an col-span-full md:col-span-3 md:col-start-6 lg:col-span-5 lg:col-start-8">
              {sc.ticks.map((tick) => (
                <span key={tick.year} style={{ left: pct(tick.pos) }}>
                  {tick.year}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Band>

      <Band>
        <div className="wrap">
          <SectionHead title={t("contact.title")} intro={t("contact.body")} />
          <div className="sec-body" data-reveal>
            <div className="reach-mail">
              <a className="lk" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <CopyEmail
                email={profile.email}
                copy={t("contact.copy")}
                copied={t("contact.copied")}
              />
            </div>
            <ul className="reach-links">
              <li>
                <ArrowLink href={profile.links.github} icon="out">
                  GitHub
                </ArrowLink>
              </li>
              <li>
                <ArrowLink href={profile.links.linkedin} icon="out">
                  LinkedIn
                </ArrowLink>
              </li>
              <li>
                <ArrowLink href={profile.cv} icon="dl">
                  {t("contact.cv")}
                </ArrowLink>
              </li>
            </ul>
          </div>
        </div>
      </Band>
    </>
  );
}
