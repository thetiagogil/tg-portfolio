import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Band } from "@/components/ui/Band";
import { PageHead } from "@/components/ui/PageHead";
import { SectionHead } from "@/components/ui/SectionHead";
import {
  currentRole,
  degreeBySlug,
  MAIN_STACK,
  profile,
  roleBySlug,
  roles,
  TOOLS,
} from "@/content";
import type { Lang, RecordEntry } from "@/content/types";
import { year } from "@/lib/dates";
import { recordHref } from "@/lib/entries";
import { getT, localize } from "@/lib/i18n";
import { TOOL_ICONS } from "./tool-icons";

type Principle = "design" | "structure" | "access" | "longevity";

/** "How I work": four principles, each with a line icon (24-unit box, like the site's icons). */
const PRINCIPLES: { key: Principle; icon: ReactNode }[] = [
  {
    key: "design",
    icon: (
      <>
        <path d="M5 18c1.5-7 12.5-7 14 0" />
        <path d="M5 18 8.5 7.5M19 18 15.5 7.5" />
        <rect x="3" y="16" width="4" height="4" />
        <rect x="17" y="16" width="4" height="4" />
        <circle cx="8.5" cy="6.5" r="1.2" />
        <circle cx="15.5" cy="6.5" r="1.2" />
      </>
    ),
  },
  {
    key: "structure",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" />
        <path d="M3 9h18M10 9v12M10 15h11" />
      </>
    ),
  },
  {
    key: "access",
    icon: (
      <>
        <circle cx="12" cy="4.5" r="1.8" />
        <path d="M4 8.5l8 1.5 8-1.5M12 10v4.5M12 14.5 8.5 21M12 14.5l3.5 6.5" />
      </>
    ),
  },
  {
    key: "longevity",
    icon: <path d="M8 7 3 12l5 5M16 7l5 5-5 5M14 4l-4 16" />,
  },
];

type AboutPageProps = {
  lang: Lang;
};

export function AboutPage({ lang }: AboutPageProps) {
  return (
    <>
      <Intro lang={lang} />
      <Story lang={lang} />
      <Principles lang={lang} />
      <Toolbox lang={lang} />
    </>
  );
}

function Intro({ lang }: { lang: Lang }) {
  const t = getT(lang);
  const faul = degreeBySlug("faul")!;
  const ironhack = degreeBySlug("ironhack")!;

  return (
    <Band>
      <PageHead eyebrow={t("nav.about")} title={t("about.title")} intro={t("about.intro")} />
      <section className="wrap page-grid a-intro">
        <figure className="col-span-full sm:col-span-3 md:col-span-3 lg:col-span-4" data-reveal>
          <div className="portrait">
            <Image
              src={`portrait/${profile.portrait}`}
              alt={t("common.portraitAlt")}
              fill
              sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 36vw, 100vw"
            />
          </div>
        </figure>
        <div className="bio col-span-full md:col-span-5 lg:col-span-7 lg:col-start-6" data-reveal>
          {t("about.bio")
            .split(/\n{2,}/)
            .map((paragraph) => (
              <p key={paragraph} className="read">
                {paragraph}
              </p>
            ))}
          <dl className="specs">
            <Fact label={t("about.facts.based")}>{profile.location[lang]}</Fact>
            <Fact label={t("about.facts.current")}>
              <Link className="lk" href={recordHref(lang, currentRole)}>
                {currentRole.title[lang]}, {currentRole.org[lang]}
              </Link>
            </Fact>
            <Fact label={t("about.facts.degree")}>{faul.title[lang]}</Fact>
            <Fact label={t("about.facts.frontendSince")}>{year(ironhack.dateStart)}</Fact>
          </dl>
        </div>
      </section>
    </Band>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="an">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

type Chapter = {
  key: "school" | "practice" | "transition" | "software";
  records: RecordEntry[];
  body: string;
};

/** "How I got into frontend": school, practice, the switch, then software, each with its years and links. */
function Story({ lang }: { lang: Lang }) {
  const t = getT(lang);
  const faul = degreeBySlug("faul")!;
  const architect = roleBySlug("crespassos")!;
  const ironhack = degreeBySlug("ironhack")!;
  const softwareRoles = roles.filter((role) => role !== architect).reverse();
  const chapters: Chapter[] = [
    { key: "school", records: [faul], body: faul.summary[lang] },
    { key: "practice", records: [architect], body: architect.summary[lang] },
    { key: "transition", records: [ironhack], body: ironhack.summary[lang] },
    { key: "software", records: softwareRoles, body: t("about.story.software.body") },
  ];

  return (
    <Band>
      <div className="wrap">
        <SectionHead
          title={t("about.story.title")}
          action={
            <ArrowLink href={localize(lang, "/timeline")}>{t("common.fullTimeline")}</ArrowLink>
          }
        />
        <ol className="story sec-body">
          {chapters.map((chapter) => (
            <li key={chapter.key} className="page-grid" data-reveal>
              <p className="an col-span-full lg:col-span-3">{years(chapter.records, lang)}</p>
              <h3 className="subheading col-span-full md:col-span-3 lg:col-span-4">
                {t(`about.story.${chapter.key}.title`)}
              </h3>
              <div className="col-span-full md:col-span-5 lg:col-span-5">
                <p>{chapter.body}</p>
                <div className="rel">
                  {chapter.records.map((record) => (
                    <ArrowLink key={record.slug} href={recordHref(lang, record)}>
                      {record.org[lang]}
                    </ArrowLink>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Band>
  );
}

/** "2014 – 2020", "2023", or "2023 – Present" while one of them is still running. */
function years(records: RecordEntry[], lang: Lang): string {
  const start = Math.min(...records.map((record) => year(record.dateStart)));
  if (records.some((record) => record.dateEnd === null))
    return `${start} – ${getT(lang)("common.present")}`;
  const end = Math.max(...records.map((record) => year(record.dateEnd ?? record.dateStart)));
  return start === end ? `${start}` : `${start} – ${end}`;
}

function Principles({ lang }: { lang: Lang }) {
  const t = getT(lang);
  return (
    <Band>
      <div className="wrap">
        <SectionHead title={t("about.method.title")} intro={t("about.method.intro")} />
        <ol className="principles sec-body">
          {PRINCIPLES.map((principle) => (
            <li key={principle.key} className="principle" data-reveal>
              <span className="principle-ico">
                <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                  {principle.icon}
                </svg>
              </span>
              <h3 className="principle-title">{t(`about.method.${principle.key}.title`)}</h3>
              <p>{t(`about.method.${principle.key}.body`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </Band>
  );
}

/** "What I work with": the main stack as logo cells, each in its brand colour on hover. */
function Toolbox({ lang }: { lang: Lang }) {
  const t = getT(lang);
  return (
    <Band>
      <div className="wrap">
        <SectionHead title={t("about.toolbox.title")} />
        <div className="sec-body">
          <ul className="stack-panel">
            {MAIN_STACK.map((id) => {
              const { name, brand } = TOOLS[id];
              return (
                <li
                  key={id}
                  className="stack-cell"
                  style={brand ? ({ "--brand": brand } as CSSProperties) : undefined}
                  data-reveal
                >
                  <span className="stack-ico">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={TOOL_ICONS[id]} />
                    </svg>
                  </span>
                  <span className="name">{name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Band>
  );
}
