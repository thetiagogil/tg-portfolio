import { Dim } from "@/components/entries/dim";
import { Glyph } from "@/components/entries/glyph";
import { certifications, degreeBySlug, degrees, projects, roles } from "@/content";
import type { Lang, RecordEntry } from "@/content/types";
import { cn } from "@/lib/cn";
import { monthYear, toDate } from "@/lib/dates";
import { projectHref } from "@/lib/entries";
import { getT } from "@/lib/i18n";
import { pct, scaleOf, utc } from "@/lib/scale";
import { ChartGuides } from "./chart-guides";
import { ChartLegend } from "./chart-legend";
import { ChartMarkerRow } from "./chart-marker-row";
import { ChartRecordRow } from "./chart-record-row";
import { lanes, oldestFirst } from "./chart-utils";

type TimelineChartProps = {
  lang: Lang;
};

const ROW = "grid grid-cols-[var(--label-w)_1fr] px-(--row-pad)";
const TICK = "an absolute top-3 -translate-x-1/2 whitespace-nowrap text-ink-3";

/** The career chart: two eras, a break (2015–2021 left out), a bar per role or degree, then project and
    certificate markers. Built with the site, so "today" is the build date. */
export function TimelineChart({ lang }: TimelineChartProps) {
  const t = getT(lang);

  const today = new Date();
  const first = toDate(oldestFirst(degrees)[0].dateStart);
  const start = utc(first.getUTCFullYear(), first.getUTCMonth());
  const scale = scaleOf([
    [start, utc(start.getUTCFullYear() + 1, 5)],
    [utc(2022, 0), utc(today.getUTCFullYear(), today.getUTCMonth() + 3)],
  ]);
  const switchDate = toDate(degreeBySlug("ironhack")!.dateStart);
  const switchPos = scale.pos(switchDate);
  const todayPos = scale.pos(today);

  const projectMarkers = lanes(
    oldestFirst(projects).map((project) => ({
      key: project.slug,
      href: projectHref(lang, project),
      external: false,
      title: project.title,
      date: monthYear(project.dateStart, lang),
      pos: scale.pos(toDate(project.dateStart)),
      glyph: <Glyph category="projects" status={project.status} />,
    })),
  );
  const certificationMarkers = lanes(
    oldestFirst(certifications).map((certification) => ({
      key: certification.slug,
      href: certification.link,
      external: true,
      title: certification.title,
      date: monthYear(certification.dateStart, lang),
      pos: scale.pos(toDate(certification.dateStart)),
      glyph: <Glyph category="certifications" />,
    })),
  );

  return (
    <>
      <figure className="mt-16 md:mt-20">
        <div className="-mx-(--gutter) [scrollbar-width:thin] overflow-x-auto px-(--gutter) pt-2">
          <div
            className="min-w-[42rem] [--label-w:8.5rem] md:[--label-w:13rem] lg:[--label-w:16rem]"
            data-reveal
          >
            <div className={ROW}>
              <div />
              <div className="relative h-14">
                <div
                  className="text-ink-2 absolute top-5"
                  style={{ left: 0, width: pct(switchPos) }}
                >
                  <Dim
                    label={`${t("timeline.chart.architecture")} · ${start.getUTCFullYear()}–${switchDate.getUTCFullYear()}`}
                  />
                </div>
                <div
                  className="text-accent-ink absolute top-5"
                  style={{ left: pct(switchPos), width: pct(todayPos - switchPos) }}
                >
                  <Dim
                    label={`${t("timeline.chart.software")} · ${switchDate.getUTCFullYear()}–${t("timeline.chart.today")}`}
                    open
                    labelClassName="text-accent-ink"
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <ChartGuides scale={scale} switchPos={switchPos} todayPos={todayPos} />

              {oldestFirst<RecordEntry>([...degrees, ...roles]).map((record, i) => (
                <ChartRecordRow
                  key={record.slug}
                  record={record}
                  scale={scale}
                  today={today}
                  order={i}
                  lang={lang}
                />
              ))}

              <ChartMarkerRow
                category="projects"
                label={t("section.projects")}
                count={`${projects.length} ${t("common.entries")}`}
                markers={projectMarkers}
              />
              <ChartMarkerRow
                category="certifications"
                label={t("section.certifications")}
                count={`${certifications.length} ${t("common.entries")}`}
                markers={certificationMarkers}
                last
              />
            </div>

            <div className={ROW} aria-hidden="true">
              <div />
              <div className="relative h-16">
                <span className={cn(TICK, "left-0 translate-x-0")}>{start.getUTCFullYear()}</span>
                {/* A year within 10% of the first one is dropped: they collide on phones. */}
                {scale.ticks
                  .filter((tick) => tick.pos > 0.1)
                  .map((tick) => (
                    <span key={tick.year} className={TICK} style={{ left: pct(tick.pos) }}>
                      {tick.year}
                    </span>
                  ))}
                <span className={cn(TICK, "top-9")} style={{ left: pct(switchPos) }}>
                  {t("timeline.chart.transition")}
                </span>
                <span className={cn(TICK, "top-9")} style={{ left: pct(todayPos) }}>
                  {t("timeline.chart.today")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </figure>

      <ChartLegend lang={lang} />
    </>
  );
}
