// Page metadata: title, description, canonical URL, the other language's URL and the link preview.
import type { Metadata, Viewport } from "next";
import type { Lang, Project, RecordEntry } from "@/content/types";
import { projectPath, recordPath } from "./entries";
import { getT, HTML_LANG, localize, type UiKey } from "./i18n";
import { ogImagePath } from "./og";

export const SITE_URL = "https://thetiagogil.com";
const SITE_NAME = "Tiago Gil";

type PageMetadata = {
  lang: Lang;
  /** The shared path, e.g. "/projects". */
  path: string;
  /** Omitted on Home, which uses the site name alone. */
  title?: string;
  description: string;
  /** The link-preview image (see lib/og.tsx). */
  image: string;
};

/** The browser bar matches the paper in each theme. */
export const SITE_VIEWPORT: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1114" },
  ],
};

export function rootMetadata(lang: Lang): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
    description: getT(lang)("footer.note"),
  };
}

export function homeMetadata(lang: Lang): Metadata {
  return pageMetadata({
    lang,
    path: "/",
    description: getT(lang)("home.hero.lead"),
    image: ogImagePath(lang),
  });
}

export function sectionMetadata(
  lang: Lang,
  section: "projects" | "timeline" | "about",
  description: UiKey,
): Metadata {
  const t = getT(lang);
  return pageMetadata({
    lang,
    path: `/${section}`,
    title: t(`nav.${section}`),
    description: t(description),
    image: ogImagePath(lang),
  });
}

export function projectMetadata(lang: Lang, project: Project): Metadata {
  return pageMetadata({
    lang,
    path: projectPath(project),
    title: project.title,
    description: project.summary[lang],
    image: ogImagePath(lang, project.slug),
  });
}

export function recordMetadata(lang: Lang, record: RecordEntry): Metadata {
  return pageMetadata({
    lang,
    path: recordPath(record),
    title: `${record.title[lang]} · ${record.org[lang]}`,
    description: record.summary[lang],
    image: ogImagePath(lang),
  });
}

function pageMetadata({ lang, path, title, description, image }: PageMetadata): Metadata {
  const url = localize(lang, path);
  // Home has no title of its own: leaving the key out keeps the site name from the layout.
  return {
    ...(title && { title }),
    description,
    alternates: {
      canonical: url,
      languages: {
        [HTML_LANG.en]: localize("en", path),
        [HTML_LANG.pt]: localize("pt", path),
        "x-default": localize("en", path),
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: lang === "pt" ? "pt_PT" : "en_GB",
      url,
      ...(title && { title }),
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title ?? SITE_NAME }],
    },
    twitter: { card: "summary_large_image", images: [image] },
  };
}
