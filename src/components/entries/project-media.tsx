import Image from "next/image";
import type { Lang, Project } from "@/content/types";
import { getT } from "@/lib/i18n";

type ProjectMediaProps = {
  project: Project;
  lang: Lang;
  /** Which image; 0 is the cover. */
  index?: number;
  /** How wide the image shows, to pick the right file. */
  sizes: string;
  priority?: boolean;
  /** On cards the title link beside the image names the project, so the image needs no alt text. */
  decorative?: boolean;
};

/** A project's image, or hatching when it has none yet. */
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
      <div className="placeholder hatch">
        <span className="n">{project.title}</span>
        <span className="an">
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
    />
  );
}

/** "Screenshot 2 of 4 of Voydex". */
export function imageAlt(project: Project, index: number, lang: Lang): string {
  return getT(lang)("project.imageNumbered", {
    n: index + 1,
    total: project.images.length,
    title: project.title,
  });
}
