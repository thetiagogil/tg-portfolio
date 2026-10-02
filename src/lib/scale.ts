export type Scale = {
  pos: (date: Date) => number;
  ticks: { year: number; pos: number }[];
  breaks: number[];
  gap: number;
};

export function utc(year: number, month: number): Date {
  return new Date(Date.UTC(year, month, 1));
}

export function pct(value: number): string {
  return `${(value * 100).toFixed(3)}%`;
}

export function scaleOf(segments: [Date, Date][], gap = 0.04): Scale {
  const spans = segments.map(([from, to]) => ({ from: from.getTime(), to: to.getTime() }));
  const total = spans.reduce((sum, span) => sum + (span.to - span.from), 0);
  const drawn = 1 - (spans.length - 1) * gap;

  const offsets: number[] = [];
  let cursor = 0;

  for (const span of spans) {
    offsets.push(cursor);
    cursor += ((span.to - span.from) / total) * drawn + gap;
  }

  const pos = (date: Date) => {
    const time = date.getTime();

    for (const [i, span] of spans.entries()) {
      if (time < span.from) return i === 0 ? 0 : offsets[i] - gap / 2;
      if (time <= span.to) return offsets[i] + ((time - span.from) / total) * drawn;
    }

    return 1;
  };

  const ticks: Scale["ticks"] = [];

  for (const span of spans) {
    const first = new Date(span.from).getUTCFullYear();
    const last = new Date(span.to).getUTCFullYear();

    for (let year = first; year <= last; year++) {
      const time = Date.UTC(year, 0, 1);

      if (time >= span.from && time <= span.to) ticks.push({ year, pos: pos(new Date(time)) });
    }
  }

  return { pos, ticks, breaks: offsets.slice(1).map((offset) => offset - gap / 2), gap };
}
