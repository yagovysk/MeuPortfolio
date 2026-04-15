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

const LANGUAGE_CONTENT = {
  pt: {
    firstVisitMessage:
      "Oi! Eu sou o Agente Virtual do Yago. Posso te ajudar com projetos, servicos, sobre e contato, e também com acessibilidade para melhorar sua usabilidade (fonte, contraste, tema e painel de acessibilidade).",
    initialMessages: [
      "Oi! Sou o assistente virtual do Yago. Quer ver projetos, servicos ou contato?",
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
    },
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
      "Hi! I am Yago's Virtual Agent. I can help with projects, services, about, and contact, and also with accessibility to improve usability (font size, contrast, theme, and accessibility panel).",
    initialMessages: [
      "Hi! I am Yago's virtual assistant. Want to explore projects, services, or contact?",
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
    },
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
  },
  about: {
    label: content.actions.about,
    path: "/About",
    sectionId: "about-section",
  },
  services: {
    label: content.actions.services,
    path: "/",
    sectionId: "services-section",
  },
  contact: {
    label: content.actions.contact,
    path: "/contato",
    sectionId: "contact-section",
  },
  accessibilityOpen: {
    label: content.accessibilityActions.openPanel,
    command: "open",
  },
  accessibilityFontUp: {
    label: content.accessibilityActions.increaseFont,
    command: "increase-font",
  },
  accessibilityContrast: {
    label: content.accessibilityActions.toggleContrast,
    command: "toggle-contrast",
  },
  accessibilityDarkTheme: {
    label: content.accessibilityActions.darkTheme,
    command: "set-theme-dark",
  },
  accessibilityReset: {
    label: content.accessibilityActions.resetAll,
    command: "reset-all",
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

  if (Array.isArray(content.initialMessages) && content.initialMessages.length) {
    const randomIndex = Math.floor(Math.random() * content.initialMessages.length);
    return content.initialMessages[randomIndex];
  }

  return content.initialMessage || "";
};

const createInitialMessages = (content, botActions, visitContext) => [
  createBotMessage(0, getInitialMessage(content, visitContext), {
    actions: [
      botActions.projects,
      botActions.services,
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

const getBotReply = (input, content, botActions) => {
  const text = sanitize(input);
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
      actions: [botActions.projects, botActions.services, botActions.contact],
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
      actions: [botActions.projects],
    };
  }

  if (isProjectIntent) {
    return getProjectReply(content, botActions);
  }

  if (isServiceIntent) {
    return {
      text: pickRandomReply(content.servicesReplies),
      actions: [botActions.services, botActions.contact],
    };
  }

  if (isAboutIntent) {
    return {
      text: pickRandomReply(content.aboutReplies),
      actions: [botActions.about, botActions.projects],
    };
  }

  if (isContactIntent) {
    return {
      text: pickRandomReply(content.contactReplies),
      actions: [botActions.contact],
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
    };
  }

  if (isDarkThemeIntent) {
    return {
      text: content.accessibilityDoneTemplate.replace(
        "{{target}}",
        content.accessibilityActions.darkTheme,
      ),
      actions: [botActions.accessibilityDarkTheme, botActions.accessibilityOpen],
      accessibilityCommand: "set-theme-dark",
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
    };
  }

  if (isGreetingIntent) {
    return {
      text: pickRandomReply(content.greetingReplies),
      actions: [
        botActions.projects,
        botActions.services,
        botActions.about,
        botActions.contact,
      ],
    };
  }

  return {
    text: pickRandomReply(content.unknownReplies),
    actions: [
      botActions.projects,
      botActions.services,
      botActions.about,
      botActions.contact,
    ],
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

      return createInitialMessages(content, botActions, visitContextRef.current);
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
    const reply = getBotReply(userText, content, botActions);
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
    if (action.command) {
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
      setMessages((prev) => [...prev, createBotMessage(botMessageId, doneText)]);
      return;
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
