import type { MetadataRoute } from "next";
import { degrees, projects, roles } from "@/content";
import { projectPath, recordPath } from "@/lib/entries";
import { HTML_LANG, localize } from "@/lib/i18n";
import { SITE_URL } from "@/lib/metadata";

// Built with the site: every page in both languages, each pointing to the other.
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
      [HTML_LANG.en]: absoluteUrl(localize("en", path)),
      [HTML_LANG.pt]: absoluteUrl(localize("pt", path)),
    };
    return Object.values(languages).map((url) => ({
      url,
      lastModified,
      alternates: { languages },
    }));
  });
}

function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}
