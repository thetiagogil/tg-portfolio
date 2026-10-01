import type { MetadataRoute } from "next";
import { degrees, projects, roles } from "@/content";
import { projectPath, recordPath } from "@/lib/entries";
import { HTML_LANG, localize } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";

// Built with the site: every page in English, each pointing to its Portuguese version (and back).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/projects",
    "/timeline",
    "/about",
    ...projects.map(projectPath),
    ...[...roles, ...degrees].map(recordPath),
  ];
  const lastModified = new Date();
  return paths.flatMap((path) => {
    const languages = {
      [HTML_LANG.en]: `${SITE_URL}${localize("en", path) === "/" ? "" : localize("en", path)}`,
      [HTML_LANG.pt]: `${SITE_URL}${localize("pt", path)}`,
    };
    return [
      { url: languages[HTML_LANG.en], lastModified, alternates: { languages } },
      { url: languages[HTML_LANG.pt], lastModified, alternates: { languages } },
    ];
  });
}
