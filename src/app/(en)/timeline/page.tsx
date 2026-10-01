import { TimelinePage } from "@/features/timeline/TimelinePage";
import { sectionMetadata } from "@/lib/metadata";

export const metadata = sectionMetadata("en", "timeline", "timeline.subtitle");

export default function Page() {
  return <TimelinePage lang="en" />;
}
