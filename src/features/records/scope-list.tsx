import type { Lang, ScopePoint } from "@/content/types";

type ScopeListProps = {
  points: ScopePoint[];
  lang: Lang;
};

export function ScopeList({ points, lang }: ScopeListProps) {
  return (
    <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2">
      {points.map((point) => (
        <li key={point.title.en}>
          <h3 className="subheading">{point.title[lang]}</h3>
          <p className="mt-2 max-w-[40em] text-ink-2">{point.text[lang]}</p>
        </li>
      ))}
    </ul>
  );
}
