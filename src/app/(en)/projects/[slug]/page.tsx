import { notFound } from "next/navigation";
import { projectBySlug, projects } from "@/content";
import { ProjectPage } from "@/features/projects/project-page";
import { projectMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const project = projectBySlug((await params).slug);
  return project ? projectMetadata("en", project) : {};
}

export default async function Page({ params }: Props) {
  const project = projectBySlug((await params).slug);
  if (!project) notFound();
  return <ProjectPage project={project} lang="en" />;
}
