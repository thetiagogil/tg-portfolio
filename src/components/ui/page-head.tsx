import type { ReactNode } from "react";
import { delay } from "@/lib/motion";
import { Rise } from "./rise";

type PageHeadProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
};

/** A page's first band: the eyebrow, the title (rises on load) and a short intro. */
export function PageHead({ eyebrow, title, intro }: PageHeadProps) {
  return (
    <header className="wrap page-head">
      <p className="an eyebrow fade">{eyebrow}</p>
      <h1 className="title">
        <Rise delay={80}>{title}</Rise>
      </h1>
      {intro && (
        <p className="lead intro fade" style={delay(260)}>
          {intro}
        </p>
      )}
    </header>
  );
}
