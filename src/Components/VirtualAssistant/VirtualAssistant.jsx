import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaHeadphones,
  FaPaperPlane,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa";
import { useTranslation } from "../../hooks/useTranslation";
import "./VirtualAssistant.css";

const PHONE_NUMBER = "5561981774548";
const ENABLE_SESSION_MEMORY = true;
const SESSION_STORAGE_KEY = "portfolio-virtual-assistant-session-v1";
const VISIT_STORAGE_KEY = "portfolio-virtual-assistant-visited-v1";

const QUALIFICATION_ORDER = ["projectType", "timeline", "budget"];

const QUALIFICATION_MATCHERS = {
  projectType: {
    landing: /(landing|lp|pagina|page)/,
    webSystem: /(sistema|system|plataforma|platform|dashboard|painel)/,
    ecommerce: /(e-?commerce|loja|store|shop)/,
    aiAgent: /(agente|agent|ia|ai|chatbot|assistente)/,
  },
  timeline: {
    fast: /(7|15|rapido|urgent|urgente|quick)/,
    month: /(1\s*mes|1\s*month|um mes|one month|30 dias)/,
    quarter: /(2|3|dois|tres|two|three|meses|months)/,
    flexible: /(analise|flexivel|flexible|conversar|discuss)/,
  },
  budget: {
    low: /(ate|ate\s*3|3k|3000|baixo|low)/,
    medium: /(3\s*a\s*8|3k\s*-\s*8k|medio|medium|8000|8k)/,
    high: /(8k\+|acima|high|alto|premium|enterprise)/,
    discuss: /(conversar|discuss|nao sei|not sure|indefinido)/,
  },
};

const detectProfileIntent = (text) => {
  if (/(recruiter|recrutador|vaga|hiring)/.test(text)) return "recruiter";
  if (/(cliente|client|orcamento|quote|contratar|hire|projeto)/.test(text))
    return "client";
  if (
    /(dev|developer|tecnico|technical|codigo|code|arquitetura|architecture)/.test(
      text,
    )
  )
    return "technical";
  return null;
};

const emitAssistantEvent = (name, detail) => {
  try {
    window.dispatchEvent(
      new CustomEvent("portfolio-virtual-assistant-event", {
        detail: { name, ...detail },
      }),
    );
  } catch {
    // Ignore telemetry failures.
  }
};

