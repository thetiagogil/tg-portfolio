import { notFound } from "next/navigation";
import { Pager, type PagerLink } from "@/components/entries/pager";
import { Part } from "@/components/entries/part";
import { ProjectCard } from "@/components/entries/project-card";
import { ProjectCards } from "@/components/entries/project-cards";
import { RichText } from "@/components/entries/rich-text";
import { StackRow } from "@/components/entries/stack";
import { Band } from "@/components/ui/band";
import { projectBySlug } from "@/content";
import type { Lang, RecordEntry } from "@/content/types";
import { recordHref, recordNeighbours } from "@/lib/entries";
import { getT } from "@/lib/i18n";
import { ProductList } from "./product-list";
import { RecordHeader } from "./record-header";
import { recordBySlug } from "./record-route";
import { ScopeList } from "./scope-list";

type RecordPageProps = {
  kind: RecordEntry["kind"];
  slug: string;
  lang: Lang;
};

export function RecordPage({ kind, slug, lang }: RecordPageProps) {
  const record = recordBySlug(kind, slug);

  if (!record) notFound();

  const t = getT(lang);
  const { prev, next } = recordNeighbours(record);
  const projects = (record.projects ?? []).map(projectBySlug).filter((project) => !!project);
  const pagerLink = (other: RecordEntry): PagerLink => ({
    href: recordHref(lang, other),
    title: other.org[lang],
    sub: other.title[lang],
  });

  return (
    <article>
      <Band>
        <RecordHeader record={record} lang={lang} />
      </Band>

      <Band>
        <Part label={t("record.overview")} first>
          <RichText paragraphs={record.overview[lang]} lang={lang} className="read" />
          <StackRow techs={record.techs} lang={lang} />
        </Part>

        <Part label={t("record.scope")}>
          <ScopeList points={record.scope} lang={lang} />
        </Part>

        {record.products && (
          <Part label={t(record.kind === "experience" ? "record.products" : "record.highlights")}>
            <ProductList products={record.products} lang={lang} />
          </Part>
        )}

        {projects.length > 0 && (
          <Part label={t("record.projects")} width="grid">
            <ProjectCards three className="mt-12 md:mt-16">
              {projects.map((project) => (
                <li key={project.slug}>
                  <ProjectCard
                    project={project}
                    lang={lang}
                    sizes="(min-width: 64rem) 22vw, (min-width: 48rem) 45vw, 100vw"
                  />
                </li>
              ))}
            </ProjectCards>
          </Part>
        )}
      </Band>

      <Pager prev={prev && pagerLink(prev)} next={pagerLink(next)} lang={lang} />
    </article>
  );
}
