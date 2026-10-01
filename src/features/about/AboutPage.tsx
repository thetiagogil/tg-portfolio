import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/ArrowLink";
import { Band } from "@/components/Band";
import { PageHead } from "@/components/PageHead";
import { SectionHead } from "@/components/SectionHead";
import { TOOL_ICONS } from "@/components/tool-icons";
import {
  currentRole,
  degreeBySlug,
  MAIN_STACK,
  profile,
  roleBySlug,
  roles,
  TOOLS,
} from "@/content";
import type { Degree, Lang, Role } from "@/content/types";
import { year } from "@/lib/dates";
import { recordHref } from "@/lib/entries";
import type { UiKey } from "@/lib/i18n";
import { getT, localize } from "@/lib/i18n";
import type { CSSProperties } from "react";

// How I work: four principles, each with a line icon.
const PRINCIPLES: {
  key: "design" | "structure" | "access" | "longevity";
  icon: React.ReactNode;
}[] = [
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

export function AboutPage({ lang }: { lang: Lang }) {
  const t = getT(lang);
  const faul = degreeBySlug("faul")!;
  const ironhack = degreeBySlug("ironhack")!;
  const architect = roleBySlug("crespassos")!;
  const software = roles.filter((r) => r.slug !== "crespassos").reverse();
  const current = currentRole!;

  const span = (list: (Role | Degree)[]) => {
    const start = Math.min(...list.map((x) => year(x.dateStart)));
    if (list.some((x) => x.dateEnd === null))
      return `${start} – ${t("timeline.present")}`;
    const end = Math.max(...list.map((x) => year(x.dateEnd ?? x.dateStart)));
    return start === end ? `${start}` : `${start} – ${end}`;
  };
  const chapters: { key: string; items: (Role | Degree)[]; body: string }[] = [
    { key: "school", items: [faul], body: faul.summary[lang] },
    { key: "practice", items: [architect], body: architect.summary[lang] },
    { key: "transition", items: [ironhack], body: ironhack.summary[lang] },
    { key: "software", items: software, body: t("about.story.software.body") },
  ];

  return (
    <>
      <Band>
        <PageHead
          eyebrow={t("nav.about")}
          title={t("about.title")}
          intro={t("about.intro")}
        />
        <section className="wrap page-grid a-intro">
          <figure
            className="col-span-full sm:col-span-3 md:col-span-3 lg:col-span-4"
            data-reveal
          >
            <div className="portrait">
              <Image
                src={`portrait/${profile.portrait}`}
                alt={t("home.hero.portraitAlt")}
                fill
                sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 36vw, 100vw"
              />
            </div>
          </figure>
          <div
            className="bio col-span-full md:col-span-5 lg:col-span-7 lg:col-start-6"
            data-reveal
          >
            {t("about.bio")
              .split(/\n{2,}/)
              .map((para) => (
                <p key={para} className="read">
                  {para}
                </p>
              ))}
            <dl className="specs">
              <div>
                <dt className="an">{t("home.hero.facts.based")}</dt>
                <dd>{profile.location[lang]}</dd>
              </div>
              <div>
                <dt className="an">{t("home.hero.facts.current")}</dt>
                <dd>
                  <Link className="lk" href={recordHref(lang, current)}>
                    {current.title[lang]}, {current.org[lang]}
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="an">{t("about.facts.degree")}</dt>
                <dd>{faul.title[lang]}</dd>
              </div>
              <div>
                <dt className="an">{t("about.facts.frontendSince")}</dt>
                <dd>{year(ironhack.dateStart)}</dd>
              </div>
            </dl>
          </div>
        </section>
      </Band>

      <Band>
        <div className="wrap">
          <SectionHead
            title={t("about.story.title")}
            action={
              <ArrowLink href={localize(lang, "/timeline")}>
                {t("home.experience.timeline")}
              </ArrowLink>
            }
          />
          <ol className="story sec-body">
            {chapters.map((c) => (
              <li key={c.key} className="page-grid" data-reveal>
                <p className="an col-span-full lg:col-span-3">
                  {span(c.items)}
                </p>
                <h3 className="subheading col-span-full md:col-span-3 lg:col-span-4">
                  {t(`about.story.${c.key}.title` as UiKey)}
                </h3>
                <div className="col-span-full md:col-span-5 lg:col-span-5">
                  <p>{c.body}</p>
                  <div className="rel">
                    {c.items.map((it) => (
                      <ArrowLink key={it.slug} href={recordHref(lang, it)}>
                        {it.org[lang]}
                      </ArrowLink>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Band>

      <Band>
        <div className="wrap">
          <SectionHead
            title={t("home.method.title")}
            intro={t("home.method.intro")}
          />
          <ol className="principles sec-body">
            {PRINCIPLES.map((pr) => (
              <li key={pr.key} className="principle" data-reveal>
                <span className="principle-ico">
                  <svg className="ico" viewBox="0 0 24 24" aria-hidden="true">
                    {pr.icon}
                  </svg>
                </span>
                <h3 className="principle-title">
                  {t(`home.method.${pr.key}.title`)}
                </h3>
                <p>{t(`home.method.${pr.key}.body`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </Band>

      <Band>
        <div className="wrap">
          <SectionHead title={t("about.toolbox.title")} />
          <div className="sec-body">
            <ul className="stack-panel">
              {MAIN_STACK.map((id) => {
                const tool = TOOLS[id] as { name: string; brand?: string };
                return (
                  <li
                    key={id}
                    className="stack-cell"
                    style={
                      tool.brand
                        ? ({ "--brand": tool.brand } as CSSProperties)
                        : undefined
                    }
                    data-reveal
                  >
                    <span className="stack-ico">
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d={TOOL_ICONS[id]} />
                      </svg>
                    </span>
                    <span className="name">{tool.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Band>
    </>
  );
}
