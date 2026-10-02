import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Band } from "./band";
import { SectionHead } from "./section-head";

type SectionProps = {
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ title, intro, action, id, className, children }: SectionProps) {
  return (
    <Band id={id}>
      <div className="wrap">
        <SectionHead title={title} intro={intro} action={action} />
        <div className={cn("mt-12 md:mt-16", className)}>{children}</div>
      </div>
    </Band>
  );
}
