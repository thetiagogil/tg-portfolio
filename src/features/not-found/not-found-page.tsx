import { Band } from "@/components/ui/band";
import { Button } from "@/components/ui/button";
import { PageHead } from "@/components/ui/page-head";
import type { Lang } from "@/content/types";
import { getT, localize } from "@/lib/i18n";
import { delay } from "@/lib/motion";

type NotFoundPageProps = {
  lang: Lang;
};

export function NotFoundPage({ lang }: NotFoundPageProps) {
  const t = getT(lang);

  return (
    <Band>
      <PageHead
        eyebrow={t("notFound.label")}
        title={t("notFound.title")}
        intro={t("notFound.body")}
      />

      <div className="wrap fade mt-10" style={delay(340)}>
        <Button href={localize(lang, "/")} icon="right">
          {t("notFound.home")}
        </Button>
      </div>
    </Band>
  );
}
