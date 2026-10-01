import { notFound } from "next/navigation";
import { degreeBySlug, degrees } from "@/content";
import { RecordPage } from "@/features/records/RecordPage";
import { recordMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return degrees.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const record = degreeBySlug((await params).slug);
  return record ? recordMetadata("pt", record) : {};
}

export default async function Page({ params }: Props) {
  const record = degreeBySlug((await params).slug);
  if (!record) notFound();
  return <RecordPage record={record} lang="pt" />;
}
