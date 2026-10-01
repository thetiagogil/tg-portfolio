import Image from "next/image";
import type { Lang, Project } from "@/content/types";
import { fill } from "@/lib/format";
import { getT } from "@/lib/i18n";

/** A project's image (index 0 is the cover), or hatching when it has none yet. */
export function ProjectMedia({
  project,
  lang,
  index = 0,
  sizes,
  priority = false,
}: {
  project: Project;
  lang: Lang;
  index?: number;
  /** How wide the image shows, for picking the right file. */
  sizes: string;
  priority?: boolean;
}) {
  const t = getT(lang);
  const src = project.images[index];
  if (!src)
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
  return (
    <Image
      src={`projects/${src}`}
      alt={fill(t("project.imageNumbered"), {
        n: index + 1,
        total: project.images.length,
        title: project.title,
      })}
      fill
      sizes={sizes}
      priority={priority}
    />
  );
}
