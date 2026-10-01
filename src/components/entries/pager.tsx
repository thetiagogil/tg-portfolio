import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import type { Lang } from "@/content/types";
import { cn } from "@/lib/cn";
import { getT } from "@/lib/i18n";

export type PagerLink = {
  href: string;
  title: string;
  sub: string;
};

type PagerProps = {
  prev: PagerLink | null;
  next: PagerLink;
  lang: Lang;
};

/** Previous / Next: a band of its own; each link fills its half. Only "Next" when there's one other entry. */
export function Pager({ prev, next, lang }: PagerProps) {
  const t = getT(lang);
  return (
    <section className="band pager-band">
      <nav className="pager" aria-label={`${t("common.previous")} / ${t("common.next")}`}>
        {prev && (
          <Link href={prev.href} rel="prev">
            <span className="an">
              <Icon name="left" />
              {t("common.previous")}
            </span>
            <span className="heading">{prev.title}</span>
            <span className="sub">{prev.sub}</span>
          </Link>
        )}
        <Link href={next.href} rel="next" className={cn("end", !prev && "alone")}>
          <span className="an">
            {t("common.next")}
            <Icon name="right" />
          </span>
          <span className="heading">{next.title}</span>
          <span className="sub">{next.sub}</span>
        </Link>
      </nav>
    </section>
  );
}
