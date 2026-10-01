import type { Project } from "../types";

export const talio: Project = {
  slug: "talio",
  title: "Talio",
  type: "learning",
  status: "completed",
  dateStart: "2024-02-01",
  techs: ["react", "typescript", "mui"],
  links: {
    site: "https://tal-io.pages.dev/personal/profile",
    repo: "https://github.com/thetiagogil/05-talio",
  },
  images: [
    "talio/talio-1.png",
    "talio/talio-2.png",
    "talio/talio-3.png",
    "talio/talio-4.png",
    "talio/talio-5.png",
    "talio/talio-6.png",
    "talio/talio-7.png",
  ],
  subtitle: {
    en: "Team skills app",
    pt: "App de skills de equipa",
  },
  summary: {
    en: "A team app for comparing skills, organizing tasks on a kanban board, and giving kudos to colleagues.",
    pt: "Uma app de equipa para comparar skills, organizar tarefas num kanban board e dar kudos a colegas.",
  },
  brief: {
    en: [
      [
        "Talio is a team app built during ",
        {
          text: "Subvisual",
          to: "experience/subvisual",
        },
        " for skill comparison, kanban task organization, and kudos across a team.",
      ],
    ],
    pt: [
      [
        "Talio é uma app de equipa feita durante a ",
        {
          text: "Subvisual",
          to: "experience/subvisual",
        },
        " para comparação de skills, organização de tarefas em kanban e kudos dentro de uma equipa.",
      ],
    ],
  },
};
