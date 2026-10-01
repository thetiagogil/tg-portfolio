import type { Project } from "../types";

export const portfolios: Project = {
  slug: "portfolios",
  title: "Portfolios",
  type: "personal",
  status: "completed",
  dateStart: "2024-02-05",
  techs: [],
  images: [],
  subtitle: {
    en: "Portfolio collection",
    pt: "Coleção de portfolios",
  },
  summary: {
    en: "A grouped entry for portfolio websites, with each portfolio listed by name, link, and stack.",
    pt: "Uma entrada agrupada para websites de portfolio, com cada portfolio listado por nome, link e stack.",
  },
  brief: {
    en: [
      [
        "Portfolios groups portfolio websites into one collection instead of treating every portfolio as a separate project.",
      ],
    ],
    pt: [
      [
        "Portfolios agrupa websites de portfolio numa só coleção em vez de tratar cada portfolio como um projeto separado.",
      ],
    ],
  },
  collection: [
    {
      label: "Cardex Portfolio",
      href: "https://cardex-portfolio.pages.dev/",
      techs: ["react", "typescript", "tailwind", "radix"],
    },
    {
      label: "Pinkex Portfolio",
      href: "https://pinkex-portfolio.pages.dev/",
      techs: ["react", "typescript", "tailwind", "radix"],
    },
  ],
};
