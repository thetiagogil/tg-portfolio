import { twMerge } from "tailwind-merge";

/** Joins class names, skipping empty ones; when two Tailwind classes clash, the later one wins. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return twMerge(classes.filter(Boolean).join(" "));
}