const LANGUAGE_CONTENT = {
  pt: {
    firstVisitMessage:
      "Oi! Eu sou o Agente Virtual do Yago. Uma das novidades aqui e o Yago Dev Lab: um laboratorio tecnico para mostrar na pratica componentes, padroes, testes e acessibilidade, ajudando recrutadores, clientes e devs a entender como as solucoes sao construidas. Posso te guiar por ele ou te mostrar projetos, servicos e contato.",
    initialMessages: [
      "Oi! Sou o assistente virtual do Yago. Uma novidade e o Yago Dev Lab para explorar como as solucoes sao pensadas na pratica. Quer que eu te mostre?",
      "Boas-vindas! Posso te guiar pelo portfolio e ajustar acessibilidade rapidamente.",
      "Oi, tudo bem? Posso te ajudar com informacoes do Yago e melhorias de usabilidade.",
    ],
    title: "Atendente Virtual",
    subtitle: "Sem armazenamento de dados",
    inputPlaceholder: "Pergunte sobre projetos, servicos, sobre ou contato",
    closeChatLabel: "Fechar chat",
    openChatLabel: "Abrir atendente virtual",
    sendLabel: "Enviar mensagem",
    clearHistoryLabel: "Limpar conversa",
    whatsappLabel: "Falar no WhatsApp",
    headerWhatsappMessage: "Quero falar com Yago sobre um projeto.",
    emptyInputReply:
      "Me conta sua duvida e eu te ajudo com projetos, servicos, sobre o Yago ou contato.",
    projectListIntro: "Claro! Aqui estao alguns projetos do Yago:",
    projectOpenPrefix: "Abrir",
    greetingReplies: [
      "Oi! Eu sou o atendente virtual do Yago. Posso te mostrar projetos, servicos, sobre ele e te levar para contato.",
      "Que bom te ver aqui! Posso te ajudar com projetos, servicos ou te direcionar para falar com o Yago.",
    ],
    servicesReplies: [
      "Yago atua com desenvolvimento Front-end, Back-end e Full Stack, criando sites e solucoes completas para negocio.",
      "Os servicos incluem desenvolvimento de interfaces, sistemas e projetos completos de ponta a ponta.",
    ],
    aboutReplies: [
      "Yago Cerqueira Regis e desenvolvedor Full Stack, focado em experiencias web modernas, performance e boas praticas.",
      "Yago trabalha com tecnologia e design de experiencia para transformar ideias em produtos digitais eficientes.",
    ],
    contactReplies: [
      "Perfeito! Posso te levar para a pagina de contato para voce falar direto com o Yago via WhatsApp.",
      "Boa escolha. Vou te direcionar para o contato para conversar diretamente com o Yago.",
    ],
    unknownReplies: [
      "No momento eu respondo sobre projetos, servicos, sobre o Yago e contato. Como este portfolio nao possui backend nem banco de dados, nenhuma informacao e salva.",
      "Posso te ajudar com projetos, servicos, sobre e contato. Este chat nao salva dados porque o site nao usa backend/banco de dados.",
    ],
    fallbackSuggestionIntro:
      "Se quiser, posso te guiar por um caminho rapido. Escolha uma opcao:",
    accessibilityReplies: [
      "Posso te ajudar com acessibilidade. Consigo abrir o painel, aumentar fonte, ativar alto contraste, alterar tema e resetar configuracoes.",
      "Perfeito. Vou te auxiliar com acessibilidade para deixar a leitura mais confortavel.",
    ],
    accessibilityHelpReply:
      "Aqui estao alguns atalhos de acessibilidade que posso aplicar agora:",
    accessibilityDoneTemplate: "Pronto! Apliquei: {{target}}.",
    actionNavigateTemplate: "Perfeito! Vou te levar para {{target}}.",
    actions: {
      projects: "projetos",
      about: "sobre",
      services: "servicos",
      contact: "contato",
      devLab: "yago dev lab",
      recruiterMode: "sou recrutador",
      clientMode: "sou cliente",
      technicalMode: "sou dev",
      startConsultant: "diagnostico rapido",
    },
    profileGuidance: {
      recruiter:
        "Perfeito. Para recrutador, recomendo ver projetos com contexto, Yago Dev Lab e cases tecnicos.",
      client:
        "Excelente. Para cliente, recomendo servicos, diagnostico rapido e contato para proposta.",
      technical:
        "Otimo. Para perfil tecnico, o melhor caminho e Yago Dev Lab, arquiteturas e snippets.",
    },
    qualification: {
      intro:
        "Posso fazer um diagnostico rapido em 3 perguntas para te recomendar o melhor formato de projeto.",
      doneTitle: "Diagnostico concluido.",
      summaryTemplate:
        "Resumo: tipo={{projectType}}, prazo={{timeline}}, investimento={{budget}}.",
      recommendation:
        "Com base nisso, recomendo iniciar com escopo objetivo e cronograma por fases para acelerar entrega com seguranca.",
      questions: {
        projectType: "Qual tipo de projeto voce quer priorizar?",
        timeline: "Qual prazo voce imagina para iniciar/entregar?",
        budget: "Faixa de investimento inicial aproximada?",
      },
      options: {
        projectType: {
          landing: "Landing page",
          webSystem: "Sistema web",
          ecommerce: "E-commerce",
          aiAgent: "Agente de IA",
        },
        timeline: {
          fast: "7 a 15 dias",
          month: "Ate 1 mes",
          quarter: "2 a 3 meses",
          flexible: "Ainda em analise",
        },
        budget: {
          low: "Ate R$ 3k",
          medium: "R$ 3k a R$ 8k",
          high: "Acima de R$ 8k",
          discuss: "Prefiro conversar",
        },
      },
    },
    devLabReplies: [
      "O Yago Dev Lab e um laboratorio tecnico com exemplos reais de componentes, design patterns, testes, acessibilidade e arquitetura.",
      "No Yago Dev Lab voce consegue validar rapidamente como o Yago pensa codigo, qualidade, acessibilidade e tomada de decisao tecnica.",
    ],
    devLabTutorialReply:
      "Tutorial rapido do Yago Dev Lab:\n1) Abra a secao Dev Lab no menu ou pelo botao da home.\n2) Escolha uma aba: Playground, Components, Patterns, Tests, Accessibility, Architecture ou Snippets.\n3) Leia o contexto do card e, quando existir, copie o codigo para acelerar prototipos.\n4) Use Playground para simular cenarios rapidos e validar ideias antes de implementar.",
    devLabPurposeReply:
      "Para que serve: o Yago Dev Lab mostra capacidade tecnica na pratica, reduz tempo de descoberta de solucoes e facilita conversa tecnica com recrutadores, clientes e devs.",
    devLabHelpReply:
      "Como pode ajudar: recrutadores avaliam profundidade tecnica, clientes entendem qualidade de entrega e devs aproveitam snippets, patterns e referencias de arquitetura.",
    accessibilityActions: {
      openPanel: "abrir painel de acessibilidade",
      increaseFont: "aumentar fonte",
      toggleContrast: "alternar contraste",
      darkTheme: "ativar tema escuro",
      resetAll: "resetar acessibilidade",
    },
    projects: [
      {
        name: "TeleGas Monte Verde",
        description:
          "Landing page comercial moderna para distribuidora de gas, com SEO e foco em conversao.",
        link: "https://telegasmonteverde.com.br/",
      },
      {
        name: "Togyro Group Victory",
        description:
          "Site institucional com visual futurista, animacoes suaves e experiencia responsiva.",
        link: "https://togyrogroupvictory.com/",
      },
      {
        name: "TogyroStore",
        description:
          "SaaS para criacao de lojas, landing pages e delivery com gestao completa.",
        link: "https://togyrostore.com.br/venda.html",
      },
      {
        name: "EcoSempre",
        description:
          "Plataforma ambiental para conscientizacao sobre descarte correto de lixo eletronico.",
        link: "https://ecosempre.netlify.app/#home",
      },
      {
        name: "Raha Saude e Estetica",
        description:
          "Site para clinica com foco em apresentacao de servicos e captacao de clientes.",
        link: "https://www.rahaclin.com.br/",
      },
    ],
  },
  en: {
    firstVisitMessage:
      "Hi! I am Yago's Virtual Agent. One of the new highlights here is Yago Dev Lab: a technical lab that shows components, patterns, tests, and accessibility in practice, helping recruiters, clients, and developers understand how solutions are built. I can guide you through it or show projects, services, and contact.",
    initialMessages: [
      "Hi! I am Yago's virtual assistant. A new highlight is Yago Dev Lab so you can explore how solutions are designed in practice. Want me to show you?",
      "Welcome! I can guide you through the portfolio and apply accessibility adjustments quickly.",
      "Hi there! I can help with Yago's information and usability improvements.",
    ],
    title: "Virtual Assistant",
    subtitle: "No data storage",
    inputPlaceholder: "Ask about projects, services, about, or contact",
    closeChatLabel: "Close chat",
    openChatLabel: "Open virtual assistant",
    sendLabel: "Send message",
    clearHistoryLabel: "Clear chat",
    whatsappLabel: "Chat on WhatsApp",
    headerWhatsappMessage: "I would like to talk with Yago about a project.",
    emptyInputReply:
      "Tell me what you need and I can help with projects, services, about Yago, or contact.",
    projectListIntro: "Sure! Here are some of Yago's projects:",
    projectOpenPrefix: "Open",
    greetingReplies: [
      "Hi! I am Yago's virtual assistant. I can show projects, services, about info, and direct contact.",
      "Welcome! I can help you explore projects, services, and the fastest way to contact Yago.",
    ],
    servicesReplies: [
      "Yago works with Front-end, Back-end, and Full Stack development, delivering complete business solutions.",
      "Services include modern websites, robust systems, and end-to-end product development.",
    ],
    aboutReplies: [
      "Yago Cerqueira Regis is a Full Stack developer focused on modern web experiences, performance, and clean architecture.",
      "Yago combines development and UX thinking to turn ideas into practical digital products.",
    ],
    contactReplies: [
      "Great! I can take you to the contact page so you can speak directly with Yago on WhatsApp.",
      "Perfect, I will direct you to contact so you can reach Yago quickly.",
    ],
    unknownReplies: [
      "Right now I can answer about projects, services, about Yago, and contact. This chat does not store data because this portfolio has no backend/database.",
      "I can help with projects, services, about, and contact. No data is saved because this website runs without backend or database.",
    ],
    fallbackSuggestionIntro:
      "If you want, I can guide you through a quick path. Choose one option:",
    accessibilityReplies: [
      "I can help with accessibility. I can open the panel, increase font size, enable high contrast, change theme, and reset settings.",
      "Perfect. I will assist you with accessibility so reading is more comfortable.",
    ],
    accessibilityHelpReply:
      "Here are accessibility shortcuts I can apply right now:",
    accessibilityDoneTemplate: "Done! I applied: {{target}}.",
    actionNavigateTemplate: "Perfect! I will take you to {{target}}.",
    actions: {
      projects: "projects",
      about: "about",
      services: "services",
      contact: "contact",
      devLab: "yago dev lab",
      recruiterMode: "i am a recruiter",
      clientMode: "i am a client",
      technicalMode: "i am a developer",
      startConsultant: "quick diagnosis",
    },
    profileGuidance: {
      recruiter:
        "Great. For recruiters, I recommend projects with business context, Yago Dev Lab, and technical case studies.",
      client:
        "Excellent. For clients, I recommend services, quick diagnosis, and direct contact for a proposal.",
      technical:
        "Nice. For technical visitors, the best path is Yago Dev Lab, architecture, and snippets.",
    },
    qualification: {
      intro:
        "I can run a quick 3-question diagnosis to recommend the best project format for your goal.",
      doneTitle: "Diagnosis completed.",
      summaryTemplate:
        "Summary: type={{projectType}}, timeline={{timeline}}, investment={{budget}}.",
      recommendation:
        "Based on that, I recommend starting with a focused scope and phased roadmap to speed up delivery safely.",
      questions: {
        projectType: "Which project type do you want to prioritize?",
        timeline: "What timeline do you have in mind to start/deliver?",
        budget: "What is your initial investment range?",
      },
      options: {
        projectType: {
          landing: "Landing page",
          webSystem: "Web system",
          ecommerce: "E-commerce",
          aiAgent: "AI agent",
        },
        timeline: {
          fast: "7 to 15 days",
          month: "Up to 1 month",
          quarter: "2 to 3 months",
          flexible: "Still evaluating",
        },
        budget: {
          low: "Up to R$ 3k",
          medium: "R$ 3k to R$ 8k",
          high: "Above R$ 8k",
          discuss: "Prefer to discuss",
        },
      },
    },
    devLabReplies: [
      "Yago Dev Lab is a technical lab with practical examples of components, design patterns, testing, accessibility and architecture.",
      "In Yago Dev Lab you can quickly evaluate how Yago approaches code quality, accessibility and technical decision-making.",
    ],
    devLabTutorialReply:
      "Quick Yago Dev Lab tutorial:\n1) Open the Dev Lab section from the menu or the home CTA.\n2) Pick a tab: Playground, Components, Patterns, Tests, Accessibility, Architecture, or Snippets.\n3) Read the card context and copy the code when available to speed up prototypes.\n4) Use Playground to simulate scenarios before implementation.",
    devLabPurposeReply:
      "What it is for: Yago Dev Lab demonstrates technical depth in practice, reduces solution discovery time, and improves technical conversations with recruiters, clients and developers.",
    devLabHelpReply:
      "How it helps: recruiters assess engineering depth, clients understand delivery quality, and developers reuse snippets, patterns and architecture references.",
    accessibilityActions: {
      openPanel: "open accessibility panel",
      increaseFont: "increase font size",
      toggleContrast: "toggle contrast",
      darkTheme: "enable dark theme",
      resetAll: "reset accessibility",
    },
    projects: [
      {
        name: "TeleGas Monte Verde",
        description:
          "A modern commercial landing page for a gas distributor, optimized for SEO and conversion.",
        link: "https://telegasmonteverde.com.br/",
      },
      {
        name: "Togyro Group Victory",
        description:
          "Institutional website with a futuristic look, smooth animations, and responsive UX.",
        link: "https://togyrogroupvictory.com/",
      },
      {
        name: "TogyroStore",
        description:
          "A SaaS platform to create online stores, landing pages, and delivery systems.",
        link: "https://togyrostore.com.br/venda.html",
      },
      {
        name: "EcoSempre",
        description:
          "Environmental platform focused on awareness for proper e-waste disposal.",
        link: "https://ecosempre.netlify.app/#home",
      },
      {
        name: "Raha Health and Aesthetics",
        description:
          "A clinic website focused on service showcase and lead generation.",
        link: "https://www.rahaclin.com.br/",
      },
    ],
  },
};

