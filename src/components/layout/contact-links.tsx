import { ArrowLink } from "@/components/ui/arrow-link";
import { profile } from "@/content";
import type { Lang } from "@/content/types";
import { cn } from "@/lib/cn";
import { getT } from "@/lib/i18n";

type ContactLinksProps = {
  lang: Lang;
  layout: "column" | "row";
  className?: string;
};

export function ContactLinks({ lang, layout, className }: ContactLinksProps) {
  const t = getT(lang);
  const isColumn = layout === "column";
  const item = isColumn ? "flex min-h-7 items-center" : undefined;

  return (
    <ul
      className={cn(
        isColumn ? "mt-4 grid justify-items-start gap-2" : "mt-8 flex flex-wrap gap-x-8 gap-y-3",
        className,
      )}
    >
      {isColumn && (
        <li className={item}>
          <a className="lk wrap-anywhere" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </li>
      )}
      <li className={item}>
        <ArrowLink href={profile.links.github} icon="out">
          GitHub
        </ArrowLink>
      </li>
      <li className={item}>
        <ArrowLink href={profile.links.linkedin} icon="out">
          LinkedIn
        </ArrowLink>
      </li>
      <li className={item}>
        <ArrowLink href={profile.cv} icon="dl">
          {t("contact.cv")}
        </ArrowLink>
      </li>
    </ul>
  );
}
