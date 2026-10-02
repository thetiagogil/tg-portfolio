import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { ReactNode } from "react";
import "@/app/globals.css";
import type { Lang } from "@/content/types";
import { getT, HTML_LANG } from "@/lib/i18n";
import { RevealObserver } from "./reveal-observer";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

// Runs before the first paint: applies a remembered theme (no flash) and marks that JavaScript runs, so the
// reveal-on-scroll only hides content when it can show it again.
const BOOT_SCRIPT = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.dataset.theme=t}catch(e){}})()`;

const ANALYTICS_TOKEN = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;

type RootShellProps = {
  lang: Lang;
  children: ReactNode;
};

export function RootShell({ lang, children }: RootShellProps) {
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
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body>
        <a
          className="fixed top-2 left-2 z-60 translate-y-[-200%] bg-ink px-3.5 py-2.5 text-paper focus:translate-none"
          href="#main"
        >
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
