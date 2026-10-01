import { notFound } from "next/navigation";
import { roleBySlug, roles } from "@/content";
import { RecordPage } from "@/features/records/record-page";
import { recordMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return roles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const record = roleBySlug((await params).slug);
  return record ? recordMetadata("pt", record) : {};
}

export default async function Page({ params }: Props) {
  const record = roleBySlug((await params).slug);
  if (!record) notFound();
  return <RecordPage record={record} lang="pt" />;
}
