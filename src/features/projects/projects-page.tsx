import { Band } from "@/components/ui/band";
import { PageHead } from "@/components/ui/page-head";
import { projects } from "@/content";
import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";
import { ProjectGrid } from "./project-grid";

type ProjectsPageProps = {
  lang: Lang;
};

export function ProjectsPage({ lang }: ProjectsPageProps) {
  const t = getT(lang);
  return (
    <>
      <Band>
        <PageHead
          eyebrow={t("nav.projects")}
          title={t("projects.title")}
          intro={t("projects.intro")}
        />
      </Band>
      <Band>
        <div className="wrap">
          <ProjectGrid projects={projects} lang={lang} />
        </div>
      </Band>
    </>
  );
}
