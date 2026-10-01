import Link from "next/link";
import type { CSSProperties } from "react";
import { Band } from "@/components/Band";
import { Dim } from "@/components/Dim";
import { Icon } from "@/components/Icon";
import { Pager } from "@/components/Pager";
import { ProjectCard } from "@/components/ProjectCard";
import { RichText } from "@/components/RichText";
import { SmartLink } from "@/components/SmartLink";
import { StackLine, StackRow } from "@/components/Stack";
import { projectBySlug } from "@/content";
import type { Degree, Lang, Role } from "@/content/types";
import { formatDuration, monthsBetween, monthYear } from "@/lib/dates";
import { recordHref, recordNeighbours } from "@/lib/entries";
import { getT, localize } from "@/lib/i18n";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** A role (experience) or degree (education) page. */
export function RecordPage({
  record: r,
  lang,
}: {
  record: Role | Degree;
  lang: Lang;
}) {
  const t = getT(lang);
  const running = r.dateEnd === null;
  const words = {
    year: t("duration.year"),
    years: t("duration.years"),
    month: t("duration.month"),
    months: t("duration.months"),
  };
  const { prev, next } = recordNeighbours(r);
  const pagerItem = (x: Role | Degree) => ({
    href: recordHref(lang, x),
    title: x.org[lang],
    sub: x.title[lang],
  });
  const periodProjects = (r.projects ?? [])
    .map(projectBySlug)
    .filter((p) => p !== undefined);
  const part = (label: string, body: React.ReactNode, wide = false) => (
    <section className="wrap">
      <div className="page-grid part record-part" data-reveal>
        <h2 className="an rail-label col-span-full lg:col-span-3">{label}</h2>
        <div
          className={
            wide
              ? "col-span-full md:col-span-8 lg:col-span-9"
              : "col-span-full md:col-span-6 lg:col-span-7"
          }
        >
          {body}
        </div>
      </div>
    </section>
  );

  return (
    <article>
      <Band>
        <header className="wrap">
          <nav className="an crumb fade" aria-label={t("a11y.breadcrumb")}>
            <Link href={localize(lang, "/timeline")}>{t("nav.timeline")}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{t(`section.${r.kind}`)}</span>
          </nav>
          <div className="page-grid r-title">
            <div className="col-span-full md:col-span-5 lg:col-span-8">
              <h1 className="title">
                <span className="rise-mask">
                  <span className="rise" style={delay(60)}>
                    {r.title[lang]}
                  </span>
                </span>
              </h1>
              <p className="lead sub fade r-org" style={delay(220)}>
                {r.link ? (
                  <a
                    className="tl-link"
                    href={r.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {r.org[lang]}
                    <Icon name="out" />
                  </a>
                ) : (
                  r.org[lang]
                )}
                {r.documents?.map((d) => (
                  <a
                    key={d.href}
                    className="tl-link r-doc"
                    href={d.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {d.label[lang]}
                    <Icon name="dl" />
                  </a>
                ))}
              </p>
            </div>
            <div
              className="dur fade col-span-full self-end md:col-span-3 lg:col-span-4"
              style={delay(320)}
            >
              <p className="an">{t("record.duration")}</p>
              <Dim
                label={formatDuration(
                  monthsBetween(r.dateStart, r.dateEnd),
                  words,
                )}
                open={running}
                className={running ? "text-accent-ink" : "text-ink-2"}
                labelClassName={running ? "text-accent-ink" : "text-ink"}
              />
              <p className="an ends">
                <span>{monthYear(r.dateStart, lang)}</span>
                <span>
                  {running
                    ? t("timeline.present")
                    : monthYear(r.dateEnd!, lang)}
                </span>
              </p>
            </div>
          </div>
        </header>
      </Band>

      <Band>
        <section className="wrap">
          <div className="page-grid part p-brief record-part" data-reveal>
            <h2 className="an rail-label col-span-full lg:col-span-3">
              {t("record.overview")}
            </h2>
            <div className="col-span-full md:col-span-8 lg:col-span-9">
              <RichText
                paragraphs={r.overview[lang]}
                lang={lang}
                className="read"
              />
              <StackRow techs={r.techs} lang={lang} />
            </div>
          </div>
        </section>
        {part(
          t("record.scope"),
          <ul className="scope">
            {r.scope.map((s) => (
              <li key={s.title.en}>
                <h3 className="subheading">{s.title[lang]}</h3>
                <p>{s.text[lang]}</p>
              </li>
            ))}
          </ul>,
          true,
        )}
        {r.products &&
          part(
            t(
              r.kind === "experience" ? "record.products" : "record.highlights",
            ),
            <ul className="prods">
              {r.products.map((p) => {
                const inner = (
                  <>
                    <h3 className="subheading">
                      {p.label[lang]}
                      {p.href && (
                        <Icon name={/^https?:/.test(p.href) ? "out" : "dl"} />
                      )}
                    </h3>
                    <p>{p.description[lang]}</p>
                    <StackLine techs={p.techs} />
                  </>
                );
                return (
                  <li key={p.label.en}>
                    {p.href ? (
                      <SmartLink href={p.href}>{inner}</SmartLink>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ul>,
            true,
          )}
        {periodProjects.length > 0 && (
          <section className="wrap">
            <div className="page-grid part" data-reveal>
              <h2 className="an rail-label col-span-full lg:col-span-3">
                {t("record.projects")}
              </h2>
              <ul className="cards three col-span-full lg:col-span-9">
                {periodProjects.map((p) => (
                  <li key={p.slug}>
                    <ProjectCard
                      project={p}
                      lang={lang}
                      sizes="(min-width: 64rem) 22vw, (min-width: 48rem) 45vw, 100vw"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </Band>

      <Pager
        prev={prev && pagerItem(prev)}
        next={pagerItem(next)}
        lang={lang}
      />
    </article>
  );
}
