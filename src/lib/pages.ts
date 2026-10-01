// Metadata for the top-level pages, shared by the English and Portuguese routes.
import type { Degree, Lang, Project, Role } from "@/content/types";
import { projectPath, recordPath } from "./entries";
import { getT } from "./i18n";
import { pageMetadata } from "./seo";

export const homeMetadata = (lang: Lang) =>
  pageMetadata({ lang, path: "/", description: getT(lang)("home.hero.lead") });
export const projectsMetadata = (lang: Lang) =>
  pageMetadata({
    lang,
    path: "/projects",
    title: getT(lang)("nav.projects"),
    description: getT(lang)("projects.intro"),
  });
export const timelineMetadata = (lang: Lang) =>
  pageMetadata({
    lang,
    path: "/timeline",
    title: getT(lang)("nav.timeline"),
    description: getT(lang)("timeline.subtitle"),
  });
export const aboutMetadata = (lang: Lang) =>
  pageMetadata({
    lang,
    path: "/about",
    title: getT(lang)("nav.about"),
    description: getT(lang)("about.intro"),
  });

export const projectMetadata = (lang: Lang, p: Project) =>
  pageMetadata({
    lang,
    path: projectPath(p),
    title: p.title,
    description: p.summary[lang],
  });
export const recordMetadata = (lang: Lang, r: Role | Degree) =>
  pageMetadata({
    lang,
    path: recordPath(r),
    title: `${r.title[lang]} · ${r.org[lang]}`,
    description: r.summary[lang],
  });
