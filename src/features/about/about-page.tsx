import type { Lang } from "@/content/types";
import { AboutIntro } from "./about-intro";
import { Principles } from "./principles";
import { Story } from "./story";
import { Toolbox } from "./toolbox";

type AboutPageProps = {
  lang: Lang;
};

export function AboutPage({ lang }: AboutPageProps) {
  return (
    <>
      <AboutIntro lang={lang} />
      <Story lang={lang} />
      <Principles lang={lang} />
      <Toolbox lang={lang} />
    </>
  );
}
