import { Band } from "@/components/ui/Band";
import { PageHead } from "@/components/ui/PageHead";
import { projects } from "@/content";
import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";
import { ProjectGrid } from "./ProjectGrid";

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