const getBotActions = (content) => ({
  projects: {
    label: content.actions.projects,
    path: "/Portfolio",
    sectionId: "projects-section",
    kind: "navigate",
  },
  about: {
    label: content.actions.about,
    path: "/About",
    sectionId: "about-section",
    kind: "navigate",
  },
  services: {
    label: content.actions.services,
    path: "/",
    sectionId: "services-section",
    kind: "navigate",
  },
  contact: {
    label: content.actions.contact,
    path: "/contato",
    sectionId: "contact-section",
    kind: "navigate",
  },
  devLab: {
    label: content.actions.devLab,
    path: "/",
    sectionId: "dev-lab",
    kind: "navigate",
  },
  recruiterMode: {
    label: content.actions.recruiterMode,
    path: "/",
    sectionId: "profile-mode",
    kind: "profile",
    profile: "recruiter",
  },
  clientMode: {
    label: content.actions.clientMode,
    path: "/",
    sectionId: "profile-mode",
    kind: "profile",
    profile: "client",
  },
  technicalMode: {
    label: content.actions.technicalMode,
    path: "/",
    sectionId: "dev-lab",
    kind: "profile",
    profile: "technical",
  },
  startConsultant: {
    label: content.actions.startConsultant,
    command: "start-qualification",
    kind: "flow",
  },
  accessibilityOpen: {
    label: content.accessibilityActions.openPanel,
    command: "open",
    kind: "accessibility",
  },
  accessibilityFontUp: {
    label: content.accessibilityActions.increaseFont,
    command: "increase-font",
    kind: "accessibility",
  },
  accessibilityContrast: {
    label: content.accessibilityActions.toggleContrast,
    command: "toggle-contrast",
    kind: "accessibility",
  },
  accessibilityDarkTheme: {
    label: content.accessibilityActions.darkTheme,
    command: "set-theme-dark",
    kind: "accessibility",
  },
  accessibilityReset: {
    label: content.accessibilityActions.resetAll,
    command: "reset-all",
    kind: "accessibility",
  },
});

