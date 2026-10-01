import { AboutPage } from "@/features/about/AboutPage";
import { aboutMetadata } from "@/lib/pages";

export const metadata = aboutMetadata("pt");
export default function Page() {
  return <AboutPage lang="pt" />;
}
