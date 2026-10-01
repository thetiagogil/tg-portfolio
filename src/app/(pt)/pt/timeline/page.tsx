import { TimelinePage } from "@/features/timeline/TimelinePage";
import { timelineMetadata } from "@/lib/pages";

export const metadata = timelineMetadata("pt");
export default function Page() {
  return <TimelinePage lang="pt" />;
}
