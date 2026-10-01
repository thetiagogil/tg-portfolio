import { ProjectsPage } from "@/features/projects/ProjectsPage";
import { projectsMetadata } from "@/lib/pages";

export const metadata = projectsMetadata("pt");
export default function Page() {
  return <ProjectsPage lang="pt" />;
}
