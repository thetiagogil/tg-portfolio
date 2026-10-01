// A time scale for charts: maps dates onto 0–1 across one or more segments, with a small gap between segments
// (the Timeline chart leaves 2015–2021 out with a break line). Ported from the study.

export interface Scale {
  /** Position of a date, 0–1. */
  pos: (d: Date) => number;
  /** 1 January of each year that falls inside a segment. */
  ticks: { year: number; pos: number }[];
  /** Centre of each gap between segments. */
  breaks: number[];
  gap: number;
}

export const utc = (year: number, month: number) =>
  new Date(Date.UTC(year, month, 1));

export function scaleOf(segments: [Date, Date][], gap = 0.04): Scale {
  const spans = segments.map(([a, b]) => ({ s: a.getTime(), e: b.getTime() }));
  const total = spans.reduce((t, x) => t + (x.e - x.s), 0);
  const draw = 1 - (spans.length - 1) * gap;
  const offsets: number[] = [];
  let cursor = 0;
  for (const x of spans) {
    offsets.push(cursor);
    cursor += ((x.e - x.s) / total) * draw + gap;
  }
  const pos = (d: Date) => {
    const t = d.getTime();
    for (let i = 0; i < spans.length; i++) {
      if (t < spans[i].s) return i === 0 ? 0 : offsets[i] - gap / 2;
      if (t <= spans[i].e)
        return offsets[i] + ((t - spans[i].s) / total) * draw;
    }
    return 1;
  };
  const ticks: Scale["ticks"] = [];
  for (const x of spans) {
    for (
      let y = new Date(x.s).getUTCFullYear();
      y <= new Date(x.e).getUTCFullYear();
      y++
    ) {
      const t = Date.UTC(y, 0, 1);
      if (t >= x.s && t <= x.e) ticks.push({ year: y, pos: pos(new Date(t)) });
    }
  }
  return { pos, ticks, breaks: offsets.slice(1).map((o) => o - gap / 2), gap };
}

export const pct = (v: number) => `${(v * 100).toFixed(3)}%`;
