import { degreeBySlug, degrees, roleBySlug, roles } from "@/content";
import type { Lang, RecordEntry } from "@/content/types";
import type { EntryRouteProps } from "@/lib/entries";
import { recordMetadata } from "@/lib/metadata";

type Kind = RecordEntry["kind"];

export function recordBySlug(kind: Kind, slug: string): RecordEntry | undefined {
  return kind === "experience" ? roleBySlug(slug) : degreeBySlug(slug);
}

export function recordStaticParams(kind: Kind) {
  return () => (kind === "experience" ? roles : degrees).map(({ slug }) => ({ slug }));
}

export function recordRouteMetadata(kind: Kind, lang: Lang) {
  return async ({ params }: EntryRouteProps) => {
    const record = recordBySlug(kind, (await params).slug);

    return record ? recordMetadata(lang, record) : {};
  };
}
