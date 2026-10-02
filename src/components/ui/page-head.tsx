import type { ReactNode } from "react";
import { delay } from "@/lib/motion";
import { Rise } from "./rise";

type PageHeadProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
};

export function PageHead({ eyebrow, title, intro }: PageHeadProps) {
  return (
    <header className="wrap pt-14 md:pt-18 lg:pt-20">
      <p className="an fade text-ink-3">{eyebrow}</p>

      <h1 className="title mt-6 max-w-[18ch]">
        <Rise delay={80}>{title}</Rise>
      </h1>

      {intro && (
        <p className="lead fade mt-7 max-w-[52ch] text-ink-2" style={delay(260)}>
          {intro}
        </p>
      )}
    </header>
  );
}
