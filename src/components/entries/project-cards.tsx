import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ProjectCardsProps = {
  /** Three columns on wide screens (two otherwise). */
  three?: boolean;
  className?: string;
  children: ReactNode;
};

export function ProjectCards({ three = false, className, children }: ProjectCardsProps) {
  return (
    <ul
      className={cn(
        "grid gap-x-6 gap-y-16 md:grid-cols-2 md:gap-y-24",
        three && "lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </ul>
  );
}
