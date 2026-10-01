import Link from "next/link";
import type { ReactNode } from "react";
import { Lightbox, LightboxTrigger } from "@/components/entries/lightbox";
import { Pager, type PagerLink } from "@/components/entries/pager";
import { Part } from "@/components/entries/part";
import { imageAlt, ProjectMedia } from "@/components/entries/project-media";
import { RichText } from "@/components/entries/rich-text";
import { Sheet } from "@/components/entries/sheet";
import { StackLine, StackRow } from "@/components/entries/stack";
import { StatusMark } from "@/components/entries/status-mark";
import { Band } from "@/components/ui/band";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Rise } from "@/components/ui/rise";
import { recordsWithProject } from "@/content";
import type { Lang, Project } from "@/content/types";
import { monthYear } from "@/lib/dates";
import { projectHref, projectNeighbours, recordHref } from "@/lib/entries";
import { getT, localize } from "@/lib/i18n";
import { delay } from "@/lib/motion";

type ProjectPageProps = {
  project: Project;
  lang: Lang;
};

export function ProjectPage({ project, lang }: ProjectPageProps) {
  const t = getT(lang);
  const { prev, next } = projectNeighbours(project);
  const pagerLink = (other: Project): PagerLink => ({
    href: projectHref(lang, other),
    title: other.title,
    sub: other.subtitle[lang],
  });

  return (
    <article>
      <Band>
        <ProjectHeader project={project} lang={lang} />
        <figure className="wrap p-hero fade" style={delay(400)}>
          <ProjectImage project={project} index={0} lang={lang} />
        </figure>
      </Band>

      <Band>
        <Part label={t("project.brief")} className="p-brief">
          <RichText paragraphs={project.brief[lang]} lang={lang} className="lead" />
          <StackRow techs={project.techs} lang={lang} />
        </Part>
        {project.collection && (
          <Part label={t("project.collection")} width="grid">
            <ul className="show">
              {project.collection.map((site) => (
                <li key={site.href}>
                  <a className="in" href={site.href} target="_blank" rel="noreferrer">
                    <div className="top">
                      <h3 className="subheading">{site.label}</h3>
                      <Icon name="out" />
                    </div>
                    <StackLine techs={site.techs} />
                  </a>
                </li>
              ))}
            </ul>
          </Part>
        )}
        {project.images.length > 1 && (
          <Part label={t("project.figures")} width="grid" reveal={false}>
            <ul className="figs">
              {project.images.slice(1).map((src, i) => (
                <li key={src} data-reveal>
                  <ProjectImage project={project} index={i + 1} lang={lang} />
                </li>
              ))}
            </ul>
          </Part>
        )}
      </Band>

      <Pager prev={prev && pagerLink(prev)} next={pagerLink(next)} lang={lang} />

      {project.images.length > 0 && (
        <Lightbox
          title={project.title}
          images={project.images.map((src, i) => ({
            src: `projects/${src}`,
            alt: imageAlt(project, i, lang),
          }))}
          labels={{
            dialog: t("lightbox.label", { title: project.title }),
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

function ProjectHeader({ project, lang }: ProjectPageProps) {
  const t = getT(lang);
  const records = recordsWithProject(project.slug);
  const { site, repo } = project.links ?? {};

  return (
    <header className="wrap">
      <Breadcrumb
        lang={lang}
        parent={{ href: localize(lang, "/projects"), label: t("nav.projects") }}
        current={project.title}
      />
      <div className="page-grid p-title">
        <div className="col-span-full md:col-span-5 lg:col-span-8">
          <h1 className="title">
            <Rise delay={60}>{project.title}</Rise>
          </h1>
          <p className="lead sub fade" style={delay(220)}>
            {project.subtitle[lang]}
          </p>
        </div>
        {(site || repo) && (
          <div
            className="p-actions fade col-span-full md:col-span-3 lg:col-span-4"
            style={delay(320)}
          >
            {site && (
              <Button href={site} icon="out">
                {t("project.visit")}
              </Button>
            )}
            {repo && (
              <Button href={repo} variant="outline" icon="out">
                {t("project.repo")}
              </Button>
            )}
          </div>
        )}
      </div>
      <dl className="specs p-specs fade" style={delay(360)}>
        <Spec label={t("project.started")}>{monthYear(project.dateStart, lang)}</Spec>
        <Spec label={t("project.status")}>
          <StatusMark status={project.status} lang={lang} />
        </Spec>
        <Spec label={t("project.typeLabel")}>{t(`project.type.${project.type}`)}</Spec>
        <Spec label={t("project.context")}>
          {records.length === 0
            ? t("project.personal")
            : records.map((record, i) => (
                <span key={record.slug}>
                  {i > 0 && " "}
                  <Link className="lk" href={recordHref(lang, record)}>
                    {record.org[lang]}
                  </Link>
                </span>
              ))}
        </Spec>
      </dl>
    </header>
  );
}

function Spec({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="an">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

type ProjectImageProps = {
  project: Project;
  index: number;
  lang: Lang;
};

/** A framed screenshot that opens the viewer; the hatched placeholder when the project has none. */
function ProjectImage({ project, index, lang }: ProjectImageProps) {
  const isCover = index === 0;
  const sizes = isCover ? "(min-width: 90rem) 1344px, 100vw" : "(min-width: 64rem) 75vw, 100vw";

  if (project.images.length === 0) {
    return (
      <Sheet>
        <ProjectMedia project={project} lang={lang} sizes="100vw" />
      </Sheet>
    );
  }

  return (
    <LightboxTrigger
      index={index}
      label={`${getT(lang)("project.enlarge")}: ${imageAlt(project, index, lang)}`}
    >
      <Sheet>
        <ProjectMedia
          project={project}
          lang={lang}
          index={index}
          sizes={sizes}
          priority={isCover}
        />
      </Sheet>
    </LightboxTrigger>
  );
}
