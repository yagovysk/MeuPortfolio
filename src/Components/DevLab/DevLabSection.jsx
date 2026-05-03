import React, { useMemo, useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import {
  accessibilityLabData,
  architectureData,
  componentShowcaseData,
  designPatternsData,
  devLabTabs,
  snippetsData,
  testScenariosData,
} from "../../data/devLabData";
import CopyCodeButton from "./CopyCodeButton";
import "./DevLabSection.css";

function CodeBlock({ code }) {
  return (
    <pre className="devlab-code-block" tabIndex={0}>
      <code>{code}</code>
    </pre>
  );
}

function SectionTabButton({ tab, isActive, onClick, t }) {
  return (
    <button
      id={`devlab-tab-${tab}`}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`devlab-panel-${tab}`}
      className={`devlab-tab ${isActive ? "is-active" : ""}`.trim()}
      onClick={onClick}
    >
      {t(`devlab.tabs.${tab}`, tab)}
    </button>
  );
}

function ComponentCard({ item, t }) {
  return (
    <article className="devlab-card">
      <header className="devlab-card-header">
        <h4>{t(`devlab.components.items.${item.id}.name`, item.id)}</h4>
        <p>{t(`devlab.components.items.${item.id}.description`, "")}</p>
      </header>

      <div className="devlab-preview" aria-hidden="true">
        <span>{t("devlab.preview", "Preview")}</span>
      </div>

      <CodeBlock code={item.code} />
      <CopyCodeButton code={item.code} />

      <div className="devlab-meta-row">
        <p>
          <strong>{t("devlab.technologies", "Tecnologias")}: </strong>
          {item.technologies.join(", ")}
        </p>
        <p>
          <strong>{t("devlab.accessibilityNote", "Acessibilidade")}: </strong>
          {t(`devlab.components.items.${item.id}.a11y`, "")}
        </p>
      </div>
    </article>
  );
}

function PatternCard({ item, t }) {
  return (
    <article className="devlab-card">
      <h4>{t(`devlab.patterns.items.${item.id}.name`, item.id)}</h4>
      <p>{t(`devlab.patterns.items.${item.id}.problem`, "")}</p>
      <p>{t(`devlab.patterns.items.${item.id}.where`, "")}</p>
      <p>{t(`devlab.patterns.items.${item.id}.summary`, "")}</p>
      <CodeBlock code={item.code} />
      <CopyCodeButton code={item.code} />
    </article>
  );
}

function TestCard({ item, t }) {
  return (
    <article className="devlab-card">
      <span className="devlab-chip">
        {t(`devlab.tests.categories.${item.category}`, item.category)}
      </span>
      <h4>{t(`devlab.tests.items.${item.id}.name`, item.id)}</h4>
      <p>{t(`devlab.tests.items.${item.id}.validation`, "")}</p>
      <p>{t(`devlab.tests.items.${item.id}.technicalExplanation`, "")}</p>
      <CodeBlock code={item.code} />
      <CopyCodeButton code={item.code} />
    </article>
  );
}

function SnippetCard({ item, t }) {
  return (
    <article className="devlab-card">
      <h4>{t(`devlab.snippets.items.${item.id}.name`, item.id)}</h4>
      <p>{t(`devlab.snippets.items.${item.id}.description`, "")}</p>
      <p>
        <strong>{t("devlab.whenToUse", "Quando usar")}: </strong>
        {t(`devlab.snippets.items.${item.id}.whenToUse`, "")}
      </p>
      <CodeBlock code={item.code} />
      <CopyCodeButton code={item.code} />
    </article>
  );
}

function AccessibilityCard({ id, t }) {
  return (
    <article className="devlab-card">
      <h4>{t(`devlab.accessibilityLab.items.${id}.title`, id)}</h4>
      <p>
        <strong>{t("devlab.before", "Antes")}: </strong>
        {t(`devlab.accessibilityLab.items.${id}.before`, "")}
      </p>
      <p>
        <strong>{t("devlab.after", "Depois")}: </strong>
        {t(`devlab.accessibilityLab.items.${id}.after`, "")}
      </p>
      <p>{t(`devlab.accessibilityLab.items.${id}.explanation`, "")}</p>
      <CodeBlock code={t(`devlab.accessibilityLab.items.${id}.code`, "")} />
      <p>
        <strong>WCAG: </strong>
        {t(`devlab.accessibilityLab.items.${id}.wcag`, "")}
      </p>
    </article>
  );
}

