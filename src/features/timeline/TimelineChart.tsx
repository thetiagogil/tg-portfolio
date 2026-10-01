import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Dim } from "@/components/entries/Dim";
import { Glyph } from "@/components/entries/Glyph";
import { certifications, degreeBySlug, degrees, projects, roles } from "@/content";
import type { Category, ISODate, Lang, RecordEntry } from "@/content/types";
import { monthYear, toDate } from "@/lib/dates";
import { projectHref, recordHref } from "@/lib/entries";
import { getT } from "@/lib/i18n";
import { pct, type Scale, scaleOf, utc } from "@/lib/scale";

// Markers that start closer than this (as a share of the chart's width) go on separate lanes.
const LANE_GAP = 0.018;
const LANE_HEIGHT = 16;

type TimelineChartProps = {
  lang: Lang;
};

type Marker = {
  key: string;
  href: string;
  external: boolean;
  title: string;
  date: string;
  pos: number;
  lane: number;
  glyph: ReactNode;
};

/** The career chart: two eras, a break line (2015–2021 left out), a bar per role or degree, then project and
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
      <figure className="chart-fig">
        <div className="chart-scroll">
          <div className="chart" data-reveal>
            <div className="crow">
              <div />
              <div className="area eras">
                <div className="era text-ink-2" style={{ left: 0, width: pct(switchPos) }}>
                  <Dim
                    label={`${t("timeline.chart.architecture")} · ${start.getUTCFullYear()}–${switchDate.getUTCFullYear()}`}
                  />
                </div>
                <div
                  className="era text-accent-ink"
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

            <div className="cbody">
              <Guides scale={scale} switchPos={switchPos} todayPos={todayPos} />
              {oldestFirst<RecordEntry>([...degrees, ...roles]).map((record, i) => (
                <RecordRow
                  key={record.slug}
                  record={record}
                  scale={scale}
                  today={today}
                  order={i}
                  lang={lang}
                />
              ))}
              <MarkerRow
                category="projects"
                label={t("section.projects")}
                count={`${projects.length} ${t("common.entries")}`}
                markers={projectMarkers}
              />
              <MarkerRow
                category="certifications"
                label={t("section.certifications")}
                count={`${certifications.length} ${t("common.entries")}`}
                markers={certificationMarkers}
                last
              />
            </div>

            <div className="crow" aria-hidden="true">
              <div />
              <div className="area ticks">
                <span className="an first">{start.getUTCFullYear()}</span>
                {/* A year within 10% of the first one is dropped (they collide on phones). */}
                {scale.ticks
                  .filter((tick) => tick.pos > 0.1)
                  .map((tick) => (
                    <span key={tick.year} className="an" style={{ left: pct(tick.pos) }}>
                      {tick.year}
                    </span>
                  ))}
                <span className="an low" style={{ left: pct(switchPos) }}>
                  {t("timeline.chart.transition")}
                </span>
                <span className="an low" style={{ left: pct(todayPos) }}>
                  {t("timeline.chart.today")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </figure>
      <Legend lang={lang} />
    </>
  );
}

type GuidesProps = {
  scale: Scale;
  switchPos: number;
  todayPos: number;
};

