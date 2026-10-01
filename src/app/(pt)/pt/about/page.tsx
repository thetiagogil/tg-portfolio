import { AboutPage } from "@/features/about/AboutPage";
import { sectionMetadata } from "@/lib/metadata";

export const metadata = sectionMetadata("pt", "about", "about.intro");

export default function Page() {
  return <AboutPage lang="pt" />;
}
