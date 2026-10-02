import type { Metadata, Viewport } from "next";
import type { Lang, Project, RecordEntry } from "@/content/types";
import { OG_IMAGE_SIZE, PAPER, SITE_NAME, SITE_URL } from "./constants";
import { projectPath, recordPath } from "./entries";
import { getT, HTML_LANG, localize, type UiKey } from "./i18n";
import { ogImagePath } from "./og";

type PageMetadata = {
  lang: Lang;
  path: string;
  title?: string;
  description: string;
  image: string;
};

export const SITE_VIEWPORT: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: PAPER.light },
    { media: "(prefers-color-scheme: dark)", color: PAPER.dark },
  ],
};

export const NOT_FOUND_METADATA: Metadata = { title: "404", robots: { index: false } };

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
      images: [{ url: image, ...OG_IMAGE_SIZE, alt: title ?? SITE_NAME }],
    },
    twitter: { card: "summary_large_image", images: [image] },
  };
}
