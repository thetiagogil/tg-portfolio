import type { Degree } from "../types";

export const ironhack: Degree = {
  kind: "education",
  slug: "ironhack",
  title: {
    en: "Full-Stack Development Bootcamp",
    pt: "Bootcamp de Full-Stack Development",
  },
  org: {
    en: "Ironhack",
    pt: "Ironhack",
  },
  link: "https://www.ironhack.com",
  documents: [
    {
      label: {
        en: "View certificate",
        pt: "Ver certificado",
      },
      href: "/education/ironhack/certification.pdf",
    },
  ],
  dateStart: "2023-08-01",
  dateEnd: "2023-11-30",
  techs: ["javascript", "react", "nodejs", "express", "mongodb"],
  summary: {
    en: "Remote English-language full-stack bootcamp focused on JavaScript, React, Node.js, Express, MongoDB, and project-based learning.",
    pt: "Bootcamp full-stack remoto e em inglês, focado em JavaScript, React, Node.js, Express, MongoDB e aprendizagem baseada em projetos.",
  },
  overview: {
    en: [
      [
        "Ironhack was my practical transition into software development. The bootcamp was fully remote, fully in English, and organized around three modules, each with its own project. It compressed frontend, backend, databases, and product delivery into short learning cycles. Those projects later became the base for revamped portfolio apps, keeping the same concepts while improving the UI, code structure, and implementation.",
      ],
    ],
    pt: [
      [
        "A Ironhack foi a minha transição prática para desenvolvimento de software. O bootcamp foi totalmente remoto, totalmente em inglês e organizado em três módulos, cada um com o seu próprio projeto. Comprimiu frontend, backend, bases de dados e entrega de produto em ciclos curtos de aprendizagem. Esses projetos tornaram-se mais tarde a base de apps revistas para o portfolio, mantendo os mesmos conceitos mas melhorando UI, estrutura de código e implementação.",
      ],
    ],
  },
  scope: [
    {
      title: {
        en: "Stack",
        pt: "Stack",
      },
      text: {
        en: "Fundamentals of JavaScript, React, Node.js, Express and MongoDB, from the frontend to the backend and databases.",
        pt: "Fundamentos de JavaScript, React, Node.js, Express e MongoDB, do frontend ao backend e às bases de dados.",
      },
    },
    {
      title: {
        en: "Remote",
        pt: "Remoto",
      },
      text: {
        en: "A fully remote, English-language bootcamp built around short learning cycles.",
        pt: "Um bootcamp totalmente remoto e em inglês, organizado em ciclos curtos de aprendizagem.",
      },
    },
    {
      title: {
        en: "Projects",
        pt: "Projetos",
      },
      text: {
        en: "Three modules, each ending in a project: a browser game, a React app and a full-stack app.",
        pt: "Três módulos, cada um com o seu projeto: um jogo no browser, uma app React e uma app full-stack.",
      },
    },
    {
      title: {
        en: "Iteration",
        pt: "Iteração",
      },
      text: {
        en: "Fast iteration through demos and feedback; the projects later became the base for revamped portfolio apps.",
        pt: "Iteração rápida através de demos e feedback; os projetos serviram depois de base para apps de portfólio renovadas.",
      },
    },
  ],
  projects: ["giraffes-vs-sea", "house-of-legends", "fin-ace"],
  chart: {
    label: {
      en: "Ironhack",
      pt: "Ironhack",
    },
    role: {
      en: "Full-Stack Bootcamp",
      pt: "Full-Stack Bootcamp",
    },
  },
};
