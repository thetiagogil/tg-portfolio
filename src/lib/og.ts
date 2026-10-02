import { projects } from "@/content";
import { LANGS, type Lang } from "@/content/types";

export function ogImages(): string[] {
  return [
    ...LANGS.map((lang) => `${lang}.png`),
    ...projects.flatMap((project) => LANGS.map((lang) => `${project.slug}-${lang}.png`)),
  ];
}

export function ogImagePath(lang: Lang, projectSlug?: string): string {
  return projectSlug ? `/og/${projectSlug}-${lang}.png` : `/og/${lang}.png`;
}
