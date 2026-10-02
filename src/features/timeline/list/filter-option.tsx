import type { ReactNode } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

type FilterOptionProps = {
  on: boolean;
  /** Ticking it would leave nothing to show, so it's faded and disabled (a ticked option never is). */
  empty: boolean;
  /** Text under the label, which aligns the box with the first line. */
  hint?: string;
  onToggle: () => void;
  children: ReactNode;
};

export function FilterOption({ on, empty, hint, onToggle, children }: FilterOptionProps) {
  return (
    <button
      type="button"
      className={cn(
        "group/option flex min-h-9 items-center gap-2.5 px-2 py-1.5 text-left text-[0.875rem] leading-[1.3] text-ink-2 transition-[background-color,color] duration-200 enabled:hover:bg-hover enabled:hover:text-ink disabled:cursor-default disabled:opacity-35 aria-pressed:text-ink",
        hint && "items-start",
      )}
      aria-pressed={on}
      disabled={!on && empty}
      onClick={onToggle}
    >
      <span
        className={cn(
          "grid size-4 flex-none place-items-center inset-ring inset-ring-ink-3 transition-[background-color,box-shadow] duration-200 group-enabled/option:group-hover/option:inset-ring-ink group-aria-pressed/option:bg-ink group-aria-pressed/option:inset-ring-0",
          hint && "mt-px",
        )}
      >
        <Icon
          name="check"
          className="size-3 stroke-paper stroke-[2.5] opacity-0 transition-opacity duration-200 group-aria-pressed/option:opacity-100"
        />
      </span>
      <span>
        {children}
        {hint && <span className="mt-0.5 block text-[0.8125rem] text-ink-3">{hint}</span>}
      </span>
    </button>
  );
}
