// Builds the Timeline's rows from the content, in one language (server side; the browser gets plain data).
import { certifications, degrees, projects, roles } from "@/content";
import {
  TOOLS,
  TOOL_GROUPS,
  type ToolGroup,
  type ToolId,
} from "@/content/stack";
import type { Lang } from "@/content/types";
import { formatDuration, monthsBetween, monthYear, year } from "./dates";
import { projectHref, recordHref } from "./entries";
import { getT } from "./i18n";
import type { TimelineItem } from "./timeline-filter";

export function timelineItems(lang: Lang): TimelineItem[] {
  const t = getT(lang);
  const words = {
    year: t("duration.year"),
    years: t("duration.years"),
    month: t("duration.month"),
    months: t("duration.months"),
  };
  const dates = (
    start: TimelineItem["dateStart"],
    end: TimelineItem["dateEnd"],
  ) => ({
    start: monthYear(start, lang),
    ...(end === null
      ? { end: t("timeline.present") }
      : end
        ? { end: monthYear(end, lang) }
        : {}),
    ...(end !== undefined
      ? { duration: formatDuration(monthsBetween(start, end), words) }
      : {}),
  });
  const search = (...parts: (string | number | undefined)[]) =>
    parts.filter(Boolean).join(" ").toLowerCase();
  const tools = (ids: ToolId[]) => ids.map((id) => TOOLS[id].name).join(" ");

  return [
    ...[...roles, ...degrees].map((r): TimelineItem => {
      const category = r.kind === "experience" ? "experience" : "education";
      return {
        key: `${r.kind}/${r.slug}`,
        category,
        title: r.title[lang],
        org: r.org[lang],
        summary: r.summary[lang],
        dateStart: r.dateStart,
        dateEnd: r.dateEnd,
        year: year(r.dateStart),
        dates: dates(r.dateStart, r.dateEnd),
        techs: r.techs,
        href: recordHref(lang, r),
        search: search(
          r.title[lang],
          r.org[lang],
          r.summary[lang],
          t(`section.${category}`),
          year(r.dateStart),
          r.dateEnd
            ? year(r.dateEnd)
            : r.dateEnd === null
              ? new Date().getUTCFullYear()
              : undefined,
          tools(r.techs),
        ),
      };
    }),
    ...projects.map((p): TimelineItem => ({
      key: `projects/${p.slug}`,
      category: "projects",
      title: p.title,
      summary: p.summary[lang],
      dateStart: p.dateStart,
      dateEnd: p.dateEnd,
      year: year(p.dateStart),
      dates: dates(p.dateStart, p.dateEnd),
      techs: p.techs,
      status: p.status,
      type: p.type,
      href: projectHref(lang, p),
      search: search(
        p.title,
        p.subtitle[lang],
        p.summary[lang],
        t("section.projects"),
        t(`status.${p.status}`),
        t(`project.type.${p.type}`),
        year(p.dateStart),
        tools(p.techs),
      ),
    })),
    ...certifications.map((c): TimelineItem => ({
      key: `certifications/${c.slug}`,
      category: "certifications",
      title: c.title,
      org: c.org,
      summary: c.summary[lang],
      dateStart: c.dateStart,
      year: year(c.dateStart),
      dates: dates(c.dateStart, undefined),
      techs: c.techs,
      external: c.link,
      search: search(
        c.title,
        c.org,
        c.summary[lang],
        t("section.certifications"),
        year(c.dateStart),
        tools(c.techs),
      ),
    })),
  ];
}

/** The stack options for the filters: every tool the Timeline uses, in its group, alphabetical. */
export function toolGroups(
  items: TimelineItem[],
): { group: ToolGroup; tools: { id: ToolId; name: string }[] }[] {
  const used = new Set(items.flatMap((it) => it.techs));
  return TOOL_GROUPS.map((group) => ({
    group,
    tools: (Object.keys(TOOLS) as ToolId[])
      .filter((id) => used.has(id) && TOOLS[id].group === group)
      .map((id) => ({ id, name: TOOLS[id].name }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  })).filter((g) => g.tools.length);
}
