import { StackLine } from "@/components/entries/stack";
import { Icon } from "@/components/ui/icon";
import type { Project } from "@/content/types";

type ProjectCollectionProps = {
  sites: NonNullable<Project["collection"]>;
};

export function ProjectCollection({ sites }: ProjectCollectionProps) {
  return (
    <ul className="border-line border-t">
      {sites.map((site) => (
        <li key={site.href} className="border-line border-b">
          <a
            className="group hover:bg-hover block px-(--row-pad) py-6 transition-colors duration-300"
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
