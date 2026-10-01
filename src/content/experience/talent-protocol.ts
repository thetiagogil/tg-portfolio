import type { Role } from "../types";

export const talentProtocol: Role = {
  kind: "experience",
  slug: "talent-protocol",
  title: {
    en: "Full-Stack Developer",
    pt: "Full-Stack Developer",
  },
  org: {
    en: "Talent Protocol",
    pt: "Talent Protocol",
  },
  link: "https://www.talentprotocol.com",
  dateStart: "2024-03-01",
  dateEnd: "2025-02-28",
  techs: ["nextjs", "typescript", "joy", "wagmi", "postgresql"],
  summary: {
    en: "Full-stack role focused on leading frontend delivery across Talent Protocol products, with occasional backend fixes.",
    pt: "Função full-stack focada em liderar a entrega frontend nos produtos da Talent Protocol, com pequenas correções backend quando necessário.",
  },
  overview: {
    en: [
      [
        "Talent Protocol builds products for builders to track what they ship and grow their reputation. I worked there as a Full-Stack Developer and acted as the main frontend developer working closely with the CTO. Most of my work was frontend delivery: building new features, improving existing flows, fixing bugs, manually testing the app, and translating Figma designs into production interfaces. I also made small backend fixes when needed across company projects.",
      ],
    ],
    pt: [
      [
        "A Talent Protocol cria produtos para builders acompanharem o que constroem e desenvolverem a sua reputação. Trabalhei lá como Full-Stack Developer e fui o principal frontend developer, em colaboração próxima com o CTO. A maior parte do meu trabalho foi frontend: criar novas funcionalidades, melhorar flows existentes, corrigir bugs, testar manualmente a app e transformar designs de Figma em interfaces de produção. Também fiz pequenas correções backend quando necessário nos projetos da empresa.",
      ],
    ],
  },
  scope: [
    {
      title: {
        en: "Frontend ownership",
        pt: "Ownership frontend",
      },
      text: {
        en: "The main frontend developer, working closely with the CTO across products like Talent Passport and Build.top.",
        pt: "O principal frontend developer, a trabalhar de perto com o CTO em produtos como o Talent Passport e o Build.top.",
      },
    },
    {
      title: {
        en: "Features",
        pt: "Funcionalidades",
      },
      text: {
        en: "New features and better flows in products that help builders show what they ship and grow their reputation.",
        pt: "Novas funcionalidades e melhores flows em produtos que ajudam builders a mostrar o que constroem e a crescer a sua reputação.",
      },
    },
    {
      title: {
        en: "Design to code",
        pt: "Do design ao código",
      },
      text: {
        en: "Turning Figma designs into production interfaces, as on Build.top, a builder discovery and nomination product.",
        pt: "Transformar designs de Figma em interfaces de produção, como no Build.top, um produto de descoberta e nomeação de builders.",
      },
    },
    {
      title: {
        en: "Quality",
        pt: "Qualidade",
      },
      text: {
        en: "Fixing bugs and testing the apps by hand, plus small backend fixes across company projects when needed.",
        pt: "Correção de bugs e testes manuais das apps, além de pequenas correções de backend nos projetos da empresa quando necessário.",
      },
    },
  ],
  products: [
    {
      label: {
        en: "Talent Passport",
        pt: "Talent Passport",
      },
      description: {
        en: "Builder reputation product with profile, wallet, scoring, and ranking flows.",
        pt: "Produto de reputação para builders com perfil, wallet, scoring e rankings.",
      },
      href: "https://talent.app/",
      techs: ["nextjs", "typescript", "joy"],
    },
    {
      label: {
        en: "Build.top",
        pt: "Build.top",
      },
      description: {
        en: "Builder discovery and nomination product implemented from Figma designs.",
        pt: "Produto de descoberta e nomeação de builders implementado a partir de designs em Figma.",
      },
      href: "https://buildtoken.framer.website/",
      techs: ["nextjs", "typescript", "joy"],
    },
    {
      label: {
        en: "Playground",
        pt: "Playground",
      },
      description: {
        en: "Goals and interaction product maintained across fixes and product updates.",
        pt: "Produto de objetivos e interações mantido entre correções e atualizações de produto.",
      },
      techs: ["react", "typescript", "joy"],
    },
    {
      label: {
        en: "Builder.fi",
        pt: "Builder.fi",
      },
      description: {
        en: "Q&A product maintained across frontend fixes before it was discontinued.",
        pt: "Produto de Q&A mantido entre correções frontend antes de ser descontinuado.",
      },
      techs: ["react", "typescript", "joy"],
    },
  ],
};
