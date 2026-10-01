// Metadata for every page, shared by the English and Portuguese routes.
import type { Degree, Lang, Project, Role } from "@/content/types";
import { projectPath, recordPath } from "./entries";
import { getT } from "./i18n";
import { ogImagePath } from "./og";
import { pageMetadata } from "./seo";

export const homeMetadata = (lang: Lang) =>
  pageMetadata({
    lang,
    path: "/",
    description: getT(lang)("home.hero.lead"),
    image: ogImagePath(lang),
  });

const section =
  (key: "projects" | "timeline" | "about", description: string) =>
  (lang: Lang) =>
    pageMetadata({
      lang,
      path: `/${key}`,
      title: getT(lang)(`nav.${key}`),
      description: getT(lang)(
        description as Parameters<ReturnType<typeof getT>>[0],
      ),
      image: ogImagePath(lang),
    });

export const projectsMetadata = section("projects", "projects.intro");
export const timelineMetadata = section("timeline", "timeline.subtitle");
export const aboutMetadata = section("about", "about.intro");

export const projectMetadata = (lang: Lang, p: Project) =>
  pageMetadata({
    lang,
    path: projectPath(p),
    title: p.title,
    description: p.summary[lang],
    image: ogImagePath(lang, p.slug),
  });

export const recordMetadata = (lang: Lang, r: Role | Degree) =>
  pageMetadata({
    lang,
    path: recordPath(r),
    title: `${r.title[lang]} · ${r.org[lang]}`,
    description: r.summary[lang],
    image: ogImagePath(lang),
  });
