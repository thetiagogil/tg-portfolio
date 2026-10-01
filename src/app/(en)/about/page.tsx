import { AboutPage } from "@/features/about/AboutPage";
import { aboutMetadata } from "@/lib/pages";

export const metadata = aboutMetadata("en");
export default function Page() {
  return <AboutPage lang="en" />;
}
