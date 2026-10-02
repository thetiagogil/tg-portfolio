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
  sizes: string;
  heading?: "h2" | "h3";
};

export function ProjectCard({ project, lang, sizes, heading: Heading = "h3" }: ProjectCardProps) {
  const t = getT(lang);

  return (
    <article className="group relative">
      <Sheet>
        <ProjectMedia project={project} lang={lang} sizes={sizes} decorative />
      </Sheet>

      <p className="an mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-3">
        <span>{year(project.dateStart)}</span>
        <span>{t(`project.type.${project.type}`)}</span>
        <StatusMark status={project.status} lang={lang} hideCompleted />
      </p>

      <Heading className="subheading mt-3">
        <Link
          href={projectHref(lang, project)}
          className="transition-colors duration-300 group-hover:text-accent-ink after:absolute after:inset-0"
        >
          {project.title}
        </Link>
      </Heading>

      <p className="mt-1.5 text-ink-2">{project.subtitle[lang]}</p>
    </article>
  );
}
