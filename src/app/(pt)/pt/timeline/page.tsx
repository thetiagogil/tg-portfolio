import { TimelinePage } from "@/features/timeline/timeline-page";
import { sectionMetadata } from "@/lib/metadata";

export const metadata = sectionMetadata("pt", "timeline", "timeline.subtitle");

export default function Page() {
  return <TimelinePage lang="pt" />;
}
