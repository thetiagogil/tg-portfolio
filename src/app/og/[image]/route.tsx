import { projectBySlug } from "@/content";
import { LANGS, type Lang } from "@/content/types";
import { defaultOg, ogImages, projectOg } from "@/lib/og";

// Link previews as plain PNG files with stable names (/og/en.png, /og/voydex-pt.png), built with the site.
export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = () =>
  ogImages().map((image) => ({ image }));

export async function GET(
  _: Request,
  { params }: { params: Promise<{ image: string }> },
) {
  const [, name, lang] =
    (await params).image.match(/^(?:(.+)-)?(en|pt)\.png$/) ?? [];
  if (!LANGS.includes(lang as Lang))
    return new Response("Not found", { status: 404 });
  const project = name ? projectBySlug(name) : undefined;
  return project ? projectOg(project, lang as Lang) : defaultOg(lang as Lang);
}
