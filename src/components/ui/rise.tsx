import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { delay as startAfter } from "@/lib/motion";

type RiseProps = {
  children: ReactNode;
  /** When it starts, in ms after the page loads. */
  delay: number;
  className?: string;
};

/** A line of a headline that rises into place once, on load. */
export function Rise({ children, delay, className }: RiseProps) {
  return (
    <span className="rise-mask">
      <span className={cn("rise", className)} style={startAfter(delay)}>
        {children}
      </span>
    </span>
  );
}
