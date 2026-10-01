import { TimelinePage } from "@/features/timeline/TimelinePage";
import { timelineMetadata } from "@/lib/pages";

export const metadata = timelineMetadata("en");
export default function Page() {
  return <TimelinePage lang="en" />;
}
