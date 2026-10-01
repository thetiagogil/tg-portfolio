import Link from "next/link";
import type { Lang, Paragraph } from "@/content/types";
import { localize } from "@/lib/i18n";
import { refPath } from "@/lib/entries";

/** Paragraphs of plain text with links to other entries. */
export function RichText({
  paragraphs,
  lang,
  className,
}: {
  paragraphs: Paragraph[];
  lang: Lang;
  className: string;
}) {
  return paragraphs.map((para, i) => (
    <p key={i} className={className}>
      {para.map((seg, j) =>
        typeof seg === "string" ? (
          seg
        ) : (
          <Link
            key={j}
            className="lk text-ink"
            href={localize(lang, refPath(seg.to))}
          >
            {seg.text}
          </Link>
        ),
      )}
    </p>
  ));
}
