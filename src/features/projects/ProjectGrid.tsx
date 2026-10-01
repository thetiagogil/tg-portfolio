"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import type { Lang, Project, ProjectType } from "@/content/types";
import { cn } from "@/lib/cn";
import { getT } from "@/lib/i18n";

const TYPES: ProjectType[] = ["client", "personal", "learning"];

/** Tabs All / Client / Personal / Learning (with counts and a one-line hint), and the cards, newest first. */
export function ProjectGrid({
  projects,
  lang,
}: {
  projects: Project[];
  lang: Lang;
}) {
  const t = getT(lang);
  const [type, setType] = useState<ProjectType | "all">("all");
  const tabs = [
    { value: "all" as const, label: t("timeline.all"), count: projects.length },
    ...TYPES.map((v) => ({
      value: v,
      label: t(`project.type.${v}`),
      count: projects.filter((p) => p.type === v).length,
    })),
  ].filter((tab) => tab.count > 0);
  const list =
    type === "all" ? projects : projects.filter((p) => p.type === type);

  return (
    <>
      <div className="ptabs-row">
        <div
          className="tabs"
          role="group"
          aria-label={t("projects.filterLabel")}
        >
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              className={cn(type === tab.value && "on")}
              aria-pressed={type === tab.value}
              onClick={() => setType(tab.value)}
            >
              {tab.label}
              <span className="an num">{tab.count}</span>
            </button>
          ))}
        </div>
        {type !== "all" && (
          <p className="an ptype-hint">{t(`projects.typeHint.${type}`)}</p>
        )}
      </div>
      <ul className="cards">
        {list.map((p) => (
          <li key={p.slug}>
            <ProjectCard
              heading="h2"
              project={p}
              lang={lang}
              sizes="(min-width: 48rem) 45vw, 100vw"
            />
          </li>
        ))}
      </ul>
    </>
  );
}
