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
        "group/option text-ink-2 enabled:hover:bg-hover enabled:hover:text-ink aria-pressed:text-ink flex min-h-9 items-center gap-2.5 px-2 py-1.5 text-left text-[0.875rem] leading-[1.3] transition-[background-color,color] duration-200 disabled:cursor-default disabled:opacity-35",
        hint && "items-start",
      )}
      aria-pressed={on}
      disabled={!on && empty}
      onClick={onToggle}
    >
      <span
        className={cn(
          "inset-ring-ink-3 group-enabled/option:group-hover/option:inset-ring-ink group-aria-pressed/option:bg-ink grid size-4 flex-none place-items-center inset-ring transition-[background-color,box-shadow] duration-200 group-aria-pressed/option:inset-ring-0",
          hint && "mt-px",
        )}
      >
        <Icon
          name="check"
          className="stroke-paper size-3 stroke-[2.5] opacity-0 transition-opacity duration-200 group-aria-pressed/option:opacity-100"
        />
      </span>
      <span>
        {children}
        {hint && <span className="text-ink-3 mt-0.5 block text-[0.8125rem]">{hint}</span>}
      </span>
    </button>
  );
}
