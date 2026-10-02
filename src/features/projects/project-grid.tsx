"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/entries/project-card";
import { ProjectCards } from "@/components/entries/project-cards";
import { Tab, Tabs } from "@/components/ui/tabs";
import { type Lang, type Project, PROJECT_TYPES, type ProjectType } from "@/content/types";
import { getT } from "@/lib/i18n";

type ProjectGridProps = {
  projects: Project[];
  lang: Lang;
};

type Filter = ProjectType | "all";

export function ProjectGrid({ projects, lang }: ProjectGridProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const t = getT(lang);
  const ofType = (type: Filter) =>
    type === "all" ? projects : projects.filter((project) => project.type === type);
  const filters = (["all", ...PROJECT_TYPES] as const).filter((type) => ofType(type).length > 0);

  return (
    <>
      <div className="border-line flex flex-col gap-4 border-b pb-2 md:flex-row md:items-end md:justify-between">
        <Tabs label={t("projects.filterLabel")}>
          {filters.map((type) => (
            <Tab
              key={type}
              label={type === "all" ? t("common.all") : t(`project.type.${type}`)}
              count={ofType(type).length}
              active={filter === type}
              onSelect={() => setFilter(type)}
            />
          ))}
        </Tabs>

        {filter !== "all" && (
          <p className="an text-ink-3 pb-3 md:max-w-[38ch] md:text-right">
            {t(`projects.typeHint.${filter}`)}
          </p>
        )}
      </div>

      <ProjectCards className="mt-12 md:mt-16">
        {ofType(filter).map((project) => (
          <li key={project.slug}>
            <ProjectCard
              project={project}
              lang={lang}
              heading="h2"
              sizes="(min-width: 48rem) 45vw, 100vw"
            />
          </li>
        ))}
      </ProjectCards>
    </>
  );
}
