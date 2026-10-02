import Link from "next/link";
import { Dim } from "@/components/entries/dim";
import type { Lang, Role } from "@/content/types";
import { cn } from "@/lib/cn";
import { duration, endLabel, monthYear, toDate } from "@/lib/dates";
import { recordHref } from "@/lib/entries";
import { pct, type Scale } from "@/lib/scale";

type RoleRowProps = {
  role: Role;
  scale: Scale;
  today: Date;
  lang: Lang;
};

export function RoleRow({ role, scale, today, lang }: RoleRowProps) {
  const ongoing = role.dateEnd === null;
  const start = scale.pos(toDate(role.dateStart));
  const end = scale.pos(role.dateEnd === null ? today : toDate(role.dateEnd));

  return (
    <Link
      href={recordHref(lang, role)}
      className="group page-grid border-line hover:bg-hover relative items-center gap-y-4 border-b px-(--row-pad) py-6 transition-colors duration-300 md:py-0"
    >
      <div className="an col-span-full flex items-baseline justify-between gap-4 md:col-span-2 md:block md:py-7 lg:col-span-3">
        <p className="text-ink-2">
          {monthYear(role.dateStart, lang)} – {endLabel(role.dateEnd, lang)}
        </p>
        <p className="text-ink-3">{duration(role.dateStart, role.dateEnd, lang)}</p>
      </div>

      <div className="col-span-full md:col-span-3 md:py-7 lg:col-span-4">
        <h3 className="subheading group-hover:text-accent-ink transition-colors duration-300">
          {role.title[lang]}
        </h3>
        <p className="text-ink-2 mt-1">{role.org[lang]}</p>
      </div>

      <div
        className="relative col-span-full h-12 md:col-span-3 md:h-full md:min-h-28 lg:col-span-5"
        aria-hidden="true"
      >
        {scale.ticks.map((tick) => (
          <span
            key={tick.year}
            className="bg-line absolute inset-y-0 w-px"
            style={{ left: pct(tick.pos) }}
          />
        ))}
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: pct(start), width: pct(Math.max(end - start, 0.012)) }}
        >
          <Dim open={ongoing} className={cn(ongoing ? "text-accent-ink" : "text-ink-2")} />
        </div>
      </div>
    </Link>
  );
}
