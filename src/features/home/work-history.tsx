import { ArrowLink } from "@/components/ui/arrow-link";
import { Section } from "@/components/ui/section";
import { roles } from "@/content";
import type { Lang } from "@/content/types";
import { toDate } from "@/lib/dates";
import { getT, localize } from "@/lib/i18n";
import { pct, scaleOf, utc } from "@/lib/scale";
import { RoleRow } from "./role-row";

type WorkHistoryProps = {
  lang: Lang;
};

/** "Where I've worked": each role as a bar on a track from two months before the first role to today. */
export function WorkHistory({ lang }: WorkHistoryProps) {
  const t = getT(lang);

  const today = new Date();
  const first = toDate(roles[roles.length - 1].dateStart);
  const scale = scaleOf([[utc(first.getUTCFullYear(), first.getUTCMonth() - 2), today]]);

  return (
    <Section
      title={t("home.experience.title")}
      action={<ArrowLink href={localize(lang, "/timeline")}>{t("common.fullTimeline")}</ArrowLink>}
    >
      <ol className="border-t border-line">
        {roles.map((role) => (
          <li key={role.slug} data-reveal>
            <RoleRow role={role} scale={scale} today={today} lang={lang} />
          </li>
        ))}
      </ol>

      <div className="page-grid px-(--row-pad)" aria-hidden="true">
        <div className="an relative col-span-full h-8 md:col-span-3 md:col-start-6 lg:col-span-5 lg:col-start-8">
          {scale.ticks.map((tick) => (
            <span
              key={tick.year}
              className="absolute top-2 -translate-x-1/2 text-ink-3"
              style={{ left: pct(tick.pos) }}
            >
              {tick.year}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
