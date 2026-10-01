import { AboutPage } from "@/features/about/AboutPage";
import { sectionMetadata } from "@/lib/metadata";

export const metadata = sectionMetadata("en", "about", "about.intro");

export default function Page() {
  return <AboutPage lang="en" />;
}
