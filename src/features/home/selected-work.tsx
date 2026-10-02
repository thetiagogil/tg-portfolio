import { ProjectCard } from "@/components/entries/project-card";
import { ProjectCards } from "@/components/entries/project-cards";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Section } from "@/components/ui/section";
import { featuredProjects, projects } from "@/content";
import type { Lang } from "@/content/types";
import { getT, localize } from "@/lib/i18n";

type SelectedWorkProps = {
  lang: Lang;
};

export function SelectedWork({ lang }: SelectedWorkProps) {
  const t = getT(lang);

  return (
    <Section
      id="work"
      title={t("home.work.title")}
      action={
        <ArrowLink href={localize(lang, "/projects")}>
          {t("home.work.all")} ({projects.length})
        </ArrowLink>
      }
    >
      <ProjectCards three>
        {featuredProjects.map((project) => (
          <li key={project.slug} data-reveal>
            <ProjectCard
              project={project}
              lang={lang}
              sizes="(min-width: 64rem) 30vw, (min-width: 48rem) 45vw, 100vw"
            />
          </li>
        ))}
      </ProjectCards>
    </Section>
  );
}
