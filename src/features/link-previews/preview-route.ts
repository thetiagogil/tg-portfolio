import { projectBySlug } from "@/content";
import { LANGS, type Lang } from "@/content/types";
import { ogImages } from "@/lib/og";
import { projectPreview } from "./project-preview";
import { sitePreview } from "./site-preview";

type PreviewParams = { params: Promise<{ image: string }> };

export function previewStaticParams() {
  return ogImages().map((image) => ({ image }));
}

/** Draws the file named in the URL: "en.png" for the site, "voydex-pt.png" for a project. */
export async function previewImage(_request: Request, { params }: PreviewParams) {
  const [, slug, lang] = (await params).image.match(/^(?:(.+)-)?(en|pt)\.png$/) ?? [];

  if (!isLang(lang)) return new Response("Not found", { status: 404 });

  const project = slug ? projectBySlug(slug) : undefined;

  return project ? projectPreview(project, lang) : sitePreview(lang);
}

function isLang(value: string | undefined): value is Lang {
  return LANGS.includes(value as Lang);
}
