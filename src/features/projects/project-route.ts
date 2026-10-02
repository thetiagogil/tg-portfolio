import { projectBySlug, projects } from "@/content";
import type { Lang } from "@/content/types";
import type { EntryRouteProps } from "@/lib/entries";
import { projectMetadata } from "@/lib/metadata";

export function projectStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export function projectRouteMetadata(lang: Lang) {
  return async ({ params }: EntryRouteProps) => {
    const project = projectBySlug((await params).slug);

    return project ? projectMetadata(lang, project) : {};
  };
}
