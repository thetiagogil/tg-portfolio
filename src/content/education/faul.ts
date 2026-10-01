import type { Degree } from "../types";

export const faul: Degree = {
  kind: "education",
  slug: "faul",
  title: {
    en: "Integrated Master's in Architecture",
    pt: "Mestrado Integrado em Arquitetura",
  },
  org: {
    en: "Faculty of Architecture, University of Lisbon",
    pt: "Faculdade de Arquitetura, Universidade de Lisboa",
  },
  link: "https://www.fa.ulisboa.pt/index.php/en",
  dateStart: "2014-09-01",
  dateEnd: "2022-07-31",
  techs: ["revit", "autocad", "photoshop"],
  summary: {
    en: "Architecture degree that shaped my foundation in systems thinking, spatial design, visual communication, project development, and human-centered problem solving.",
    pt: "Formação em arquitetura que construiu a minha base em pensamento sistémico, design espacial, comunicação visual, desenvolvimento de projeto e resolução de problemas centrada nas pessoas.",
  },
  overview: {
    en: [
      [
        "FAUL gave me the design foundation I still use in software. The degree trained me to work with constraints, systems, spatial thinking, critique, presentation, and human-centered decisions. It also shaped how I organize complex information, communicate ideas visually, and think through experiences before moving into execution. My thesis connected architecture with video games, exploring what architectural design can learn from interactive spaces and player experience.",
      ],
    ],
    pt: [
      [
        "A FAUL deu-me a base de design que continuo a usar em software. A formação treinou-me a trabalhar com constraints, sistemas, pensamento espacial, crítica, apresentação e decisões centradas nas pessoas. Também moldou a forma como organizo informação complexa, comunico ideias visualmente e penso em experiências antes de passar para execução. A minha tese ligou arquitetura e videojogos, explorando o que o design arquitetónico pode aprender com espaços interativos e experiência do jogador.",
      ],
    ],
  },
  scope: [
    {
      title: {
        en: "Design",
        pt: "Design",
      },
      text: {
        en: "Spatial design, urban context and architectural systems: the design foundation I still use in software.",
        pt: "Design espacial, contexto urbano e sistemas arquitetónicos: a base de design que ainda uso em software.",
      },
    },
    {
      title: {
        en: "Process",
        pt: "Processo",
      },
      text: {
        en: "Developing projects through constraints, iteration and critique, and thinking through the experience before building.",
        pt: "Desenvolvimento de projeto através de constraints, iteração e crítica, pensando na experiência antes de construir.",
      },
    },
    {
      title: {
        en: "Communication",
        pt: "Comunicação",
      },
      text: {
        en: "Visual communication, technical drawings and presentations, and organizing complex information clearly.",
        pt: "Comunicação visual, desenho técnico e apresentações, e organização clara de informação complexa.",
      },
    },
    {
      title: {
        en: "Research",
        pt: "Investigação",
      },
      text: {
        en: "A master's thesis on what architecture can learn from video games, game spaces and player experience.",
        pt: "Uma tese de mestrado sobre o que a arquitetura pode aprender com os videojogos, os espaços de jogo e a experiência do jogador.",
      },
    },
  ],
  products: [
    {
      label: {
        en: "Master's thesis",
        pt: "Tese de mestrado",
      },
      description: {
        en: "Research about how architecture connects with video games, and what architecture can learn from game spaces, interaction, and player experience.",
        pt: "Investigação sobre como a arquitetura se liga aos videojogos, e o que a arquitetura pode aprender com espaços de jogo, interação e experiência do jogador.",
      },
      href: "/education/faul/thesis.pdf",
    },
  ],
  chart: {
    label: {
      en: "University of Lisbon",
      pt: "Universidade de Lisboa",
    },
    role: {
      en: "Architecture",
      pt: "Arquitetura",
    },
    labelNarrow: "ULisboa",
  },
};
