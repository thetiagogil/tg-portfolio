import Link from "next/link";
import type { Lang, Project } from "@/content/types";
import { year } from "@/lib/dates";
import { projectHref } from "@/lib/entries";
import { getT } from "@/lib/i18n";
import { ProjectMedia } from "./ProjectMedia";
import { Sheet } from "./Sheet";
import { ListStatus } from "./StatusMark";

/** Image, "2025 · Personal · In progress", title (the whole card is the link), subtitle. */
export function ProjectCard({
  project,
  lang,
  sizes,
  heading: Heading = "h3",
}: {
  project: Project;
  lang: Lang;
  sizes: string;
  /** h2 where the cards are the page's top level (Projects), h3 under a section heading. */ heading?:
    "h2" | "h3";
}) {
  const t = getT(lang);
  return (
    <article className="card group">
      <Sheet>
        <ProjectMedia project={project} lang={lang} sizes={sizes} decorative />
      </Sheet>
      <p className="an meta card-meta">
        <span>{year(project.dateStart)}</span>
        <span>{t(`project.type.${project.type}`)}</span>
        <ListStatus status={project.status} lang={lang} />
      </p>
      <Heading className="subheading">
        <Link href={projectHref(lang, project)}>{project.title}</Link>
      </Heading>
      <p className="sub">{project.subtitle[lang]}</p>
    </article>
  );
}
