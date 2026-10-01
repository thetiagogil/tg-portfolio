import { Dim } from "@/components/entries/Dim";
import { Pager, type PagerLink } from "@/components/entries/Pager";
import { Part } from "@/components/entries/Part";
import { ProjectCard } from "@/components/entries/ProjectCard";
import { RichText } from "@/components/entries/RichText";
import { StackLine, StackRow } from "@/components/entries/Stack";
import { Band } from "@/components/ui/Band";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Icon } from "@/components/ui/Icon";
import { Rise } from "@/components/ui/Rise";
import { SmartLink } from "@/components/ui/SmartLink";
import { projectBySlug } from "@/content";
import type { Lang, Product, RecordEntry } from "@/content/types";
import { duration, endLabel, monthYear } from "@/lib/dates";
import { recordHref, recordNeighbours } from "@/lib/entries";
import { getT, localize } from "@/lib/i18n";
import { delay } from "@/lib/motion";

type RecordPageProps = {
  record: RecordEntry;
  lang: Lang;
};

/** A role (experience) or degree (education) page. */
export function RecordPage({ record, lang }: RecordPageProps) {
  const t = getT(lang);
  const { prev, next } = recordNeighbours(record);
  const projects = (record.projects ?? []).map(projectBySlug).filter((project) => !!project);
  const pagerLink = (other: RecordEntry): PagerLink => ({
    href: recordHref(lang, other),
    title: other.org[lang],
    sub: other.title[lang],
  });

  return (
    <article>
      <Band>
        <RecordHeader record={record} lang={lang} />
      </Band>

      <Band>
        <Part label={t("record.overview")} className="p-brief record-part">
          <RichText paragraphs={record.overview[lang]} lang={lang} className="read" />
          <StackRow techs={record.techs} lang={lang} />
        </Part>
        <Part label={t("record.scope")} className="record-part">
          <ul className="scope">
            {record.scope.map((point) => (
              <li key={point.title.en}>
                <h3 className="subheading">{point.title[lang]}</h3>
                <p>{point.text[lang]}</p>
              </li>
            ))}
          </ul>
        </Part>
        {record.products && (
          <Part
            label={t(record.kind === "experience" ? "record.products" : "record.highlights")}
            className="record-part"
          >
            <ul className="prods">
              {record.products.map((product) => (
                <li key={product.label.en}>
                  <ProductItem product={product} lang={lang} />
                </li>
              ))}
            </ul>
          </Part>
        )}
        {projects.length > 0 && (
          <Part label={t("record.projects")} width="grid">
            <ul className="cards three">
              {projects.map((project) => (
                <li key={project.slug}>
                  <ProjectCard
                    project={project}
                    lang={lang}
                    sizes="(min-width: 64rem) 22vw, (min-width: 48rem) 45vw, 100vw"
                  />
                </li>
              ))}
            </ul>
          </Part>
        )}
      </Band>

      <Pager prev={prev && pagerLink(prev)} next={pagerLink(next)} lang={lang} />
    </article>
  );
}

function RecordHeader({ record, lang }: RecordPageProps) {
  const t = getT(lang);
  const ongoing = record.dateEnd === null;

  return (
    <header className="wrap">
      <Breadcrumb
        lang={lang}
        parent={{ href: localize(lang, "/timeline"), label: t("nav.timeline") }}
        current={t(`section.${record.kind}`)}
      />
      <div className="page-grid r-title">
        <div className="col-span-full md:col-span-5 lg:col-span-8">
          <h1 className="title">
            <Rise delay={60}>{record.title[lang]}</Rise>
          </h1>
          <p className="lead sub fade r-org" style={delay(220)}>
            {record.link ? (
              <a className="tl-link" href={record.link} target="_blank" rel="noreferrer">
                {record.org[lang]}
                <Icon name="out" />
              </a>
            ) : (
              record.org[lang]
            )}
            {record.documents?.map((document) => (
              <a
                key={document.href}
                className="tl-link r-doc"
                href={document.href}
                target="_blank"
                rel="noreferrer"
              >
                {document.label[lang]}
                <Icon name="dl" />
              </a>
            ))}
          </p>
        </div>
        <div
          className="dur fade col-span-full self-end md:col-span-3 lg:col-span-4"
          style={delay(320)}
        >
          <p className="an">{t("record.duration")}</p>
          <Dim
            label={duration(record.dateStart, record.dateEnd, lang)}
            open={ongoing}
            className={ongoing ? "text-accent-ink" : "text-ink-2"}
            labelClassName={ongoing ? "text-accent-ink" : "text-ink"}
          />
          <p className="an ends">
            <span>{monthYear(record.dateStart, lang)}</span>
            <span>{endLabel(record.dateEnd, lang)}</span>
          </p>
        </div>
      </div>
    </header>
  );
}

/** A product or highlight: a link when it has one (a site opens out, a PDF downloads). */
function ProductItem({ product, lang }: { product: Product; lang: Lang }) {
  const body = (
    <>
      <h3 className="subheading">
        {product.label[lang]}
        {product.href && <Icon name={/^https?:/.test(product.href) ? "out" : "dl"} />}
      </h3>
      <p>{product.description[lang]}</p>
      <StackLine techs={product.techs} />
    </>
  );
  return product.href ? <SmartLink href={product.href}>{body}</SmartLink> : body;
}
