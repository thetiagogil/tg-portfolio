import Link from "next/link";
import type { CSSProperties } from "react";
import { Dim } from "@/components/Dim";
import { Glyph } from "@/components/Glyph";
import {
  certifications,
  degreeBySlug,
  degrees,
  projects,
  roles,
} from "@/content";
import type { Degree, Lang, Role } from "@/content/types";
import { monthYear, toDate } from "@/lib/dates";
import { projectHref, recordHref } from "@/lib/entries";
import { getT } from "@/lib/i18n";
import { pct, scaleOf, utc } from "@/lib/scale";

const oldestFirst = <T extends { dateStart: string }>(list: T[]) =>
  [...list].sort((a, b) => Date.parse(a.dateStart) - Date.parse(b.dateStart));

/** Markers that start too close together go on separate lanes. */
const pack = <T,>(list: { item: T; pos: number }[]) => {
  const ends: number[] = [];
  return list.map(({ item, pos }) => {
    let lane = ends.findIndex((e) => pos - e >= 0.018);
    if (lane < 0) lane = ends.length;
    ends[lane] = pos;
    return { item, pos, lane };
  });
};
const lanesHeight = (m: { lane: number }[]) =>
  Math.max(1, ...m.map((x) => x.lane + 1)) * 16 + 22;

/** The career chart: two eras, a break line (2015–2021 left out), a bar per role or degree, then project and
    certificate markers. Rendered at build time; "today" is the build date. */
