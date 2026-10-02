import { RecordPage } from "@/features/records/record-page";
import { recordRouteMetadata, recordStaticParams } from "@/features/records/record-route";
import type { EntryRouteProps } from "@/lib/entries";

export const dynamicParams = false;
export const generateStaticParams = recordStaticParams("education");
export const generateMetadata = recordRouteMetadata("education", "en");

export default async function Page({ params }: EntryRouteProps) {
  return <RecordPage kind="education" slug={(await params).slug} lang="en" />;
}
