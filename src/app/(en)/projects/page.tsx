import { ProjectsPage } from "@/features/projects/ProjectsPage";
import { projectsMetadata } from "@/lib/pages";

export const metadata = projectsMetadata("en");
export default function Page() {
  return <ProjectsPage lang="en" />;
}
