import Link from "next/link";
import { ArrowLink } from "@/components/ArrowLink";
import { Icon } from "@/components/Icon";
import { MonoMark } from "@/components/MonoMark";
import { profile } from "@/content/profile";
import type { Lang } from "@/content/types";
import { dayMonthYear } from "@/lib/dates";
import { getT, localize } from "@/lib/i18n";
import { NAV } from "./nav";

/** Rendered at build time, so "Last updated" is the build date. */
export function SiteFooter({ lang }: { lang: Lang }) {
  const t = getT(lang);
  const built = new Date();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="page-grid footer-top">
          <div className="col-span-full md:col-span-4 lg:col-span-6">
            <Link
              className="brand footer-brand inline-flex"
              href={localize(lang, "/")}
              aria-label={t("nav.homeLabel")}
            >
              <MonoMark />
              <span className="subheading">{profile.name}</span>
            </Link>
            <p className="footer-note">{t("footer.note")}</p>
          </div>
          <nav
            className="col-span-2 md:col-span-2 lg:col-span-3"
            aria-label={t("footer.index")}
          >
            <h2 className="an footer-label">{t("footer.index")}</h2>
            <ul className="footer-links">
              {[{ path: "/", key: "nav.home" as const }, ...NAV].map((n) => (
                <li key={n.path}>
                  <Link className="ld" href={localize(lang, n.path)}>
                    {t(n.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="col-span-2 md:col-span-2 lg:col-span-3">
            <h2 className="an footer-label">{t("footer.contact")}</h2>
            <ul className="footer-links">
              <li>
                <a className="lk" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </li>
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
          </div>
        </div>
        <div className="footer-base">
          <span>
            © {built.getUTCFullYear()} {profile.name} · {t("footer.updated")}{" "}
            {dayMonthYear(built, lang)}
          </span>
          <a className="tl-link" href="#top">
            {t("common.backToTop")}
            <Icon name="up" />
          </a>
        </div>
      </div>
    </footer>
  );
}
