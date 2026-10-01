import type { Project } from "../types";

export const finAce: Project = {
  slug: "fin-ace",
  title: "Fin/Ace",
  type: "learning",
  status: "completed",
  dateStart: "2023-10-01",
  techs: ["react", "typescript", "mui"],
  links: {
    site: "https://fin-ace.pages.dev/",
    repo: "https://github.com/thetiagogil/03-finace",
  },
  images: [
    "finace/finace-1.png",
    "finace/finace-2.png",
    "finace/finace-3.png",
    "finace/finace-4.png",
    "finace/finace-5.png",
    "finace/finace-6.png",
    "finace/finace-7.png",
  ],
  subtitle: {
    en: "Finance tracker",
    pt: "Tracker de finanças",
  },
  summary: {
    en: "A finance tracker for planned and actual income and expenses, with charts, tables, and local-first data.",
    pt: "Um tracker de finanças para rendimentos e despesas planeados e reais, com gráficos, tabelas e dados local-first.",
  },
  brief: {
    en: [
      [
        "Fin/Ace is a finance tracker built during ",
        {
          text: "Ironhack",
          to: "education/ironhack",
        },
        " for planned and actual income and expenses, later simplified into a local-first public version.",
      ],
    ],
    pt: [
      [
        "Fin/Ace é um tracker de finanças feito durante a ",
        {
          text: "Ironhack",
          to: "education/ironhack",
        },
        " para rendimentos e despesas planeados e reais, depois simplificado numa versão pública local-first.",
      ],
    ],
  },
};
