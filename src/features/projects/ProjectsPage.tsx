import { Band } from "@/components/Band";
import { PageHead } from "@/components/PageHead";
import { projects } from "@/content";
import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";
import { ProjectGrid } from "./ProjectGrid";

export function ProjectsPage({ lang }: { lang: Lang }) {
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
