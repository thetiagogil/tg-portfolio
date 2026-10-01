import type { Metadata } from "next";
import type { Lang } from "@/content/types";
import { HTML_LANG, localize } from "./i18n";

export const SITE_URL = "https://thetiagogil.com";

/** Title, description, canonical URL and the other language's URL for one page. */
export const pageMetadata = ({
  lang,
  path,
  title,
  description,
  image,
}: {
  lang: Lang;
  /** The shared path, e.g. "/projects". */
  path: string;
  /** Omit on Home to use the site name alone. */
  title?: string;
  description: string;
  /** The link-preview image path (see lib/og.tsx). */
  image: string;
}): Metadata => ({
  ...(title ? { title } : {}),
  description,
  alternates: {
    canonical: localize(lang, path),
    languages: {
      [HTML_LANG.en]: localize("en", path),
      [HTML_LANG.pt]: localize("pt", path),
      "x-default": localize("en", path),
    },
  },
  openGraph: {
    type: "website",
    siteName: "Tiago Gil",
    locale: lang === "pt" ? "pt_PT" : "en_GB",
    url: localize(lang, path),
    ...(title ? { title } : {}),
    description,
    images: [
      { url: image, width: 1200, height: 630, alt: title ?? "Tiago Gil" },
    ],
  },
  twitter: { card: "summary_large_image", images: [image] },
});
