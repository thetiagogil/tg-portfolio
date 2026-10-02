import { ArrowLink } from "@/components/ui/arrow-link";
import { Section } from "@/components/ui/section";
import { degreeBySlug, roleBySlug, roles } from "@/content";
import type { Lang, RecordEntry } from "@/content/types";
import { recordHref } from "@/lib/entries";
import { getT, localize } from "@/lib/i18n";
import { yearSpan } from "./about-utils";

type StoryProps = {
  lang: Lang;
};

type Chapter = {
  key: "school" | "practice" | "transition" | "software";
  records: RecordEntry[];
  body: string;
};

export function Story({ lang }: StoryProps) {
  const t = getT(lang);

  const faul = degreeBySlug("faul")!;
  const architect = roleBySlug("crespassos")!;
  const ironhack = degreeBySlug("ironhack")!;
  const softwareRoles = roles.filter((role) => role !== architect).reverse();

  const chapters: Chapter[] = [
    { key: "school", records: [faul], body: faul.summary[lang] },
    { key: "practice", records: [architect], body: architect.summary[lang] },
    { key: "transition", records: [ironhack], body: ironhack.summary[lang] },
    { key: "software", records: softwareRoles, body: t("about.story.software.body") },
  ];

  return (
    <Section
      title={t("about.story.title")}
      action={<ArrowLink href={localize(lang, "/timeline")}>{t("common.fullTimeline")}</ArrowLink>}
    >
      <ol className="border-line border-b">
        {chapters.map((chapter) => (
          <li
            key={chapter.key}
            className="page-grid border-line gap-y-4 border-t px-(--row-pad) py-10"
            data-reveal
          >
            <p className="an text-ink-3 col-span-full lg:col-span-3">
              {yearSpan(chapter.records, lang)}
            </p>
            <h3 className="subheading col-span-full md:col-span-3 lg:col-span-4">
              {t(`about.story.${chapter.key}.title`)}
            </h3>
            <div className="col-span-full md:col-span-5 lg:col-span-5">
              <p className="text-ink-2">{chapter.body}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {chapter.records.map((record) => (
                  <ArrowLink
                    key={record.slug}
                    href={recordHref(lang, record)}
                    className="text-[0.875rem]"
                  >
                    {record.org[lang]}
                  </ArrowLink>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
