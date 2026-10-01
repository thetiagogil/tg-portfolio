import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { ReactNode } from "react";
import "@/app/globals.css";
import type { Lang } from "@/content/types";
import { getT, HTML_LANG } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";
import { RevealObserver } from "./RevealObserver";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

// Runs before the first paint: applies a remembered theme (no flash) and marks that JavaScript runs, so the
// reveal-on-scroll only hides content when it can show it again.
const BOOT = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.dataset.theme=t}catch(e){}})()`;

// Cloudflare Web Analytics (cookieless). Set NEXT_PUBLIC_CF_ANALYTICS_TOKEN when building to turn it on; without it
// no analytics script is included. (If the domain is proxied by Cloudflare, it can also be switched on in the
// dashboard with no code at all.)
const ANALYTICS_TOKEN = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;

export const rootMetadata = (lang: Lang): Metadata => ({
  metadataBase: new URL(SITE_URL),
  title: { default: "Tiago Gil", template: "%s · Tiago Gil" },
  description: getT(lang)("footer.note"),
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1114" },
  ],
};

/** The <html> shell both root layouts share (English at /, Portuguese at /pt). */
export function RootShell({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  const t = getT(lang);
  return (
    <html
      lang={HTML_LANG[lang]}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      {/* A plain <head> is how the App Router adds a script before the first paint (the rule targets pages/). */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        <a className="skip" href="#main">
          {t("a11y.skip")}
        </a>
        <SiteHeader lang={lang} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter lang={lang} />
        <RevealObserver />
        {ANALYTICS_TOKEN && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: ANALYTICS_TOKEN })}
          />
        )}
      </body>
    </html>
  );
}
