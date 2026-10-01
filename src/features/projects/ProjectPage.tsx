import Link from "next/link";
import type { CSSProperties } from "react";
import { Band } from "@/components/Band";
import { Button } from "@/components/Button";
import { Lightbox, LightboxTrigger } from "@/components/Lightbox";
import { Pager } from "@/components/Pager";
import { ProjectMedia } from "@/components/ProjectMedia";
import { RichText } from "@/components/RichText";
import { Sheet } from "@/components/Sheet";
import { StackLine, StackRow } from "@/components/Stack";
import { StatusMark } from "@/components/StatusMark";
import { Icon } from "@/components/Icon";
import { parentsOf } from "@/content";
import type { Lang, Project } from "@/content/types";
import { monthYear } from "@/lib/dates";
import { projectHref, projectNeighbours, recordHref } from "@/lib/entries";
import { fill } from "@/lib/format";
import { getT, localize } from "@/lib/i18n";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function ProjectPage({
  project: p,
  lang,
}: {
  project: Project;
  lang: Lang;
}) {
  const t = getT(lang);
  const { prev, next } = projectNeighbours(p.slug);
  const parents = parentsOf(p.slug);
  const total = p.images.length;
  const alt = (i: number) =>
    fill(t("project.imageNumbered"), { n: i + 1, total, title: p.title });
  const enlarge = (i: number) => `${t("project.enlarge")}: ${alt(i)}`;
  const pagerItem = (x: Project) => ({
    href: projectHref(lang, x),
    title: x.title,
    sub: x.subtitle[lang],
  });
  const spec = (label: string, value: React.ReactNode) => (
    <div>
      <dt className="an">{label}</dt>
      <dd>{value}</dd>
    </div>
  );

  return (
    <article>
      <Band>
        <header className="wrap">
          <nav className="an crumb fade" aria-label={t("a11y.breadcrumb")}>
            <Link href={localize(lang, "/projects")}>{t("nav.projects")}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{p.title}</span>
          </nav>
          <div className="page-grid p-title">
            <div className="col-span-full md:col-span-5 lg:col-span-8">
              <h1 className="title">
                <span className="rise-mask">
                  <span className="rise" style={delay(60)}>
                    {p.title}
                  </span>
                </span>
              </h1>
              <p className="lead sub fade" style={delay(220)}>
                {p.subtitle[lang]}
              </p>
            </div>
            {(p.links?.site || p.links?.repo) && (
              <div
                className="p-actions fade col-span-full md:col-span-3 lg:col-span-4"
                style={delay(320)}
              >
                {p.links.site && (
                  <Button href={p.links.site} icon="out">
                    {t("project.visit")}
                  </Button>
                )}
                {p.links.repo && (
                  <Button href={p.links.repo} variant="outline" icon="out">
                    {t("project.repo")}
                  </Button>
                )}
              </div>
            )}
          </div>
          <dl className="specs p-specs fade" style={delay(360)}>
            {spec(t("project.started"), monthYear(p.dateStart, lang))}
            {spec(
              t("project.status"),
              <StatusMark status={p.status} lang={lang} />,
            )}
            {spec(t("project.typeLabel"), t(`project.type.${p.type}`))}
            {spec(
              t("project.context"),
              parents.length
                ? parents.map((r, i) => (
                    <span key={r.slug}>
                      {i > 0 && " "}
                      <Link className="lk" href={recordHref(lang, r)}>
                        {r.org[lang]}
                      </Link>
                    </span>
                  ))
                : t("project.personal"),
            )}
          </dl>
        </header>
        <figure className="wrap p-hero fade" style={delay(400)}>
          {total ? (
            <LightboxTrigger index={0} label={enlarge(0)}>
              <Sheet>
                <ProjectMedia
                  project={p}
                  lang={lang}
                  priority
                  sizes="(min-width: 90rem) 1344px, 100vw"
                />
              </Sheet>
            </LightboxTrigger>
          ) : (
            <Sheet>
              <ProjectMedia project={p} lang={lang} sizes="100vw" />
            </Sheet>
          )}
        </figure>
      </Band>

      <Band>
        <section className="wrap">
          <div className="page-grid part p-brief" data-reveal>
            <h2 className="an rail-label col-span-full lg:col-span-3">
              {t("project.brief")}
            </h2>
            <div className="col-span-full md:col-span-8 lg:col-span-9">
              <RichText
                paragraphs={p.brief[lang]}
                lang={lang}
                className="lead"
              />
              <StackRow techs={p.techs} lang={lang} />
            </div>
          </div>
        </section>
        {p.collection && (
          <section className="wrap">
            <div className="page-grid part" data-reveal>
              <h2 className="an rail-label col-span-full lg:col-span-3">
                {t("project.collection")}
              </h2>
              <ul className="show col-span-full lg:col-span-9">
                {p.collection.map((c) => (
                  <li key={c.href}>
                    <a
                      className="in"
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="top">
                        <h3 className="subheading">{c.label}</h3>
                        <Icon name="out" />
                      </div>
                      <StackLine techs={c.techs} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
        {total > 1 && (
          <section className="wrap">
            <div className="page-grid part">
              <h2 className="an rail-label col-span-full lg:col-span-3">
                {t("project.figures")}
              </h2>
              <ul className="figs col-span-full lg:col-span-9">
                {p.images.slice(1).map((src, i) => (
                  <li key={src} data-reveal>
                    <LightboxTrigger index={i + 1} label={enlarge(i + 1)}>
                      <Sheet>
                        <ProjectMedia
                          project={p}
                          lang={lang}
                          index={i + 1}
                          sizes="(min-width: 64rem) 75vw, 100vw"
                        />
                      </Sheet>
                    </LightboxTrigger>
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

      {total > 0 && (
        <Lightbox
          title={p.title}
          images={p.images.map((src, i) => ({
            src: `projects/${src}`,
            alt: alt(i),
          }))}
          labels={{
            dialog: fill(t("lightbox.label"), { title: p.title }),
            close: t("nav.close"),
            previous: t("lightbox.previous"),
            next: t("lightbox.next"),
            counter: t("lightbox.counter"),
          }}
        />
      )}
    </article>
  );
}
