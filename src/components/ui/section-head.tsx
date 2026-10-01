import type { ReactNode } from "react";

type SectionHeadProps = {
  title: ReactNode;
  intro?: ReactNode;
  /** A link on the right, such as "Full timeline →". */
  action?: ReactNode;
};

/** A band's heading, with an optional one-sentence intro and an action on the right. */
export function SectionHead({ title, intro, action }: SectionHeadProps) {
  return (
    <header className="sec-head" data-reveal>
      <div className="sec-title">
        <h2 className="heading">{title}</h2>
        {intro && <p className="lead sec-intro">{intro}</p>}
      </div>
      {action && <div className="sec-action">{action}</div>}
    </header>
  );
}
