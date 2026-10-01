import type { ReactNode } from "react";

/** A page's first band content: the eyebrow, the title (rises on load) and a short intro. */
export function PageHead({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <header className="wrap page-head">
      <p className="an eyebrow fade">{eyebrow}</p>
      <h1 className="title">
        <span className="rise-mask">
          <span
            className="rise"
            style={{ "--d": "80ms" } as React.CSSProperties}
          >
            {title}
          </span>
        </span>
      </h1>
      {intro && (
        <p
          className="lead intro fade"
          style={{ "--d": "260ms" } as React.CSSProperties}
        >
          {intro}
        </p>
      )}
    </header>
  );
}
