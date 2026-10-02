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

type PagerItemProps = {
  link: PagerLink;
  direction: "prev" | "next";
  label: string;
  /** "Next" with no "Previous": it takes the whole width. */
  alone?: boolean;
};

// --side is the .wrap's outer margin plus its gutter, measured on the pager (a container) so a scrollbar can't skew
// it: the links' text lines up with the page's content.
const SIDE = "[--side:calc(max(0px,(100cqi-90rem)/2)+var(--gutter))]";

/** Previous / Next: a band of its own; each link fills its half. Only "Next" when there's one other entry. */
export function Pager({ prev, next, lang }: PagerProps) {
  const t = getT(lang);

  return (
    <section className="band py-0">
      <nav
        className="@container grid md:grid-cols-2"
        aria-label={`${t("common.previous")} / ${t("common.next")}`}
      >
        {prev && <PagerItem link={prev} direction="prev" label={t("common.previous")} />}
        <PagerItem link={next} direction="next" label={t("common.next")} alone={!prev} />
      </nav>
    </section>
  );
}

function PagerItem({ link, direction, label, alone = false }: PagerItemProps) {
  const isNext = direction === "next";

  return (
    <Link
      href={link.href}
      rel={direction}
      className={cn(
        SIDE,
        "group flex flex-col gap-3 px-[calc(var(--side)+var(--row-pad))] py-10 md:py-14",
        isNext
          ? "border-t border-line md:items-end md:border-t-0 md:border-l md:pr-[calc(var(--side)+var(--row-pad))] md:pl-8 md:text-right"
          : "md:pr-8 md:pl-[calc(var(--side)+var(--row-pad))]",
        alone && "col-span-full border-t-0 md:border-l-0",
      )}
    >
      <span className="an flex items-center gap-2 text-ink-3">
        {!isNext && <Icon name="left" />}
        {label}
        {isNext && <Icon name="right" />}
      </span>
      <span className="heading transition-colors duration-300 group-hover:text-accent-ink">
        {link.title}
      </span>
      <span className="text-ink-2">{link.sub}</span>
    </Link>
  );
}
