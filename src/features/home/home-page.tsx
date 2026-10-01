import Image from "next/image";
import Link from "next/link";
import { Dim } from "@/components/entries/dim";
import { ProjectCard } from "@/components/entries/project-card";
import { ContactLinks } from "@/components/layout/contact-links";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Band } from "@/components/ui/band";
import { Button } from "@/components/ui/button";
import { CopyEmail } from "@/components/ui/copy-email";
import { Rise } from "@/components/ui/rise";
import { SectionHead } from "@/components/ui/section-head";
import { featuredProjects, profile, projects, roles } from "@/content";
import type { Lang, Role } from "@/content/types";
import { duration, endLabel, monthYear, toDate } from "@/lib/dates";
import { recordHref } from "@/lib/entries";
import { getT, localize } from "@/lib/i18n";
import { delay } from "@/lib/motion";
import { pct, type Scale, scaleOf, utc } from "@/lib/scale";

type HomePageProps = {
  lang: Lang;
};

export function HomePage({ lang }: HomePageProps) {
  return (
    <>
      <Hero lang={lang} />
      <SelectedWork lang={lang} />
      <WorkHistory lang={lang} />
      <Contact lang={lang} />
    </>
  );
}

function Hero({ lang }: { lang: Lang }) {
  const t = getT(lang);
  return (
    <Band className="hero">
      <div className="wrap page-grid hero-grid">
        <div className="hero-text col-span-full md:col-span-5 lg:col-span-7">
          <h1 className="hero-title">
            <Rise delay={80}>{t("home.hero.line1")}</Rise>
            <Rise delay={180} className="text-ink-3">
              {t("home.hero.line2")}
            </Rise>
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
              alt={t("common.portraitAlt")}
              fill
              priority
              sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 36vw, (min-width: 40rem) 70vw, 100vw"
            />
          </div>
        </figure>
      </div>
    </Band>
  );
}

function SelectedWork({ lang }: { lang: Lang }) {
  const t = getT(lang);
  return (
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
          {featuredProjects.map((project) => (
            <li key={project.slug} data-reveal>
              <ProjectCard
                project={project}
                lang={lang}
                sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 45vw, 100vw"
              />
            </li>
          ))}
        </ul>
      </div>
    </Band>
  );
}

/** "Where I've worked": each role as a bar on a track from two months before the first role to today. */
function WorkHistory({ lang }: { lang: Lang }) {
  const t = getT(lang);
  const today = new Date();
  const first = toDate(roles[roles.length - 1].dateStart);
  const scale = scaleOf([[utc(first.getUTCFullYear(), first.getUTCMonth() - 2), today]]);

  return (
    <Band>
      <div className="wrap">
        <SectionHead
          title={t("home.experience.title")}
          action={
            <ArrowLink href={localize(lang, "/timeline")}>{t("common.fullTimeline")}</ArrowLink>
          }
        />
        <ol className="exp-list sec-body">
          {roles.map((role) => (
            <li key={role.slug} data-reveal>
              <RoleRow role={role} scale={scale} today={today} lang={lang} />
            </li>
          ))}
        </ol>
        <div className="page-grid scale-row" aria-hidden="true">
          <div className="scale an col-span-full md:col-span-3 md:col-start-6 lg:col-span-5 lg:col-start-8">
            {scale.ticks.map((tick) => (
              <span key={tick.year} style={{ left: pct(tick.pos) }}>
                {tick.year}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Band>
  );
}

type RoleRowProps = {
  role: Role;
  scale: Scale;
  today: Date;
  lang: Lang;
};

function RoleRow({ role, scale, today, lang }: RoleRowProps) {
  const ongoing = role.dateEnd === null;
  const start = scale.pos(toDate(role.dateStart));
  const end = scale.pos(role.dateEnd === null ? today : toDate(role.dateEnd));

  return (
    <Link className="page-grid exp-row" href={recordHref(lang, role)}>
      <div className="exp-when an col-span-full md:col-span-2 lg:col-span-3">
        <p className="text-ink-2">
          {monthYear(role.dateStart, lang)} – {endLabel(role.dateEnd, lang)}
        </p>
        <p className="text-ink-3">{duration(role.dateStart, role.dateEnd, lang)}</p>
      </div>
      <div className="exp-role col-span-full md:col-span-3 lg:col-span-4">
        <h3 className="subheading">{role.title[lang]}</h3>
        <p>{role.org[lang]}</p>
      </div>
      <div className="track col-span-full md:col-span-3 lg:col-span-5" aria-hidden="true">
        {scale.ticks.map((tick) => (
          <span key={tick.year} className="yr" style={{ left: pct(tick.pos) }} />
        ))}
        <div className="bar" style={{ left: pct(start), width: pct(Math.max(end - start, 0.012)) }}>
          <Dim open={ongoing} className={ongoing ? "text-accent-ink" : "text-ink-2"} />
        </div>
      </div>
    </Link>
  );
}

function Contact({ lang }: { lang: Lang }) {
  const t = getT(lang);
  return (
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
              labels={{ copy: t("contact.copy"), copied: t("contact.copied") }}
            />
          </div>
          <ContactLinks lang={lang} className="reach-links" />
        </div>
      </div>
    </Band>
  );
}
