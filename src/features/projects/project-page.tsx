import { notFound } from "next/navigation";
import { Lightbox } from "@/components/entries/lightbox";
import { Pager, type PagerLink } from "@/components/entries/pager";
import { Part } from "@/components/entries/part";
import { imageAlt } from "@/components/entries/project-media";
import { RichText } from "@/components/entries/rich-text";
import { StackRow } from "@/components/entries/stack";
import { Band } from "@/components/ui/band";
import { projectBySlug } from "@/content";
import type { Lang, Project } from "@/content/types";
import { projectHref, projectNeighbours } from "@/lib/entries";
import { getT } from "@/lib/i18n";
import { delay } from "@/lib/motion";
import { ProjectCollection } from "./project-collection";
import { ProjectHeader } from "./project-header";
import { ProjectImage } from "./project-image";

type ProjectPageProps = {
  slug: string;
  lang: Lang;
};

export function ProjectPage({ slug, lang }: ProjectPageProps) {
  const project = projectBySlug(slug);

  if (!project) notFound();

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
        <figure className="wrap fade mt-10 md:mt-14" style={delay(400)}>
          <ProjectImage project={project} index={0} lang={lang} />
        </figure>
      </Band>

      <Band>
        <Part label={t("project.brief")} first>
          <RichText paragraphs={project.brief[lang]} lang={lang} className="lead max-w-[52ch]" />
          <StackRow techs={project.techs} lang={lang} />
        </Part>

        {project.collection && (
          <Part label={t("project.collection")} width="grid">
            <ProjectCollection sites={project.collection} />
          </Part>
        )}

        {project.images.length > 1 && (
          <Part label={t("project.figures")} width="grid" reveal={false}>
            <ul className="grid gap-8">
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
