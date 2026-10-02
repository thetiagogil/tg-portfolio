import { Dim } from "@/components/entries/dim";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Icon } from "@/components/ui/icon";
import { Rise } from "@/components/ui/rise";
import type { Lang, RecordEntry } from "@/content/types";
import { cn } from "@/lib/cn";
import { duration, endLabel, monthYear } from "@/lib/dates";
import { getT, localize } from "@/lib/i18n";
import { delay } from "@/lib/motion";

type RecordHeaderProps = {
  record: RecordEntry;
  lang: Lang;
};

const ORG_LINK =
  "inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-accent-ink";

export function RecordHeader({ record, lang }: RecordHeaderProps) {
  const t = getT(lang);
  const ongoing = record.dateEnd === null;

  return (
    <header className="wrap">
      <Breadcrumb
        lang={lang}
        parent={{ href: localize(lang, "/timeline"), label: t("nav.timeline") }}
        current={t(`section.${record.kind}`)}
      />

      <div className="page-grid mt-6 gap-y-10">
        <div className="col-span-full md:col-span-5 lg:col-span-8">
          <h1 className="title">
            <Rise delay={60}>{record.title[lang]}</Rise>
          </h1>

          <p
            className="lead fade text-ink-2 mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2"
            style={delay(220)}
          >
            {record.link ? (
              <a className={ORG_LINK} href={record.link} target="_blank" rel="noreferrer">
                {record.org[lang]}
                <Icon name="out" className="size-3.5" />
              </a>
            ) : (
              record.org[lang]
            )}

            {record.documents?.map((document) => (
              <a
                key={document.href}
                className={cn(ORG_LINK, "text-[0.9375rem]")}
                href={document.href}
                target="_blank"
                rel="noreferrer"
              >
                {document.label[lang]}
                <Icon name="dl" className="size-3.5" />
              </a>
            ))}
          </p>
        </div>

        <div className="fade col-span-full self-end md:col-span-3 lg:col-span-4" style={delay(320)}>
          <p className="an text-ink-3">{t("record.duration")}</p>
          <Dim
            label={duration(record.dateStart, record.dateEnd, lang)}
            open={ongoing}
            className={cn("mt-8", ongoing ? "text-accent-ink" : "text-ink-2")}
            labelClassName={ongoing ? "text-accent-ink" : "text-ink"}
          />
          <p className="an text-ink-2 mt-3 flex justify-between gap-4">
            <span>{monthYear(record.dateStart, lang)}</span>
            <span>{endLabel(record.dateEnd, lang)}</span>
          </p>
        </div>
      </div>
    </header>
  );
}
