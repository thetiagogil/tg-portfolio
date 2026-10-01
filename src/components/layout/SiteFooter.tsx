import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { profile } from "@/content";
import type { Lang } from "@/content/types";
import { dayMonthYear } from "@/lib/dates";
import { getT, localize } from "@/lib/i18n";
import { ContactLinks } from "./ContactLinks";
import { MonoMark } from "./MonoMark";
import { HOME, NAV } from "./nav";

type SiteFooterProps = {
  lang: Lang;
};

/** Built with the site, so "Last updated" is the build date. */
export function SiteFooter({ lang }: SiteFooterProps) {
  const t = getT(lang);
  const builtAt = new Date();

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
            className="col-span-full sm:col-span-2 md:col-span-2 lg:col-span-3"
            aria-label={t("footer.index")}
          >
            <h2 className="an footer-label">{t("footer.index")}</h2>
            <ul className="footer-links">
              {[HOME, ...NAV].map((item) => (
                <li key={item.path}>
                  <Link className="ld" href={localize(lang, item.path)}>
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="col-span-full sm:col-span-2 md:col-span-2 lg:col-span-3">
            <h2 className="an footer-label">{t("footer.contact")}</h2>
            <ContactLinks lang={lang} className="footer-links" withEmail />
          </div>
        </div>
        <div className="footer-base">
          <span>
            © {builtAt.getUTCFullYear()} {profile.name} · {t("footer.updated")}{" "}
            {dayMonthYear(builtAt, lang)}
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
