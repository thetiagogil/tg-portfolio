import { ArrowLink } from "@/components/ui/arrow-link";
import { profile } from "@/content";
import type { Lang } from "@/content/types";
import { getT } from "@/lib/i18n";

type ContactLinksProps = {
  lang: Lang;
  className: string;
  /** The address as the first link (the footer and the menu; Home shows it large on its own). */
  withEmail?: boolean;
};

/** Email, GitHub, LinkedIn and the CV. */
export function ContactLinks({ lang, className, withEmail = false }: ContactLinksProps) {
  const t = getT(lang);
  return (
    <ul className={className}>
      {withEmail && (
        <li>
          <a className="lk" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </li>
      )}
      <li>
        <ArrowLink href={profile.links.github} icon="out">
          GitHub
        </ArrowLink>
      </li>
      <li>
        <ArrowLink href={profile.links.linkedin} icon="out">
          LinkedIn
        </ArrowLink>
      </li>
      <li>
        <ArrowLink href={profile.cv} icon="dl">
          {t("contact.cv")}
        </ArrowLink>
      </li>
    </ul>
  );
}
