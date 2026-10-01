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
}: {
  lang: Lang;
  /** The shared path, e.g. "/projects". */
  path: string;
  /** Omit on Home to use the site name alone. */
  title?: string;
  description: string;
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
  },
});
