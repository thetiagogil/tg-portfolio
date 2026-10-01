import type { Metadata } from "next";
import { RootShell } from "@/components/layout/RootShell";
import { Band } from "@/components/ui/Band";
import { Button } from "@/components/ui/Button";
import { getT } from "@/lib/i18n";
import { rootMetadata, SITE_VIEWPORT } from "@/lib/metadata";

// One static 404 for both languages (there's no server to pick one): the site's shell in English, with the same
// message in Portuguese below.
export const metadata: Metadata = {
  ...rootMetadata("en"),
  title: "404",
  robots: { index: false },
};
export const viewport = SITE_VIEWPORT;

export default function GlobalNotFound() {
  const en = getT("en");
  const pt = getT("pt");
  return (
    <RootShell lang="en">
      <Band>
        <header className="wrap page-head">
          <p className="an eyebrow">{en("notFound.label")}</p>
          <h1 className="title">{en("notFound.title")}</h1>
          <p className="lead intro">{en("notFound.body")}</p>
          <div className="btns mt-10">
            <Button href="/" icon="right">
              {en("notFound.home")}
            </Button>
          </div>
          <div lang="pt-PT" className="border-line mt-16 border-t pt-8">
            <p className="subheading">{pt("notFound.title")}</p>
            <p className="text-ink-2 mt-3 max-w-[52ch]">{pt("notFound.body")}</p>
            <div className="btns mt-6">
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
