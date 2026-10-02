import type { ReactNode } from "react";

type SectionHeadProps = {
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
};

export function SectionHead({ title, intro, action }: SectionHeadProps) {
  return (
    <header
      className="grid gap-y-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-x-(--grid-gap)"
      data-reveal
    >
      <div>
        <h2 className="heading max-w-[22ch]">{title}</h2>
        {intro && <p className="lead mt-5 max-w-[50ch] text-ink-2">{intro}</p>}
      </div>

      {action && <div className="justify-self-start md:justify-self-end md:pb-2">{action}</div>}
    </header>
  );
}
