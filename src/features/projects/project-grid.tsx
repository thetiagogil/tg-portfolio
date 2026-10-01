"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/entries/project-card";
import { type Lang, type Project, PROJECT_TYPES, type ProjectType } from "@/content/types";
import { cn } from "@/lib/cn";
import { getT } from "@/lib/i18n";

type ProjectGridProps = {
  projects: Project[];
  lang: Lang;
};

type Tab = ProjectType | "all";

/** Tabs All / Client / Personal / Learning (with counts and a one-line hint), then the cards, newest first. */
export function ProjectGrid({ projects, lang }: ProjectGridProps) {
  const t = getT(lang);
  const [tab, setTab] = useState<Tab>("all");
  const ofType = (type: Tab) =>
    type === "all" ? projects : projects.filter((project) => project.type === type);
  const tabs = (["all", ...PROJECT_TYPES] as const).filter((type) => ofType(type).length > 0);

  return (
    <>
      <div className="ptabs-row">
        <div className="tabs" role="group" aria-label={t("projects.filterLabel")}>
          {tabs.map((type) => (
            <button
              key={type}
              type="button"
              className={cn(tab === type && "on")}
              aria-pressed={tab === type}
              onClick={() => setTab(type)}
            >
              {type === "all" ? t("common.all") : t(`project.type.${type}`)}
              <span className="an num">{ofType(type).length}</span>
            </button>
          ))}
        </div>
        {tab !== "all" && <p className="an ptype-hint">{t(`projects.typeHint.${tab}`)}</p>}
      </div>
      <ul className="cards">
        {ofType(tab).map((project) => (
          <li key={project.slug}>
            <ProjectCard
              project={project}
              lang={lang}
              heading="h2"
              sizes="(min-width: 48rem) 45vw, 100vw"
            />
          </li>
        ))}
      </ul>
    </>
  );
}