const getVisitContext = () => {
  try {
    const hasVisited = localStorage.getItem(VISIT_STORAGE_KEY) === "true";
    if (!hasVisited) {
      localStorage.setItem(VISIT_STORAGE_KEY, "true");
      return "first-visit";
    }

    return "returning-visit";
  } catch {
    return "returning-visit";
  }
};

const getInitialMessage = (content, visitContext) => {
  if (visitContext === "first-visit" && content.firstVisitMessage) {
    return content.firstVisitMessage;
  }

  if (
    Array.isArray(content.initialMessages) &&
    content.initialMessages.length
  ) {
    const randomIndex = Math.floor(
      Math.random() * content.initialMessages.length,
    );
    return content.initialMessages[randomIndex];
  }

  return content.initialMessage || "";
};

const createInitialMessages = (content, botActions, visitContext) => [
  createBotMessage(0, getInitialMessage(content, visitContext), {
    actions: [
      botActions.projects,
      botActions.devLab,
      botActions.services,
      botActions.startConsultant,
      botActions.recruiterMode,
      botActions.clientMode,
      botActions.technicalMode,
      botActions.about,
      botActions.contact,
      botActions.accessibilityOpen,
      botActions.accessibilityContrast,
    ],
  }),
];

const sanitize = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const pickRandomReply = (replies) =>
  replies[Math.floor(Math.random() * replies.length)];

const createBotMessage = (id, text, options = {}) => ({
  id,
  sender: "bot",
  text,
  links: options.links || [],
  actions: options.actions || [],
});

const createUserMessage = (id, text) => ({
  id,
  sender: "user",
  text,
});

const getProjectReply = (content, botActions) => {
  const listedProjects = content.projects
    .map((project) => `${project.name}: ${project.description}`)
    .join("\n");

  return {
    text: `${content.projectListIntro}\n${listedProjects}`,
    links: content.projects.map((project) => ({
      label: project.name,
      href: project.link,
    })),
    actions: [botActions.projects, botActions.contact],
  };
};

const getContextualActions = (intent, botActions) => {
  if (intent === "recruiter") {
    return [botActions.projects, botActions.devLab, botActions.recruiterMode];
  }

  if (intent === "client") {
    return [
      botActions.services,
      botActions.startConsultant,
      botActions.contact,
    ];
  }

  if (intent === "technical") {
    return [botActions.devLab, botActions.technicalMode, botActions.projects];
  }

  return [
    botActions.projects,
    botActions.devLab,
    botActions.services,
    botActions.startConsultant,
    botActions.contact,
  ];
};

const buildQualificationQuestion = (content, botActions, stepKey) => {
  const stepOptions = content.qualification.options[stepKey];
  const optionActions = Object.keys(stepOptions).map((optionKey) => ({
    kind: "flow-answer",
    step: stepKey,
    value: optionKey,
    label: stepOptions[optionKey],
  }));

  return {
    text: content.qualification.questions[stepKey],
    actions: [...optionActions, botActions.contact],
  };
};

