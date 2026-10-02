import type { Metadata } from "next";
import { RootShell } from "@/components/layout/root-shell";
import { Band } from "@/components/ui/band";
import { Button } from "@/components/ui/button";
import { getT } from "@/lib/i18n";
import { rootMetadata, SITE_VIEWPORT } from "@/lib/metadata";

// One static 404 for both languages (there's no server to pick one): the site's shell in English, with the same
// message in Portuguese below.
export const metadata: Metadata = { ...rootMetadata("en"), title: "404", robots: { index: false } };
export const viewport = SITE_VIEWPORT;

export default function GlobalNotFound() {
  const en = getT("en");
  const pt = getT("pt");

  return (
    <RootShell lang="en">
      <Band>
        <header className="wrap pt-14 md:pt-18 lg:pt-20">
          <p className="an text-ink-3">{en("notFound.label")}</p>
          <h1 className="title mt-6 max-w-[18ch]">{en("notFound.title")}</h1>
          <p className="lead mt-7 max-w-[52ch] text-ink-2">{en("notFound.body")}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/" icon="right">
              {en("notFound.home")}
            </Button>
          </div>

          <div lang="pt-PT" className="mt-16 border-t border-line pt-8">
            <p className="subheading">{pt("notFound.title")}</p>
            <p className="mt-3 max-w-[52ch] text-ink-2">{pt("notFound.body")}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/pt" variant="outline" size="sm" icon="right">
                {pt("notFound.home")}
              </Button>
            </div>
          </div>
        </header>
      </Band>
    </RootShell>
  );
}
