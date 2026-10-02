import Link from "next/link";
import { StatusMark } from "@/components/entries/status-mark";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Fact, Facts } from "@/components/ui/facts";
import { Rise } from "@/components/ui/rise";
import { recordsWithProject } from "@/content";
import type { Lang, Project } from "@/content/types";
import { monthYear } from "@/lib/dates";
import { recordHref } from "@/lib/entries";
import { getT, localize } from "@/lib/i18n";
import { delay } from "@/lib/motion";

type ProjectHeaderProps = {
  project: Project;
  lang: Lang;
};

export function ProjectHeader({ project, lang }: ProjectHeaderProps) {
  const t = getT(lang);
  const records = recordsWithProject(project.slug);
  const { site, repo } = project.links ?? {};

  return (
    <header className="wrap">
      <Breadcrumb
        lang={lang}
        parent={{ href: localize(lang, "/projects"), label: t("nav.projects") }}
        current={project.title}
      />

      <div className="page-grid mt-6 gap-y-8">
        <div className="col-span-full md:col-span-5 lg:col-span-8">
          <h1 className="title">
            <Rise delay={60}>{project.title}</Rise>
          </h1>
          <p className="lead fade text-ink-2 mt-5" style={delay(220)}>
            {project.subtitle[lang]}
          </p>
        </div>

        {(site || repo) && (
          <div
            className="fade col-span-full flex flex-wrap gap-3 md:col-span-3 md:justify-end md:self-end lg:col-span-4"
            style={delay(320)}
          >
            {site && (
              <Button href={site} icon="out">
                {t("project.visit")}
              </Button>
            )}
            {repo && (
              <Button href={repo} variant="outline" icon="out">
                {t("project.repo")}
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="fade" style={delay(360)}>
        <Facts className="mt-12 grid-cols-2 md:mt-16 md:grid-cols-4">
          <Fact label={t("project.started")}>{monthYear(project.dateStart, lang)}</Fact>
          <Fact label={t("project.status")}>
            <StatusMark status={project.status} lang={lang} />
          </Fact>
          <Fact label={t("project.typeLabel")}>{t(`project.type.${project.type}`)}</Fact>
          <Fact label={t("project.context")}>
            {records.length === 0
              ? t("project.personal")
              : records.map((record, i) => (
                  <span key={record.slug}>
                    {i > 0 && " "}
                    <Link className="lk" href={recordHref(lang, record)}>
                      {record.org[lang]}
                    </Link>
                  </span>
                ))}
          </Fact>
        </Facts>
      </div>
    </header>
  );
}
