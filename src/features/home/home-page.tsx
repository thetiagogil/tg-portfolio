import type { Lang } from "@/content/types";
import { Contact } from "./contact";
import { Hero } from "./hero";
import { SelectedWork } from "./selected-work";
import { WorkHistory } from "./work-history";

type HomePageProps = {
  lang: Lang;
};

export function HomePage({ lang }: HomePageProps) {
  return (
    <>
      <Hero lang={lang} />
      <SelectedWork lang={lang} />
      <WorkHistory lang={lang} />
      <Contact lang={lang} />
    </>
  );
}
