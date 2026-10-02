// Link previews (Open Graph images) are plain PNG files with stable names, drawn at build time by app/og.
import { projects } from "@/content";
import { LANGS, type Lang } from "@/content/types";

/** Every preview file: "en.png", "pt.png", and "<project>-<lang>.png". */
export function ogImages(): string[] {
  return [
    ...LANGS.map((lang) => `${lang}.png`),
    ...projects.flatMap((project) => LANGS.map((lang) => `${project.slug}-${lang}.png`)),
  ];
}

export function ogImagePath(lang: Lang, projectSlug?: string): string {
  return projectSlug ? `/og/${projectSlug}-${lang}.png` : `/og/${lang}.png`;
}
