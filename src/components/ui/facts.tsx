import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FactsProps = {
  className?: string;
  children: ReactNode;
};

type FactProps = {
  label: string;
  children: ReactNode;
};

export function Facts({ className, children }: FactsProps) {
  return <dl className={cn("border-line grid gap-x-6 border-t pt-2", className)}>{children}</dl>;
}

export function Fact({ label, children }: FactProps) {
  return (
    <div className="pt-1.5 pb-3.5">
      <dt className="an text-ink-3">{label}</dt>
      <dd className="mt-1.5 text-[0.9375rem] leading-[1.35]">{children}</dd>
    </div>
  );
}
