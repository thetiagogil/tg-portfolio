// The content model. Every entry keeps English and Portuguese side by side (see docs/CONTENT.md).
import type { ToolId } from "./stack";

export const LANGS = ["en", "pt"] as const;
export type Lang = (typeof LANGS)[number];

/** A value in both languages. */
export type L<T = string> = Record<Lang, T>;

/** "2025-01-01", read and formatted in UTC. */
export type ISODate = `${number}-${number}-${number}`;

/** The four collections, in the order the Timeline lists them. */
export const CATEGORIES = ["experience", "projects", "education", "certifications"] as const;
export type Category = (typeof CATEGORIES)[number];

/** A link from inside a paragraph to another entry's page. */
export type EntryRef = `${"projects" | "experience" | "education"}/${string}`;

/** A paragraph: plain text, with optional links to other entries. */
export type Paragraph = (string | { text: string; to: EntryRef })[];

/** Who a project was for. */
export const PROJECT_TYPES = ["client", "personal", "learning"] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export type ProjectStatus = "completed" | "in progress" | "planned";

export type Project = {
  slug: string;
  /** Product names aren't translated. */
  title: string;
  type: ProjectType;
  status: ProjectStatus;
  dateStart: ISODate;
  dateEnd?: ISODate | null;
  /** One of the three projects on Home. */
  featured?: boolean;
  techs: ToolId[];
  links?: { site?: string; repo?: string };
  /** Paths inside `assets/projects/` ("voydex/voydex-1.png"); the first is the cover and the link preview. */
  images: string[];
  /** One line on cards: "Pokémon game companion". */
  subtitle: L;
  /** One or two sentences for the Timeline list. */
  summary: L;
  /** The project page's brief (large text, keep it short). */
  brief: L<Paragraph[]>;
  /** Grouped sub-entries, such as the portfolio sites. */
  collection?: { label: string; href: string; techs: ToolId[] }[];
};

export type ScopePoint = {
  title: L;
  text: L;
};

export type Product = {
  label: L;
  description: L;
  href?: string;
  techs?: ToolId[];
};

type RecordBase = {
  slug: string;
  /** Role titles are never translated; degree names are. */
  title: L;
  org: L;
  /** The organisation's site. */
  link?: string;
  /** PDFs shown beside the organisation link (only when not already in `products`). */
  documents?: { label: L; href: string }[];
  dateStart: ISODate;
  /** null = current. */
  dateEnd: ISODate | null;
  techs: ToolId[];
  /** One or two sentences for the Timeline list. */
  summary: L;
  /** The page's main text (reading size). */
  overview: L<Paragraph[]>;
  scope: ScopePoint[];
  /** Roles: products worked on. Degrees: highlights (the thesis). */
  products?: Product[];
  /** Project slugs from this period. */
  projects?: string[];
  /** Shorter labels for the Timeline chart, when the full ones don't fit. */
  chart?: { label: L; role: L; labelNarrow?: string };
};

export type Role = RecordBase & { kind: "experience" };
export type Degree = RecordBase & { kind: "education" };

/** A role or a degree: the Timeline entries with a page of their own. */
export type RecordEntry = Role | Degree;

export type Certification = {
  slug: string;
  title: string;
  org: string;
  link: string;
  dateStart: ISODate;
  techs: ToolId[];
  summary: L;
};

export type Profile = {
  name: string;
  email: string;
  location: L;
  links: { github: string; linkedin: string };
  /** Path under public/. */
  cv: string;
  /** File name in assets/portrait/. */
  portrait: string;
};
