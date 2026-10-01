import type { ReactNode } from "react";

/** A band's heading, with an optional eyebrow, a one-sentence intro and an action on the right. */
export function SectionHead({
  title,
  eyebrow,
  intro,
  action,
}: {
  title: ReactNode;
  eyebrow?: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <header className="sec-head" data-reveal>
      <div className="sec-title">
        {eyebrow && <p className="an sec-eyebrow">{eyebrow}</p>}
        <h2 className="heading">{title}</h2>
        {intro && <p className="lead sec-intro">{intro}</p>}
      </div>
      {action && <div className="sec-action">{action}</div>}
    </header>
  );
}
