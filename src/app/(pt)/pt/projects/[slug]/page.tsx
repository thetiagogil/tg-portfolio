import { ProjectPage } from "@/features/projects/project-page";
import { projectRouteMetadata, projectStaticParams } from "@/features/projects/project-route";
import type { EntryRouteProps } from "@/lib/entries";

export const dynamicParams = false;
export const generateStaticParams = projectStaticParams;
export const generateMetadata = projectRouteMetadata("pt");

export default async function Page({ params }: EntryRouteProps) {
  return <ProjectPage slug={(await params).slug} lang="pt" />;
}