export function TimelineChart({ lang }: { lang: Lang }) {
  const t = getT(lang);
  const now = new Date();
  const first = toDate(oldestFirst(degrees)[0].dateStart);
  const start = utc(first.getUTCFullYear(), first.getUTCMonth());
  const sc = scaleOf([
    [start, utc(start.getUTCFullYear() + 1, 5)],
    [utc(2022, 0), utc(now.getUTCFullYear(), now.getUTCMonth() + 3)],
  ]);
  const switchDate = toDate(degreeBySlug("ironhack")!.dateStart);
  const tr = sc.pos(switchDate);
  const today = sc.pos(now);
  const rows = oldestFirst<Role | Degree>([...degrees, ...roles]);
  const pm = pack(
    oldestFirst(projects).map((p) => ({
      item: p,
      pos: sc.pos(toDate(p.dateStart)),
    })),
  );
  const cm = pack(
    oldestFirst(certifications).map((c) => ({
      item: c,
      pos: sc.pos(toDate(c.dateStart)),
    })),
  );
  const tip = (title: string, date: string) => (
    <span className="an tip">{`${title} · ${date}`}</span>
  );

  const label = (
    glyph: React.ReactNode,
    title: string,
    meta: string,
    full: string,
    narrow?: string,
  ) => (
    <div className="lab">
      {glyph}
      <span className="lab-w">
        <span className="lab-t" title={full}>
          {narrow ? (
            <>
              <span className="wide">{title}</span>
              <span className="narrow">{narrow}</span>
            </>
          ) : (
            title
          )}
        </span>
        <span className="an lab-m">{meta}</span>
      </span>
    </div>
  );

  return (
    <>
      <figure className="chart-fig">
        <div className="chart-scroll">
          <div className="chart" data-reveal>
            <div className="crow">
              <div />
              <div className="area" style={{ height: 56 }}>
                <div
                  className="era text-ink-2"
                  style={{ left: 0, width: pct(tr) }}
                >
                  <Dim
                    label={`${t("timeline.chart.architecture")} · ${start.getUTCFullYear()}–${switchDate.getUTCFullYear()}`}
                  />
                </div>
                <div
                  className="era text-accent-ink"
                  style={{ left: pct(tr), width: pct(today - tr) }}
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
              <div className="cover" aria-hidden="true">
                {sc.ticks.map((tick) => (
                  <span
                    key={tick.year}
                    className="guide"
                    style={{ left: pct(tick.pos) }}
                  />
                ))}
                <span className="guide tr" style={{ left: pct(tr) }} />
                <span className="guide today" style={{ left: pct(today) }} />
                {sc.breaks.map((b) => (
                  <div
                    key={b}
                    className="brk"
                    style={{ left: pct(b - sc.gap / 2), width: pct(sc.gap) }}
                  >
                    {(["l", "r"] as const).map((side) => (
                      <svg
                        key={side}
                        className={side}
                        viewBox="0 0 12 100"
                        preserveAspectRatio="none"
                      >
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
              {rows.map((r, k) => {
                const s = sc.pos(toDate(r.dateStart));
                const e = sc.pos(r.dateEnd === null ? now : toDate(r.dateEnd));
                const category =
                  r.kind === "experience" ? "experience" : "education";
                return (
                  <Link
                    key={r.slug}
                    className="rrow"
                    href={recordHref(lang, r)}
                  >
                    <div className="crow">
                      {label(
                        <Glyph category={category} />,
                        r.chart?.label[lang] ?? r.org[lang],
                        r.chart?.role[lang] ?? r.title[lang],
                        `${r.org[lang]} · ${r.title[lang]}`,
                        r.chart?.labelNarrow,
                      )}
                      <div className="area">
                        <span
                          className={`cbar ${category === "education" ? "edu" : ""} ${r.dateEnd === null ? "run" : ""}`}
                          style={
                            {
                              left: pct(s),
                              width: pct(Math.max(e - s, 0.006)),
                              "--bd": `${150 + k * 110}ms`,
                            } as CSSProperties
                          }
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
              <div
                className="crow"
                style={{ borderTop: "1px solid var(--line)" }}
              >
                {label(
                  <Glyph category="projects" />,
                  t("section.projects"),
                  `${projects.length} ${t("timeline.chart.entries")}`,
                  t("section.projects"),
                )}
                <div className="area" style={{ height: lanesHeight(pm) }}>
                  {pm.map(({ item: p, pos, lane }) => (
                    <Link
                      key={p.slug}
                      className="mk"
                      href={projectHref(lang, p)}
                      style={{ left: pct(pos), top: 11 + lane * 16 }}
                      aria-label={p.title}
                    >
                      <Glyph category="projects" status={p.status} />
                      {tip(p.title, monthYear(p.dateStart, lang))}
                    </Link>
                  ))}
                </div>
              </div>
              <div
                className="crow"
                style={{
                  borderTop: "1px solid var(--line)",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                {label(
                  <Glyph category="certifications" />,
                  t("section.certifications"),
                  `${certifications.length} ${t("timeline.chart.entries")}`,
                  t("section.certifications"),
                )}
                <div className="area" style={{ height: lanesHeight(cm) }}>
                  {cm.map(({ item: c, pos, lane }) => (
                    <a
                      key={c.slug}
                      className="mk"
                      href={c.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{ left: pct(pos), top: 11 + lane * 16 }}
                      aria-label={c.title}
                    >
                      <Glyph category="certifications" />
                      {tip(c.title, monthYear(c.dateStart, lang))}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="crow" aria-hidden="true">
              <div />
              <div className="area ticks">
                <span className="an first" style={{ left: 0 }}>
                  {start.getUTCFullYear()}
                </span>
                {/* A year label within 10% of the start label is dropped (they collide on phones). */}
                {sc.ticks
                  .filter((tick) => tick.pos > 0.1)
                  .map((tick) => (
                    <span
                      key={tick.year}
                      className="an"
                      style={{ left: pct(tick.pos) }}
                    >
                      {tick.year}
                    </span>
                  ))}
                <span
                  className="an low"
                  style={{ left: pct(tr) }}
                >
                  {t("timeline.chart.transition")}
                </span>
                <span className="an low" style={{ left: pct(today) }}>
                  {t("timeline.chart.today")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </figure>
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
    </>
  );
}
