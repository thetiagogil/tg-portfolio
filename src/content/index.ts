import type { Certification, Degree, ISODate, Project, Role } from "./types";
import { easyqa } from "./projects/easyqa";
import { echoes } from "./projects/echoes";
import { finAce } from "./projects/fin-ace";
import { giraffesVsSea } from "./projects/giraffes-vs-sea";
import { houseOfLegends } from "./projects/house-of-legends";
import { lifeflow } from "./projects/lifeflow";
import { onesbryne } from "./projects/onesbryne";
import { portfolios } from "./projects/portfolios";
import { rankex } from "./projects/rankex";
import { talio } from "./projects/talio";
import { trackio } from "./projects/trackio";
import { uparque } from "./projects/uparque";
import { voydex } from "./projects/voydex";
import { wordlechain } from "./projects/wordlechain";
import { aquasis } from "./experience/aquasis";
import { crespassos } from "./experience/crespassos";
import { subvisual } from "./experience/subvisual";
import { talentProtocol } from "./experience/talent-protocol";
import { faul } from "./education/faul";
import { ironhack } from "./education/ironhack";
import { agile } from "./certifications/agile";
import { outsystems } from "./certifications/outsystems";
import { reactNative } from "./certifications/react-native";

export { profile } from "./profile";
export { MAIN_STACK, TOOLS, TOOL_GROUPS, toolName } from "./stack";
export type * from "./types";
export type { ToolGroup, ToolId } from "./stack";

const time = (d: ISODate) => Date.parse(d);
const newestFirst = <T extends { dateStart: ISODate }>(items: T[]) =>
  [...items].sort((a, b) => time(b.dateStart) - time(a.dateStart));

/** Newest first, strictly by start date. */
export const projects: Project[] = newestFirst([
  easyqa,
  echoes,
  finAce,
  giraffesVsSea,
  houseOfLegends,
  lifeflow,
  onesbryne,
  portfolios,
  rankex,
  talio,
  trackio,
  uparque,
  voydex,
  wordlechain,
]);
export const roles: Role[] = newestFirst([
  aquasis,
  crespassos,
  subvisual,
  talentProtocol,
]);
export const degrees: Degree[] = newestFirst([faul, ironhack]);
export const certifications: Certification[] = newestFirst([
  agile,
  outsystems,
  reactNative,
]);

export const featuredProjects = projects.filter((p) => p.featured);

export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
export const roleBySlug = (slug: string) => roles.find((r) => r.slug === slug);
export const degreeBySlug = (slug: string) =>
  degrees.find((d) => d.slug === slug);

/** The role with no end date. */
export const currentRole = roles.find((r) => r.dateEnd === null);

/** A role or degree that lists this project among its projects ("Context" on the project page). */
export const parentsOf = (slug: string) =>
  [...roles, ...degrees].filter((r) => r.projects?.includes(slug));