const resolveQualificationValue = (stepKey, rawText) => {
  const normalizedText = sanitize(rawText);
  const stepMatchers = QUALIFICATION_MATCHERS[stepKey] || {};

  return (
    Object.keys(stepMatchers).find((key) =>
      stepMatchers[key].test(normalizedText),
    ) || null
  );
};

const formatQualificationSummary = (content, answers) =>
  content.qualification.summaryTemplate
    .replace(
      "{{projectType}}",
      content.qualification.options.projectType[answers.projectType] ||
        answers.projectType,
    )
    .replace(
      "{{timeline}}",
      content.qualification.options.timeline[answers.timeline] ||
        answers.timeline,
    )
    .replace(
      "{{budget}}",
      content.qualification.options.budget[answers.budget] || answers.budget,
    );

const getBotReply = (input, content, botActions, previousIntent) => {
  const text = sanitize(input);
  const detectedProfileIntent = detectProfileIntent(text);
  const isProjectIntent =
    /(projeto|projetos|portfolio|portifolio|trabalho|trabalhos|project|projects)/.test(
      text,
    );
  const isServiceIntent = /(servico|servicos|service|services)/.test(text);
  const isAboutIntent =
    /(sobre|about|quem e|quem eh|historia|experiencia|who is)/.test(text);
  const isContactIntent =
    /(contato|contact|whatsapp|falar|talk|orcamento|quote|contratar|hire)/.test(
      text,
    );
  const isQuoteIntent =
    /(orcamento|quote|proposta|proposal|contratar|hire)/.test(text);
  const isDevLabIntent =
    /(dev lab|yago dev lab|laboratorio|laboratory|playground|snippet|snippets|pattern|patterns|arquitetura|architecture)/.test(
      text,
    );
  const isDevLabTutorialIntent =
    /(tutorial|passo a passo|como usar|guia|how to use|walkthrough|guide)/.test(
      text,
    ) &&
    /(dev lab|yago dev lab|laboratorio|laboratory|playground|snippet|pattern)/.test(
      text,
    );
  const isDevLabPurposeIntent =
    /(para que serve|serve para|qual utilidade|como ajuda|what is it for|purpose|benefit|how can it help)/.test(
      text,
    ) && /(dev lab|yago dev lab|laboratorio|laboratory|lab)/.test(text);
  const isGreetingIntent =
    /(ola|oi|hello|hi|tudo bem|bom dia|boa tarde|boa noite|good morning|good afternoon|good evening)/.test(
      text,
    );
  const isAccessibilityIntent =
    /(acessibilidade|accessibility|contraste|contrast|fonte|font|tema|theme|visual|leitura|reader)/.test(
      text,
    );
  const isFontIntent =
    /(aumentar fonte|fonte maior|increase font|larger text|larger font)/.test(
      text,
    );
  const isContrastIntent = /(alto contraste|contrast|contraste)/.test(text);
  const isDarkThemeIntent =
    /(tema escuro|dark mode|dark theme|modo escuro)/.test(text);
  const isResetAccessibilityIntent =
    /(resetar acessibilidade|reset accessibility|resetar tudo)/.test(text);

  if (!text) {
    return {
      text: content.emptyInputReply,
      actions: getContextualActions(previousIntent, botActions),
    };
  }

  const matchedProject = content.projects.find((project) =>
    text.includes(sanitize(project.name)),
  );

  if (matchedProject) {
    return {
      text: `${matchedProject.name}: ${matchedProject.description}`,
      links: [
        {
          label: `${content.projectOpenPrefix} ${matchedProject.name}`,
          href: matchedProject.link,
        },
      ],
      actions: [botActions.projects, botActions.devLab, botActions.contact],
      intent: "recruiter",
    };
  }

  if (detectedProfileIntent === "recruiter") {
    return {
      text: content.profileGuidance.recruiter,
      actions: [
        botActions.projects,
        botActions.devLab,
        botActions.recruiterMode,
      ],
      intent: "recruiter",
    };
  }

  if (detectedProfileIntent === "client") {
    return {
      text: content.profileGuidance.client,
      actions: [
        botActions.services,
        botActions.startConsultant,
        botActions.contact,
      ],
      intent: "client",
    };
  }

  if (detectedProfileIntent === "technical") {
    return {
      text: content.profileGuidance.technical,
      actions: [
        botActions.devLab,
        botActions.technicalMode,
        botActions.projects,
      ],
      intent: "technical",
    };
  }

  if (isProjectIntent) {
    return {
      ...getProjectReply(content, botActions),
      intent: "recruiter",
    };
  }

  if (isServiceIntent) {
    return {
      text: pickRandomReply(content.servicesReplies),
      actions: [
        botActions.services,
        botActions.startConsultant,
        botActions.contact,
      ],
      intent: "client",
    };
  }

  if (isAboutIntent) {
    return {
      text: pickRandomReply(content.aboutReplies),
      actions: [botActions.about, botActions.projects],
      intent: previousIntent || null,
    };
  }

  if (isQuoteIntent) {
    return {
      text: content.qualification.intro,
      actions: [
        botActions.startConsultant,
        botActions.contact,
        botActions.services,
      ],
      startQualification: true,
      intent: "client",
    };
  }

  if (isContactIntent) {
    return {
      text: pickRandomReply(content.contactReplies),
      actions: [botActions.contact, botActions.startConsultant],
      intent: "client",
    };
  }

  if (isDevLabTutorialIntent) {
    return {
      text: `${content.devLabTutorialReply}\n\n${content.devLabHelpReply}`,
      actions: [botActions.devLab, botActions.projects, botActions.contact],
      intent: "technical",
    };
  }

  if (isDevLabPurposeIntent) {
    return {
      text: `${content.devLabPurposeReply}\n${content.devLabHelpReply}`,
      actions: [botActions.devLab, botActions.projects, botActions.contact],
      intent: "technical",
    };
  }

  if (isDevLabIntent) {
    return {
      text: `${pickRandomReply(content.devLabReplies)}\n${content.devLabPurposeReply}`,
      actions: [botActions.devLab, botActions.projects, botActions.contact],
      intent: "technical",
    };
  }

  if (isFontIntent) {
    return {
      text: content.accessibilityDoneTemplate.replace(
        "{{target}}",
        content.accessibilityActions.increaseFont,
      ),
      actions: [botActions.accessibilityFontUp, botActions.accessibilityOpen],
      accessibilityCommand: "increase-font",
      intent: previousIntent || null,
    };
  }

  if (isContrastIntent) {
    return {
      text: content.accessibilityDoneTemplate.replace(
        "{{target}}",
        content.accessibilityActions.toggleContrast,
      ),
      actions: [botActions.accessibilityContrast, botActions.accessibilityOpen],
      accessibilityCommand: "toggle-contrast",
      intent: previousIntent || null,
    };
  }

  if (isDarkThemeIntent) {
    return {
      text: content.accessibilityDoneTemplate.replace(
        "{{target}}",
        content.accessibilityActions.darkTheme,
      ),
      actions: [
        botActions.accessibilityDarkTheme,
        botActions.accessibilityOpen,
      ],
      accessibilityCommand: "set-theme-dark",
      intent: previousIntent || null,
    };
  }

  if (isResetAccessibilityIntent) {
    return {
      text: content.accessibilityDoneTemplate.replace(
        "{{target}}",
        content.accessibilityActions.resetAll,
      ),
      actions: [botActions.accessibilityReset, botActions.accessibilityOpen],
      accessibilityCommand: "reset-all",
      intent: previousIntent || null,
    };
  }

  if (isAccessibilityIntent) {
    return {
      text: `${pickRandomReply(content.accessibilityReplies)}\n${content.accessibilityHelpReply}`,
      actions: [
        botActions.accessibilityOpen,
        botActions.accessibilityFontUp,
        botActions.accessibilityContrast,
        botActions.accessibilityDarkTheme,
        botActions.accessibilityReset,
      ],
      intent: previousIntent || null,
    };
  }

  if (isGreetingIntent) {
    return {
      text: pickRandomReply(content.greetingReplies),
      actions: [
        botActions.projects,
        botActions.devLab,
        botActions.services,
        botActions.startConsultant,
      ],
    };
  }

  return {
    text: `${pickRandomReply(content.unknownReplies)}\n${content.fallbackSuggestionIntro}`,
    actions: getContextualActions(previousIntent, botActions),
    intent: previousIntent || null,
  };
};

