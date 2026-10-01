import type { Project } from "../types";

export const giraffesVsSea: Project = {
  slug: "giraffes-vs-sea",
  title: "Giraffes vs Sea",
  type: "learning",
  status: "completed",
  dateStart: "2023-08-01",
  techs: ["html", "css", "javascript"],
  links: {
    site: "https://thetiagogil.github.io/01-giraffes-vs-sea/",
    repo: "https://github.com/thetiagogil/01-giraffes-vs-sea",
  },
  images: [
    "giraffes-vs-sea/giraffes-vs-sea-1.png",
    "giraffes-vs-sea/giraffes-vs-sea-2.png",
    "giraffes-vs-sea/giraffes-vs-sea-3.png",
    "giraffes-vs-sea/giraffes-vs-sea-4.png",
  ],
  subtitle: {
    en: "Math combat browser game",
    pt: "Jogo de combate matemático",
  },
  summary: {
    en: "A browser game where players solve math problems to defend a ship from incoming enemies.",
    pt: "Um jogo de browser onde jogadores resolvem problemas de matemática para defender um navio de inimigos.",
  },
  brief: {
    en: [
      [
        "Giraffes vs Sea is a browser math combat game built during ",
        {
          text: "Ironhack",
          to: "education/ironhack",
        },
        ", where players solve math problems before enemies reach the ship.",
      ],
    ],
    pt: [
      [
        "Giraffes vs Sea é um jogo de combate matemático feito durante a ",
        {
          text: "Ironhack",
          to: "education/ironhack",
        },
        ", onde jogadores resolvem problemas de matemática antes dos inimigos chegarem ao navio.",
      ],
    ],
  },
};
