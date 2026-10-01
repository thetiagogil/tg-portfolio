import { agile } from "./certifications/agile";
import { outsystems } from "./certifications/outsystems";
import { reactNative } from "./certifications/react-native";
import { faul } from "./education/faul";
import { ironhack } from "./education/ironhack";
import { aquasis } from "./experience/aquasis";
import { crespassos } from "./experience/crespassos";
import { subvisual } from "./experience/subvisual";
import { talentProtocol } from "./experience/talent-protocol";
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
import type { Certification, Degree, ISODate, Project, RecordEntry, Role } from "./types";

export { profile } from "./profile";
export { MAIN_STACK, TOOL_GROUPS, TOOLS } from "./stack";

function newestFirst<T extends { dateStart: ISODate }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => Date.parse(b.dateStart) - Date.parse(a.dateStart));
}

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
export const roles: Role[] = newestFirst([aquasis, crespassos, subvisual, talentProtocol]);
export const degrees: Degree[] = newestFirst([faul, ironhack]);
export const certifications: Certification[] = newestFirst([agile, outsystems, reactNative]);

export const featuredProjects = projects.filter((project) => project.featured);

/** The role with no end date. */
export const currentRole = roles.find((role) => role.dateEnd === null)!;

export function projectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function roleBySlug(slug: string) {
  return roles.find((role) => role.slug === slug);
}

export function degreeBySlug(slug: string) {
  return degrees.find((degree) => degree.slug === slug);
}

/** The roles and degrees that list this project among their projects ("Context" on the project page). */
export function recordsWithProject(slug: string): RecordEntry[] {
  return [...roles, ...degrees].filter((record) => record.projects?.includes(slug));
}