/** The year guides, the transition and today lines, and the break where the empty years are left out. */
function Guides({ scale, switchPos, todayPos }: GuidesProps) {
  return (
    <div className="cover" aria-hidden="true">
      {scale.ticks.map((tick) => (
        <span key={tick.year} className="guide" style={{ left: pct(tick.pos) }} />
      ))}
      <span className="guide tr" style={{ left: pct(switchPos) }} />
      <span className="guide today" style={{ left: pct(todayPos) }} />
      {scale.breaks.map((center) => (
        <div
          key={center}
          className="brk"
          style={{ left: pct(center - scale.gap / 2), width: pct(scale.gap) }}
        >
          {(["l", "r"] as const).map((side) => (
            <svg key={side} className={side} viewBox="0 0 12 100" preserveAspectRatio="none">
              <path
                d="M6 0V46L1 48.5 11 51.5 6 54V100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          ))}
        </div>
      ))}
    </div>
  );
}

type RecordRowProps = {
  record: RecordEntry;
  scale: Scale;
  today: Date;
  /** Bars draw one after another, in this order. */
  order: number;
  lang: Lang;
};

function RecordRow({ record, scale, today, order, lang }: RecordRowProps) {
  const start = scale.pos(toDate(record.dateStart));
  const end = scale.pos(record.dateEnd === null ? today : toDate(record.dateEnd));
  const bar = ["cbar", record.kind === "education" && "edu", record.dateEnd === null && "run"]
    .filter(Boolean)
    .join(" ");

  return (
    <Link className="rrow" href={recordHref(lang, record)}>
      <div className="crow">
        <RowLabel
          glyph={<Glyph category={record.kind} />}
          title={record.chart?.label[lang] ?? record.org[lang]}
          narrowTitle={record.chart?.labelNarrow}
          meta={record.chart?.role[lang] ?? record.title[lang]}
          fullTitle={`${record.org[lang]} · ${record.title[lang]}`}
        />
        <div className="area">
          <span
            className={bar}
            style={
              {
                left: pct(start),
                width: pct(Math.max(end - start, 0.006)),
                "--bd": `${150 + order * 110}ms`,
              } as CSSProperties
            }
          />
        </div>
      </div>
    </Link>
  );
}

type MarkerRowProps = {
  category: Category;
  label: string;
  count: string;
  markers: Marker[];
  /** The last row closes the chart with a rule. */
  last?: boolean;
};

/** Projects or certificates as markers with a hover tip. They're a mouse shortcut: every one is also in the list
    below with a full-size link, so they stay out of the keyboard order. */
function MarkerRow({ category, label, count, markers, last = false }: MarkerRowProps) {
  const lanesUsed = Math.max(1, ...markers.map((marker) => marker.lane + 1));
  return (
    <div className={last ? "crow ruled closed" : "crow ruled"}>
      <RowLabel
        glyph={<Glyph category={category} />}
        title={label}
        meta={count}
        fullTitle={label}
      />
      <div className="area" style={{ height: lanesUsed * LANE_HEIGHT + 22 }}>
        {markers.map((marker) => (
          <Link
            key={marker.key}
            className="mk"
            href={marker.href}
            {...(marker.external && { target: "_blank", rel: "noreferrer" })}
            style={{ left: pct(marker.pos), top: 11 + marker.lane * LANE_HEIGHT }}
            tabIndex={-1}
            aria-hidden="true"
          >
            {marker.glyph}
            <span className="an tip">{`${marker.title} · ${marker.date}`}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

type RowLabelProps = {
  glyph: ReactNode;
  title: string;
  /** A shorter title for phones. */
  narrowTitle?: string;
  meta: string;
  /** Shown on hover when the title is cut. */
  fullTitle: string;
};

function RowLabel({ glyph, title, narrowTitle, meta, fullTitle }: RowLabelProps) {
  return (
    <div className="lab">
      {glyph}
      <span className="lab-w">
        <span className="lab-t" title={fullTitle}>
          {narrowTitle ? (
            <>
              <span className="wide">{title}</span>
              <span className="narrow">{narrowTitle}</span>
            </>
          ) : (
            title
          )}
        </span>
        <span className="an lab-m">{meta}</span>
      </span>
    </div>
  );
}

function Legend({ lang }: { lang: Lang }) {
  const t = getT(lang);
  return (
    <div className="an legend" data-reveal>
      <ul>
        <li>
          <span className="sw" />
          {t("timeline.legend.experience")}
        </li>
        <li>
          <span className="sw edu" />
          {t("timeline.legend.education")}
        </li>
      </ul>
      <ul>
        <li>
          <Glyph category="projects" />
          {t("timeline.legend.projects")}
        </li>
        <li>
          <Glyph category="certifications" />
          {t("timeline.legend.certifications")}
        </li>
      </ul>
      <ul>
        <li>
          <Glyph category="projects" status="in progress" />
          {t("status.in progress")}
        </li>
        <li>
          <Glyph category="projects" status="planned" />
          {t("status.planned")}
        </li>
      </ul>
    </div>
  );
}

function oldestFirst<T extends { dateStart: ISODate }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => Date.parse(a.dateStart) - Date.parse(b.dateStart));
}

/** Puts each marker on the first lane where it doesn't crowd the one before. */
function lanes(markers: Omit<Marker, "lane">[]): Marker[] {
  const lastPos: number[] = [];
  return markers.map((marker) => {
    let lane = lastPos.findIndex((pos) => marker.pos - pos >= LANE_GAP);
    if (lane < 0) lane = lastPos.length;
    lastPos[lane] = marker.pos;
    return { ...marker, lane };
  });
}
