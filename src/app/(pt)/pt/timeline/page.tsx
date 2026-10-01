import { TimelinePage } from "@/features/timeline/TimelinePage";
import { sectionMetadata } from "@/lib/metadata";

export const metadata = sectionMetadata("pt", "timeline", "timeline.subtitle");

export default function Page() {
  return <TimelinePage lang="pt" />;
}
