import type { ToolId } from "./stack";

export const LANGS = ["en", "pt"] as const;
export type Lang = (typeof LANGS)[number];

export type L<T = string> = Record<Lang, T>;

export type ISODate = `${number}-${number}-${number}`;

export const CATEGORIES = ["experience", "projects", "education", "certifications"] as const;
export type Category = (typeof CATEGORIES)[number];

export type EntryRef = `${"projects" | "experience" | "education"}/${string}`;

export type Paragraph = (string | { text: string; to: EntryRef })[];

export const PROJECT_TYPES = ["client", "personal", "learning"] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export type ProjectStatus = "completed" | "in progress" | "planned";

export type Project = {
  slug: string;
  title: string;
  type: ProjectType;
  status: ProjectStatus;
  dateStart: ISODate;
  dateEnd?: ISODate | null;
  featured?: boolean;
  techs: ToolId[];
  links?: { site?: string; repo?: string };
  images: string[];
  subtitle: L;
  summary: L;
  brief: L<Paragraph[]>;
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
  title: L;
  org: L;
  link?: string;
  documents?: { label: L; href: string }[];
  dateStart: ISODate;
  dateEnd: ISODate | null;
  techs: ToolId[];
  summary: L;
  overview: L<Paragraph[]>;
  scope: ScopePoint[];
  products?: Product[];
  projects?: string[];
  chart?: { label: L; role: L; labelNarrow?: string };
};

export type Role = RecordBase & { kind: "experience" };
export type Degree = RecordBase & { kind: "education" };

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
  cv: string;
  portrait: string;
};
