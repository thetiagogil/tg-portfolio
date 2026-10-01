import Link from "next/link";
import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";
import { Icon } from "./Icon";

interface PagerItem {
  href: string;
  title: string;
  sub: string;
}

/** Previous / Next: a band with no padding; each link fills its half. Only "Next" when there's one other entry. */
export function Pager({
  prev,
  next,
  lang,
}: {
  prev: PagerItem | null;
  next: PagerItem;
  lang: Lang;
}) {
  const t = getT(lang);
  return (
    <section className="band pager-band">
      <nav
        className="pager"
        aria-label={`${t("common.previous")} / ${t("common.next")}`}
      >
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
        <Link
          href={next.href}
          rel="next"
          className="end"
          style={
            prev
              ? undefined
              : { gridColumn: "1 / -1", borderLeft: 0, borderTop: 0 }
          }
        >
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
