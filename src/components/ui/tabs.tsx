import type { ReactNode } from "react";

type TabsProps = {
  label: string;
  children: ReactNode;
};

type TabProps = {
  label: string;
  count: number;
  active: boolean;
  disabled?: boolean;
  onSelect: () => void;
};

export function Tabs({ label, children }: TabsProps) {
  return (
    <div
      className="-mx-3 flex scrollbar-none gap-1 overflow-x-auto"
      role="group"
      aria-label={label}
    >
      {children}
    </div>
  );
}

export function Tab({ label, count, active, disabled = false, onSelect }: TabProps) {
  return (
    <button
      type="button"
      className="group/tab relative flex h-10 flex-none items-center gap-2 px-3 text-[0.9375rem] text-ink-3 transition-colors duration-300 after:absolute after:inset-x-3 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-500 after:ease-settle hover:text-ink disabled:cursor-default disabled:opacity-40 aria-pressed:text-ink aria-pressed:after:scale-x-100"
      aria-pressed={active}
      disabled={disabled}
      onClick={onSelect}
    >
      {label}
      <span className="an text-ink-3 tabular-nums group-aria-pressed/tab:text-accent-ink">
        {count}
      </span>
    </button>
  );
}
