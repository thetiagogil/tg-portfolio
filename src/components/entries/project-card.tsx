import Link from "next/link";
import type { Lang, Project } from "@/content/types";
import { year } from "@/lib/dates";
import { projectHref } from "@/lib/entries";
import { getT } from "@/lib/i18n";
import { ProjectMedia } from "./project-media";
import { Sheet } from "./sheet";
import { StatusMark } from "./status-mark";

type ProjectCardProps = {
  project: Project;
  lang: Lang;
  /** How wide the image shows, to pick the right file. */
  sizes: string;
  /** h2 where the cards are the page's top level (Projects), h3 under a section heading. */
  heading?: "h2" | "h3";
};

/** Image, "2025 · Personal · In progress", the title (the whole card is the link) and the subtitle. */
export function ProjectCard({ project, lang, sizes, heading: Heading = "h3" }: ProjectCardProps) {
  const t = getT(lang);
  return (
    <article className="card group">
      <Sheet>
        <ProjectMedia project={project} lang={lang} sizes={sizes} decorative />
      </Sheet>
      <p className="an meta card-meta">
        <span>{year(project.dateStart)}</span>
        <span>{t(`project.type.${project.type}`)}</span>
        <StatusMark status={project.status} lang={lang} hideCompleted />
      </p>
      <Heading className="subheading">
        <Link href={projectHref(lang, project)}>{project.title}</Link>
      </Heading>
      <p className="sub">{project.subtitle[lang]}</p>
    </article>
  );
}
