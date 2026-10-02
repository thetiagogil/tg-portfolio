import { LightboxTrigger } from "@/components/entries/lightbox-trigger";
import { imageAlt, ProjectMedia } from "@/components/entries/project-media";
import { Sheet } from "@/components/entries/sheet";
import type { Lang, Project } from "@/content/types";
import { getT } from "@/lib/i18n";

type ProjectImageProps = {
  project: Project;
  index: number;
  lang: Lang;
};

export function ProjectImage({ project, index, lang }: ProjectImageProps) {
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