function ArchitectureCard({ id, t }) {
  const diagram = t(`devlab.architectures.items.${id}.diagram`, "");

  return (
    <article className="devlab-card">
      <h4>{t(`devlab.architectures.items.${id}.name`, id)}</h4>
      <pre
        className="devlab-diagram"
        aria-label={t("devlab.diagram", "Diagrama")}
      >
        {diagram}
      </pre>
      <p>
        <strong>{t("devlab.technologies", "Tecnologias")}: </strong>
        {t(`devlab.architectures.items.${id}.technologies`, "")}
      </p>
      <p>
        <strong>{t("devlab.technicalDecisions", "Decisoes tecnicas")}: </strong>
        {t(`devlab.architectures.items.${id}.decisions`, "")}
      </p>
      <p>
        <strong>{t("devlab.problemsSolved", "Problemas resolvidos")}: </strong>
        {t(`devlab.architectures.items.${id}.problemsSolved`, "")}
      </p>
    </article>
  );
}

function PlaygroundPanel({ t }) {
  const [state, setState] = useState({
    phone: "5561999999999",
    message: "Ola! Quero um projeto com IA.",
    ctaLabel: "Solicitar orcamento",
    ctaHref: "https://wa.me/5561981774548",
    productName: "Togyro Delivery IA",
    productPrice: 199,
    productTag: "SaaS",
    discountBase: 240,
    discountPercent: 15,
    layoutChoice: "landing",
    agentContext: "Quero aumentar leads de restaurante",
  });

  const whatsappLink = useMemo(() => {
    const normalized = String(state.phone).replace(/\D/g, "");
    return `https://wa.me/${normalized}?text=${encodeURIComponent(state.message)}`;
  }, [state.phone, state.message]);

  const ctaCode = `<a class="tg-cta" href="${state.ctaHref}" target="_blank" rel="noopener noreferrer">${state.ctaLabel}</a>`;
  const discountValue =
    Number(state.discountBase) * (Number(state.discountPercent) / 100);
  const finalTotal = Number(state.discountBase) - discountValue;

  const update = (key) => (event) => {
    setState((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
  };

  return (
    <div className="devlab-grid">
      <article className="devlab-card">
        <h4>
          {t(
            "devlab.playground.items.whatsapp-generator.name",
            "Gerador de link para WhatsApp",
          )}
        </h4>
        <label htmlFor="playground-phone">
          {t("devlab.playground.phone", "Telefone")}
        </label>
        <input
          id="playground-phone"
          value={state.phone}
          onChange={update("phone")}
        />
        <label htmlFor="playground-message">
          {t("devlab.playground.message", "Mensagem")}
        </label>
        <input
          id="playground-message"
          value={state.message}
          onChange={update("message")}
        />
        <p className="devlab-inline-preview">{whatsappLink}</p>
        <CopyCodeButton code={whatsappLink} />
      </article>

      <article className="devlab-card">
        <h4>
          {t(
            "devlab.playground.items.cta-generator.name",
            "Gerador de botao CTA",
          )}
        </h4>
        <label htmlFor="playground-cta-label">
          {t("devlab.playground.label", "Texto")}
        </label>
        <input
          id="playground-cta-label"
          value={state.ctaLabel}
          onChange={update("ctaLabel")}
        />
        <label htmlFor="playground-cta-href">URL</label>
        <input
          id="playground-cta-href"
          value={state.ctaHref}
          onChange={update("ctaHref")}
        />
        <div className="devlab-preview">
          <a href={state.ctaHref}>{state.ctaLabel}</a>
        </div>
        <CodeBlock code={ctaCode} />
        <CopyCodeButton code={ctaCode} />
      </article>

      <article className="devlab-card">
        <h4>
          {t(
            "devlab.playground.items.product-card-preview.name",
            "Preview de card de produto",
          )}
        </h4>
        <label htmlFor="playground-product-name">
          {t("devlab.playground.product", "Produto")}
        </label>
        <input
          id="playground-product-name"
          value={state.productName}
          onChange={update("productName")}
        />
        <label htmlFor="playground-product-price">
          {t("devlab.playground.price", "Preco")}
        </label>
        <input
          id="playground-product-price"
          value={state.productPrice}
          onChange={update("productPrice")}
        />
        <label htmlFor="playground-product-tag">
          {t("devlab.playground.tag", "Tag")}
        </label>
        <input
          id="playground-product-tag"
          value={state.productTag}
          onChange={update("productTag")}
        />
        <div className="devlab-preview">
          <strong>{state.productName}</strong>
          <span>R$ {Number(state.productPrice).toFixed(2)}</span>
          <em>{state.productTag}</em>
        </div>
      </article>

      <article className="devlab-card">
        <h4>
          {t(
            "devlab.playground.items.discount-simulator.name",
            "Simulador de desconto",
          )}
        </h4>
        <label htmlFor="playground-base">
          {t("devlab.playground.base", "Valor base")}
        </label>
        <input
          id="playground-base"
          value={state.discountBase}
          onChange={update("discountBase")}
        />
        <label htmlFor="playground-percent">
          {t("devlab.playground.discount", "Desconto")}
        </label>
        <input
          id="playground-percent"
          value={state.discountPercent}
          onChange={update("discountPercent")}
        />
        <p>
          {t("devlab.playground.finalTotal", "Total final")}: R${" "}
          {finalTotal.toFixed(2)}
        </p>
      </article>

      <article className="devlab-card">
        <h4>
          {t(
            "devlab.playground.items.layout-choice.name",
            "Simulador de escolha de layout",
          )}
        </h4>
        <label htmlFor="playground-layout">
          {t("devlab.playground.layout", "Layout")}
        </label>
        <select
          id="playground-layout"
          value={state.layoutChoice}
          onChange={update("layoutChoice")}
        >
          <option value="landing">Landing Page</option>
          <option value="dashboard">Dashboard SaaS</option>
          <option value="catalog">Catalogo E-commerce</option>
        </select>
        <p>
          {t(`devlab.playground.layoutDescriptions.${state.layoutChoice}`, "")}
        </p>
      </article>

      <article className="devlab-card">
        <h4>
          {t(
            "devlab.playground.items.agent-message.name",
            "Simulador de mensagem de agente IA",
          )}
        </h4>
        <label htmlFor="playground-agent-context">
          {t("devlab.playground.context", "Contexto")}
        </label>
        <input
          id="playground-agent-context"
          value={state.agentContext}
          onChange={update("agentContext")}
        />
        <CodeBlock
          code={`[agente-ia]\nContexto: ${state.agentContext}\nResposta: Vamos priorizar regra de negocio, acessibilidade e experimento rapido.`}
        />
      </article>
    </div>
  );
}

export function DevLabSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("playground");

  return (
    <section
      id="dev-lab"
      className="devlab-section"
      aria-labelledby="devlab-title"
    >
      <header className="devlab-hero">
        <p className="devlab-eyebrow">
          {t("devlab.eyebrow", "Laboratorio Dev")}
        </p>
        <h2 id="devlab-title">{t("devlab.title", "Yago Dev Lab")}</h2>
        <p>
          {t(
            "devlab.subtitle",
            "Experimentos, componentes, padroes e decisoes tecnicas criadas por mim.",
          )}
        </p>
      </header>

      <div
        className="devlab-tabs"
        role="tablist"
        aria-label={t("devlab.tabsAria", "Categorias do Dev Lab")}
      >
        {devLabTabs.map((tab) => (
          <SectionTabButton
            key={tab}
            tab={tab}
            isActive={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            t={t}
          />
        ))}
      </div>

      <div
        id={`devlab-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`devlab-tab-${activeTab}`}
        className="devlab-panel"
      >
        {activeTab === "components" && (
          <div className="devlab-grid">
            {componentShowcaseData.map((item) => (
              <ComponentCard key={item.id} item={item} t={t} />
            ))}
          </div>
        )}

        {activeTab === "patterns" && (
          <div className="devlab-grid">
            {designPatternsData.map((item) => (
              <PatternCard key={item.id} item={item} t={t} />
            ))}
          </div>
        )}

        {activeTab === "tests" && (
          <div className="devlab-grid">
            {testScenariosData.map((item) => (
              <TestCard key={item.id} item={item} t={t} />
            ))}
          </div>
        )}

        {activeTab === "snippets" && (
          <div className="devlab-grid">
            {snippetsData.map((item) => (
              <SnippetCard key={item.id} item={item} t={t} />
            ))}
          </div>
        )}

        {activeTab === "accessibility" && (
          <div className="devlab-grid">
            {accessibilityLabData.map((itemId) => (
              <AccessibilityCard key={itemId} id={itemId} t={t} />
            ))}
          </div>
        )}

        {activeTab === "architecture" && (
          <div className="devlab-grid">
            {architectureData.map((itemId) => (
              <ArchitectureCard key={itemId} id={itemId} t={t} />
            ))}
          </div>
        )}

        {activeTab === "playground" && <PlaygroundPanel t={t} />}
      </div>

      <footer className="devlab-footer-note">
        <p>
          {t(
            "devlab.footerNote",
            "Todos os exemplos sao educacionais e focados em reuso, negocio e acessibilidade.",
          )}
        </p>
      </footer>
    </section>
  );
}

export default DevLabSection;