const VirtualAssistant = () => {
  const { currentLanguage } = useTranslation();
  const languageCode = currentLanguage === "en" ? "en" : "pt";
  const content = LANGUAGE_CONTENT[languageCode];
  const visitContextRef = useRef(getVisitContext());
  const botActions = useMemo(() => getBotActions(content), [content]);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(() =>
    createInitialMessages(content, botActions, visitContextRef.current),
  );
  const chatBodyRef = useRef(null);
  const pendingScrollRef = useRef(null);
  const userIntentRef = useRef(null);
  const qualificationRef = useRef({
    active: false,
    stepIndex: 0,
    answers: {},
  });
  const messageCounterRef = useRef(1);
  const hasLoadedSessionRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!ENABLE_SESSION_MEMORY || hasLoadedSessionRef.current) return;

    hasLoadedSessionRef.current = true;

    try {
      const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) {
        setMessages(
          createInitialMessages(content, botActions, visitContextRef.current),
        );
        return;
      }

      const parsed = JSON.parse(raw);
      const hasMessages =
        Array.isArray(parsed?.messages) && parsed.messages.length > 0;
      const parsedCounter = Number(parsed?.messageCounter);

      if (hasMessages) {
        setMessages(parsed.messages);
      } else {
        setMessages(
          createInitialMessages(content, botActions, visitContextRef.current),
        );
      }

      if (typeof parsed?.isOpen === "boolean") {
        setIsOpen(parsed.isOpen);
      }

      if (Number.isInteger(parsedCounter) && parsedCounter >= 1) {
        messageCounterRef.current = parsedCounter;
      }

      if (typeof parsed?.intent === "string") {
        userIntentRef.current = parsed.intent;
      }

      if (parsed?.qualification && typeof parsed.qualification === "object") {
        qualificationRef.current = {
          active: Boolean(parsed.qualification.active),
          stepIndex: Number.isInteger(parsed.qualification.stepIndex)
            ? parsed.qualification.stepIndex
            : 0,
          answers:
            parsed.qualification.answers &&
            typeof parsed.qualification.answers === "object"
              ? parsed.qualification.answers
              : {},
        };
      }
    } catch {
      setMessages(
        createInitialMessages(content, botActions, visitContextRef.current),
      );
    }
  }, [content, botActions]);

  useEffect(() => {
    setMessages((prev) => {
      const onlyInitialMessage =
        prev.length === 1 && prev[0]?.id === 0 && prev[0]?.sender === "bot";

      if (!onlyInitialMessage) {
        return prev;
      }

      return createInitialMessages(
        content,
        botActions,
        visitContextRef.current,
      );
    });
  }, [content, botActions]);

  useEffect(() => {
    if (!ENABLE_SESSION_MEMORY || !hasLoadedSessionRef.current) return;

    try {
      sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        JSON.stringify({
          messages,
          isOpen,
          messageCounter: messageCounterRef.current,
          intent: userIntentRef.current,
          qualification: qualificationRef.current,
        }),
      );
    } catch {
      // Ignore storage failures (private mode/quota), chat still works in-memory.
    }
  }, [messages, isOpen]);

  const getNextMessageId = () => {
    const currentId = messageCounterRef.current;
    messageCounterRef.current += 1;
    return currentId;
  };

  useEffect(() => {
    if (!chatBodyRef.current) return;
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }, [messages, isOpen]);

  useEffect(() => {
    const handleOpenRequest = (event) => {
      const requestedMessage =
        typeof event?.detail?.message === "string"
          ? event.detail.message.trim()
          : "";
      const fallbackMessage =
        languageCode === "en"
          ? "Hi! I am the portfolio virtual assistant. How can I help you today and what do you need right now?"
          : "Oi! Sou o agente virtual do portfolio. Como posso te ajudar hoje e do que voce precisa neste momento?";
      const introMessage = requestedMessage || fallbackMessage;

      setIsOpen(true);
      const botMessageId = messageCounterRef.current;
      messageCounterRef.current += 1;

      setMessages((prev) => [
        ...prev,
        createBotMessage(botMessageId, introMessage, {
          actions: [
            botActions.projects,
            botActions.services,
            botActions.devLab,
            botActions.contact,
          ],
        }),
      ]);
    };

    window.addEventListener(
      "portfolio-virtual-assistant-open",
      handleOpenRequest,
    );

    return () => {
      window.removeEventListener(
        "portfolio-virtual-assistant-open",
        handleOpenRequest,
      );
    };
  }, [languageCode, botActions]);

  useEffect(() => {
    if (!pendingScrollRef.current) return;

    const attemptScroll = () => {
      const section = document.getElementById(pendingScrollRef.current);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        pendingScrollRef.current = null;
      }
    };

    const timerId = setTimeout(attemptScroll, 150);
    return () => clearTimeout(timerId);
  }, [location.pathname]);

  const goToSection = (path, sectionId) => {
    if (location.pathname.toLowerCase() !== path.toLowerCase()) {
      pendingScrollRef.current = sectionId;
      navigate(path);
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const appendBotReply = (userText) => {
    const handleQualificationStep = (rawAnswer, forcedValue = null) => {
      const flow = qualificationRef.current;
      if (!flow.active) return null;

      const currentStep = QUALIFICATION_ORDER[flow.stepIndex];
      if (!currentStep) {
        qualificationRef.current = { active: false, stepIndex: 0, answers: {} };
        return null;
      }

      const resolvedValue =
        forcedValue || resolveQualificationValue(currentStep, rawAnswer);

      if (!resolvedValue) {
        return buildQualificationQuestion(content, botActions, currentStep);
      }

      const nextAnswers = {
        ...flow.answers,
        [currentStep]: resolvedValue,
      };

      const nextIndex = flow.stepIndex + 1;

      if (nextIndex < QUALIFICATION_ORDER.length) {
        qualificationRef.current = {
          active: true,
          stepIndex: nextIndex,
          answers: nextAnswers,
        };

        return buildQualificationQuestion(
          content,
          botActions,
          QUALIFICATION_ORDER[nextIndex],
        );
      }

      qualificationRef.current = { active: false, stepIndex: 0, answers: {} };

      return {
        text: `${content.qualification.doneTitle}\n${formatQualificationSummary(content, nextAnswers)}\n${content.qualification.recommendation}`,
        actions: [
          botActions.services,
          botActions.projects,
          botActions.devLab,
          botActions.contact,
        ],
        intent: "client",
      };
    };

    let reply = null;

    if (qualificationRef.current.active) {
      reply = handleQualificationStep(userText);
    }

    if (!reply) {
      reply = getBotReply(userText, content, botActions, userIntentRef.current);
    }

    if (reply.startQualification) {
      qualificationRef.current = { active: true, stepIndex: 0, answers: {} };
      const firstQuestion = buildQualificationQuestion(
        content,
        botActions,
        QUALIFICATION_ORDER[0],
      );
      reply = {
        ...reply,
        text: `${reply.text}\n\n${firstQuestion.text}`,
        actions: firstQuestion.actions,
      };
    }

    if (reply.intent) {
      userIntentRef.current = reply.intent;
      emitAssistantEvent("intent-detected", { intent: reply.intent });
    }

    const botMessageId = getNextMessageId();

    if (reply.accessibilityCommand) {
      window.dispatchEvent(
        new CustomEvent("portfolio-accessibility-command", {
          detail: { command: reply.accessibilityCommand },
        }),
      );
    }

    setMessages((prev) => [
      ...prev,
      createBotMessage(botMessageId, reply.text, {
        links: reply.links,
        actions: reply.actions,
      }),
    ]);
  };

  const handleSend = () => {
    const trimmedText = inputValue.trim();
    if (!trimmedText) return;
    const userMessageId = getNextMessageId();

    setMessages((prev) => [
      ...prev,
      createUserMessage(userMessageId, trimmedText),
    ]);
    setInputValue("");

    setTimeout(() => appendBotReply(trimmedText), 250);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  const handleActionClick = (action) => {
    emitAssistantEvent("action-click", {
      label: action.label,
      kind: action.kind || "navigate",
    });

    if (action.kind === "accessibility") {
      window.dispatchEvent(
        new CustomEvent("portfolio-accessibility-command", {
          detail: { command: action.command },
        }),
      );
      const botMessageId = getNextMessageId();
      const doneText = content.accessibilityDoneTemplate.replace(
        "{{target}}",
        action.label,
      );
      setMessages((prev) => [
        ...prev,
        createBotMessage(botMessageId, doneText),
      ]);
      return;
    }

    if (action.kind === "flow") {
      qualificationRef.current = { active: true, stepIndex: 0, answers: {} };
      const firstQuestion = buildQualificationQuestion(
        content,
        botActions,
        QUALIFICATION_ORDER[0],
      );
      const botMessageId = getNextMessageId();
      setMessages((prev) => [
        ...prev,
        createBotMessage(
          botMessageId,
          `${content.qualification.intro}\n\n${firstQuestion.text}`,
          {
            actions: firstQuestion.actions,
          },
        ),
      ]);
      userIntentRef.current = "client";
      return;
    }

    if (action.kind === "flow-answer") {
      if (!qualificationRef.current.active) {
        qualificationRef.current = { active: true, stepIndex: 0, answers: {} };
      }

      const currentStep =
        QUALIFICATION_ORDER[qualificationRef.current.stepIndex];
      const stepToAnswer = currentStep || action.step;
      const nextAnswers = {
        ...qualificationRef.current.answers,
        [stepToAnswer]: action.value,
      };
      const nextIndex = qualificationRef.current.stepIndex + 1;

      if (nextIndex < QUALIFICATION_ORDER.length) {
        qualificationRef.current = {
          active: true,
          stepIndex: nextIndex,
          answers: nextAnswers,
        };
        const nextQuestion = buildQualificationQuestion(
          content,
          botActions,
          QUALIFICATION_ORDER[nextIndex],
        );
        const botMessageId = getNextMessageId();
        setMessages((prev) => [
          ...prev,
          createBotMessage(botMessageId, nextQuestion.text, {
            actions: nextQuestion.actions,
          }),
        ]);
      } else {
        qualificationRef.current = { active: false, stepIndex: 0, answers: {} };
        const botMessageId = getNextMessageId();
        const doneText = `${content.qualification.doneTitle}\n${formatQualificationSummary(content, nextAnswers)}\n${content.qualification.recommendation}`;
        setMessages((prev) => [
          ...prev,
          createBotMessage(botMessageId, doneText, {
            actions: [
              botActions.services,
              botActions.projects,
              botActions.devLab,
              botActions.contact,
            ],
          }),
        ]);
        userIntentRef.current = "client";
      }

      return;
    }

    if (action.kind === "profile" && action.profile) {
      userIntentRef.current = action.profile;
    }

    goToSection(action.path, action.sectionId);
    const botMessageId = getNextMessageId();
    const navigateText = content.actionNavigateTemplate.replace(
      "{{target}}",
      action.label,
    );

    setMessages((prev) => [
      ...prev,
      createBotMessage(botMessageId, navigateText),
    ]);
  };

  const openWhatsApp = () => {
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(content.headerWhatsappMessage)}`;
    window.open(url, "_blank");
  };

  const handleClearConversation = () => {
    setMessages(
      createInitialMessages(content, botActions, visitContextRef.current),
    );
    setInputValue("");
    messageCounterRef.current = 1;
    pendingScrollRef.current = null;
    userIntentRef.current = null;
    qualificationRef.current = { active: false, stepIndex: 0, answers: {} };

    if (ENABLE_SESSION_MEMORY) {
      try {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      } catch {
        // Ignore storage failures and keep running with in-memory state.
      }
    }
  };

  return (
    <div className="virtual-assistant" aria-live="polite">
      {isOpen && (
        <section className="assistant-chat" aria-label="Atendente Virtual">
          <header className="assistant-header">
            <div>
              <h2>{content.title}</h2>
              <p>{content.subtitle}</p>
            </div>
            <div className="assistant-header-actions">
              <button
                type="button"
                className="assistant-clear"
                onClick={handleClearConversation}
                aria-label={content.clearHistoryLabel}
              >
                {content.clearHistoryLabel}
              </button>
              <button
                type="button"
                className="assistant-close"
                onClick={() => setIsOpen(false)}
                aria-label={content.closeChatLabel}
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>
          </header>

          <div className="assistant-messages" ref={chatBodyRef}>
            {messages.map((message) => (
              <article
                key={message.id}
                className={`assistant-message assistant-message--${message.sender}`}
              >
                <p>{message.text}</p>
                {message.links?.length > 0 && (
                  <div className="assistant-links">
                    {message.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
                {message.actions?.length > 0 && (
                  <div className="assistant-actions">
                    {message.actions.map((action) => (
                      <button
                        key={`${message.id}-${action.sectionId || action.command || action.label}`}
                        type="button"
                        onClick={() => handleActionClick(action)}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="assistant-input-wrapper">
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder={content.inputPlaceholder}
              aria-label="Mensagem para o atendente virtual"
            />
            <button
              type="button"
              onClick={handleSend}
              aria-label={content.sendLabel}
            >
              <FaPaperPlane aria-hidden="true" />
            </button>
          </div>

          <div className="assistant-whatsapp-wrapper">
            <button
              type="button"
              className="assistant-whatsapp"
              onClick={openWhatsApp}
            >
              <FaWhatsapp aria-hidden="true" />
              <span>{content.whatsappLabel}</span>
            </button>
          </div>
        </section>
      )}

      <button
        type="button"
        className="assistant-floating-button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={content.openChatLabel}
      >
        <FaHeadphones aria-hidden="true" />
        <span>{content.title}</span>
      </button>
    </div>
  );
};

export default VirtualAssistant;
