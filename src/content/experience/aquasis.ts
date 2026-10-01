import type { Role } from "../types";

export const aquasis: Role = {
  kind: "experience",
  slug: "aquasis",
  title: {
    en: "Frontend Developer",
    pt: "Frontend Developer",
  },
  org: {
    en: "Aquasis",
    pt: "Aquasis",
  },
  link: "https://aquasis.pt/",
  dateStart: "2025-01-01",
  dateEnd: null,
  techs: [
    "react",
    "typescript",
    "zustand",
    "bootstrap",
    "postgresql",
    "dotnet",
  ],
  summary: {
    en: "Frontend role on Aquaworks, Aquasis' water-system management platform, focused on product UI, new modules, refactoring, manual QA, and some .NET work.",
    pt: "Função frontend no Aquaworks, a plataforma de gestão de sistemas de água da Aquasis, focada em UI de produto, novos módulos, refactoring, testes manuais e algum trabalho com .NET.",
  },
  overview: {
    en: [
      [
        "Aquasis builds software for water supply, wastewater sanitation, and solid waste management. I work on Aquaworks, its main private application, as a Frontend Developer and one of the main frontend references in the team. My work covers refactoring old code, building new features, designing interfaces, manually testing, optimizing workflows, connecting frontend screens to backend and database behavior, and starting to work a little with .NET. I also work closely with clients, especially on newer Aquaworks modules such as Laboratory and Maintenance Plans.",
      ],
    ],
    pt: [
      [
        "A Aquasis cria software para gestão de abastecimento de água, saneamento de águas residuais e resíduos sólidos. Trabalho no Aquaworks, a sua principal aplicação privada, como Frontend Developer e uma das principais referências frontend da equipa. O meu trabalho inclui refactoring de código antigo, criação de novas funcionalidades, desenho de interfaces, testes manuais, otimização de workflows, ligação de ecrã frontend ao backend e base de dados, e algum trabalho com .NET. Também trabalho perto dos clientes, especialmente em novos módulos do Aquaworks como Laboratório e Planos de Manutenção.",
      ],
    ],
  },
  scope: [
    {
      title: {
        en: "Core team",
        pt: "Equipa principal",
      },
      text: {
        en: "One of the main frontend developers on Aquaworks, Aquasis' platform for water supply, wastewater and waste management.",
        pt: "Um dos principais frontend developers no Aquaworks, a plataforma da Aquasis para gestão de água, saneamento e resíduos.",
      },
    },
    {
      title: {
        en: "Design reference",
        pt: "Referência de design",
      },
      text: {
        en: "The team's reference for interface decisions: I design screens, review UI work and help colleagues with frontend questions.",
        pt: "A referência da equipa nas decisões de interface: desenho ecrãs, revejo trabalho de UI e ajudo colegas em questões de frontend.",
      },
    },
    {
      title: {
        en: "Frontend ownership",
        pt: "Ownership frontend",
      },
      text: {
        en: "Refactoring old code, building new features, optimizing workflows and connecting screens to the backend, all tested by hand.",
        pt: "Refactoring de código antigo, novas funcionalidades, otimização de workflows e ligação dos ecrãs ao backend, tudo testado manualmente.",
      },
    },
    {
      title: {
        en: "Clients and .NET",
        pt: "Clientes e .NET",
      },
      text: {
        en: "Working closely with clients on newer modules like Laboratory and Maintenance Plans, and taking first steps with .NET.",
        pt: "Trabalho próximo com clientes em módulos novos como Laboratório e Planos de Manutenção, e os primeiros passos com .NET.",
      },
    },
  ],
  products: [
    {
      label: {
        en: "Aquaworks",
        pt: "Aquaworks",
      },
      description: {
        en: "Private operational platform for managing water supply, wastewater sanitation, solid waste, work orders, routines, and infrastructure workflows, including new Laboratory and Maintenance Plans modules.",
        pt: "Plataforma operacional privada para gerir abastecimento de água, saneamento de águas residuais, resíduos sólidos, ordens de trabalho, rotinas e workflows de infraestrutura, incluindo novos módulos de Laboratório e Planos de Manutenção.",
      },
    },
  ],
};
