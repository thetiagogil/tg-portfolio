import { certifications, degrees, projects, roles, TOOL_GROUPS, TOOLS } from "@/content";
import type { ToolGroup, ToolId } from "@/content/stack";
import type { Certification, ISODate, Lang, Project, RecordEntry } from "@/content/types";
import { duration, endLabel, monthYear, year } from "@/lib/dates";
import { projectHref, recordHref } from "@/lib/entries";
import { getT } from "@/lib/i18n";
import type { TimelineItem } from "./timeline-filters";

export type StackGroup = {
  group: ToolGroup;
  tools: { id: ToolId; name: string }[];
};

export function timelineItems(lang: Lang): TimelineItem[] {
  return [
    ...[...roles, ...degrees].map((record) => recordItem(record, lang)),
    ...projects.map((project) => projectItem(project, lang)),
    ...certifications.map((certification) => certificationItem(certification, lang)),
  ];
}

export function stackGroups(items: TimelineItem[]): StackGroup[] {
  const used = new Set(items.flatMap((item) => item.techs));

  return TOOL_GROUPS.map((group) => ({
    group,
    tools: (Object.keys(TOOLS) as ToolId[])
      .filter((id) => used.has(id) && TOOLS[id].group === group)
      .map((id) => ({ id, name: TOOLS[id].name }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  })).filter((option) => option.tools.length > 0);
}

function recordItem(record: RecordEntry, lang: Lang): TimelineItem {
  const t = getT(lang);
  const category = record.kind;
  const endYear = record.dateEnd === null ? new Date().getUTCFullYear() : year(record.dateEnd);

  return {
    key: `${record.kind}/${record.slug}`,
    category,
    title: record.title[lang],
    org: record.org[lang],
    summary: record.summary[lang],
    dateStart: record.dateStart,
    dateEnd: record.dateEnd,
    year: year(record.dateStart),
    dates: dates(record.dateStart, record.dateEnd, lang),
    techs: record.techs,
    href: recordHref(lang, record),
    search: searchText(
      record.title[lang],
      record.org[lang],
      record.summary[lang],
      t(`section.${category}`),
      year(record.dateStart),
      endYear,
      toolNames(record.techs),
    ),
  };
}

function projectItem(project: Project, lang: Lang): TimelineItem {
  const t = getT(lang);

  return {
    key: `projects/${project.slug}`,
    category: "projects",
    title: project.title,
    summary: project.summary[lang],
    dateStart: project.dateStart,
    dateEnd: project.dateEnd,
    year: year(project.dateStart),
    dates: dates(project.dateStart, project.dateEnd, lang),
    techs: project.techs,
    status: project.status,
    type: project.type,
    href: projectHref(lang, project),
    search: searchText(
      project.title,
      project.subtitle[lang],
      project.summary[lang],
      t("section.projects"),
      t(`status.${project.status}`),
      t(`project.type.${project.type}`),
      year(project.dateStart),
      toolNames(project.techs),
    ),
  };
}

function certificationItem(certification: Certification, lang: Lang): TimelineItem {
  const t = getT(lang);

  return {
    key: `certifications/${certification.slug}`,
    category: "certifications",
    title: certification.title,
    org: certification.org,
    summary: certification.summary[lang],
    dateStart: certification.dateStart,
    year: year(certification.dateStart),
    dates: dates(certification.dateStart, undefined, lang),
    techs: certification.techs,
    external: certification.link,
    search: searchText(
      certification.title,
      certification.org,
      certification.summary[lang],
      t("section.certifications"),
      year(certification.dateStart),
      toolNames(certification.techs),
    ),
  };
}

function dates(start: ISODate, end: ISODate | null | undefined, lang: Lang): TimelineItem["dates"] {
  if (end === undefined) return { start: monthYear(start, lang) };

  return {
    start: monthYear(start, lang),
    end: endLabel(end, lang),
    duration: duration(start, end, lang),
  };
}

function searchText(...parts: (string | number)[]): string {
  return parts.join(" ").toLowerCase();
}

function toolNames(techs: ToolId[]): string {
  return techs.map((id) => TOOLS[id].name).join(" ");
}
