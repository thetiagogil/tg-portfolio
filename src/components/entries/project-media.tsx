import Image from "next/image";
import type { Lang, Project } from "@/content/types";
import { getT } from "@/lib/i18n";

type ProjectMediaProps = {
  project: Project;
  lang: Lang;
  index?: number;
  sizes: string;
  priority?: boolean;
  decorative?: boolean;
};

export function ProjectMedia({
  project,
  lang,
  index = 0,
  sizes,
  priority = false,
  decorative = false,
}: ProjectMediaProps) {
  const t = getT(lang);
  const src = project.images[index];

  if (!src) {
    return (
      <div className="hatch flex size-full flex-col items-center justify-center gap-3 p-6 text-center text-ink-3">
        <span className="bg-paper-2 px-3 py-1 text-[clamp(1.25rem,3vw,2rem)] font-medium tracking-[-0.03em] text-ink-2">
          {project.title}
        </span>
        <span className="an bg-paper-2 px-2 py-0.5">
          {t(
            project.status === "planned"
              ? "project.placeholder.planned"
              : "project.placeholder.none",
          )}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={`projects/${src}`}
      alt={decorative ? "" : imageAlt(project, index, lang)}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover object-top transition-[scale] duration-1000 ease-settle group-hover:scale-[1.015]"
    />
  );
}

export function imageAlt(project: Project, index: number, lang: Lang): string {
  return getT(lang)("project.imageNumbered", {
    n: index + 1,
    total: project.images.length,
    title: project.title,
  });
}
