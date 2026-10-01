import { ProjectsPage } from "@/features/projects/ProjectsPage";
import { sectionMetadata } from "@/lib/metadata";

export const metadata = sectionMetadata("pt", "projects", "projects.intro");

export default function Page() {
  return <ProjectsPage lang="pt" />;
}
