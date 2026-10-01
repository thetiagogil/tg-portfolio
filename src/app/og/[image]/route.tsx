import { projectBySlug } from "@/content";
import { LANGS, type Lang } from "@/content/types";
import { ogImages, projectOg, siteOg } from "@/lib/og";

// Link previews as plain PNG files with stable names (/og/en.png, /og/voydex-pt.png), built with the site.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return ogImages().map((image) => ({ image }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ image: string }> }) {
  const [, slug, lang] = (await params).image.match(/^(?:(.+)-)?(en|pt)\.png$/) ?? [];
  if (!isLang(lang)) return new Response("Not found", { status: 404 });
  const project = slug ? projectBySlug(slug) : undefined;
  return project ? projectOg(project, lang) : siteOg(lang);
}

function isLang(value: string | undefined): value is Lang {
  return LANGS.includes(value as Lang);
}
