import { StackLine } from "@/components/entries/stack";
import { Icon } from "@/components/ui/icon";
import type { Project } from "@/content/types";

type ProjectCollectionProps = {
  sites: NonNullable<Project["collection"]>;
};

export function ProjectCollection({ sites }: ProjectCollectionProps) {
  return (
    <ul className="border-t border-line">
      {sites.map((site) => (
        <li key={site.href} className="border-b border-line">
          <a
            className="group block px-(--row-pad) py-6 transition-colors duration-300 hover:bg-hover"
            href={site.href}
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="subheading group-hover:text-accent-ink">{site.label}</h3>
              <Icon name="out" className="text-ink-3" />
            </div>
            <StackLine techs={site.techs} className="mt-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
