import { RecordPage } from "@/features/records/record-page";
import { recordRouteMetadata, recordStaticParams } from "@/features/records/record-route";
import type { EntryRouteProps } from "@/lib/entries";

export const dynamicParams = false;
export const generateStaticParams = recordStaticParams("experience");
export const generateMetadata = recordRouteMetadata("experience", "pt");

export default async function Page({ params }: EntryRouteProps) {
  return <RecordPage kind="experience" slug={(await params).slug} lang="pt" />;
}
