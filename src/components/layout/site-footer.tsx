import Link from "next/link";
import { ArrowLink } from "@/components/ui/arrow-link";
import { profile } from "@/content";
import type { Lang } from "@/content/types";
import { dayMonthYear } from "@/lib/dates";
import { getT, localize } from "@/lib/i18n";
import { ContactLinks } from "./contact-links";
import { MonoMark } from "./mono-mark";
import { HOME, NAV } from "./nav";

type SiteFooterProps = {
  lang: Lang;
};

/** Built with the site, so "Last updated" is the build date. */
export function SiteFooter({ lang }: SiteFooterProps) {
  const t = getT(lang);
  const builtAt = new Date();

  return (
    <footer className="site-footer relative bg-paper text-ink">
      <div className="wrap">
        <div className="page-grid gap-y-12 py-16 md:py-20">
          <div className="col-span-full md:col-span-4 lg:col-span-6">
            <Link
              className="group/brand inline-flex items-center gap-3"
              href={localize(lang, "/")}
              aria-label={t("nav.homeLabel")}
            >
              <MonoMark className="size-10" />
              <span className="subheading">{profile.name}</span>
            </Link>
            <p className="mt-6 max-w-[36ch] text-ink-2">{t("footer.note")}</p>
          </div>

          <nav
            className="col-span-full sm:col-span-2 md:col-span-2 lg:col-span-3"
            aria-label={t("footer.index")}
          >
            <h2 className="an font-normal text-ink-3">{t("footer.index")}</h2>
            <ul className="mt-4 grid justify-items-start gap-2">
              {[HOME, ...NAV].map((item) => (
                <li key={item.path} className="flex min-h-7 items-center">
                  <Link className="ld" href={localize(lang, item.path)}>
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-full sm:col-span-2 md:col-span-2 lg:col-span-3">
            <h2 className="an font-normal text-ink-3">{t("footer.contact")}</h2>
            <ContactLinks lang={lang} layout="column" />
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 border-t border-line pt-7 pb-8 text-[0.875rem] text-ink-3">
          <span>
            © {builtAt.getUTCFullYear()} {profile.name} · {t("footer.updated")}{" "}
            {dayMonthYear(builtAt, lang)}
          </span>
          <ArrowLink href="#top" icon="up" plain className="-my-1.5 py-1.5">
            {t("common.backToTop")}
          </ArrowLink>
        </div>
      </div>
    </footer>
  );
}
