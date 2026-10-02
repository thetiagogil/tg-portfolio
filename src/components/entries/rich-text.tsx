import Link from "next/link";
import type { Lang, Paragraph } from "@/content/types";
import { refHref } from "@/lib/entries";

type RichTextProps = {
  paragraphs: Paragraph[];
  lang: Lang;
  /** The paragraphs' style: "lead" for a short brief, "read" for longer text. */
  className: string;
};

export function RichText({ paragraphs, lang, className }: RichTextProps) {
  return (
    <div className="space-y-5">
      {paragraphs.map((paragraph, i) => (
        <p key={i} className={className}>
          {paragraph.map((segment, j) =>
            typeof segment === "string" ? (
              segment
            ) : (
              <Link key={j} className="lk text-ink" href={refHref(lang, segment.to)}>
                {segment.text}
              </Link>
            ),
          )}
        </p>
      ))}
    </div>
  );
}
