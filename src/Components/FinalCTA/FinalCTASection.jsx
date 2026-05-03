import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import "./FinalCTASection.css";

export function FinalCTASection() {
  const { t } = useTranslation();

  return (
    <section
      id="final-cta"
      className="final-cta-section"
      aria-labelledby="final-cta-title"
    >
      <div className="final-cta-container">
        <h2 id="final-cta-title">
          {t(
            "finalCta.title",
            "Quer transformar sua ideia em um site, sistema ou agente de IA?",
          )}
        </h2>
        <p>
          {t(
            "finalCta.subtitle",
            "Posso te ajudar a criar uma presenca digital profissional com landing pages, sistemas, lojas, automacoes e agentes virtuais.",
          )}
        </p>

        <div className="final-cta-actions">
          <a href="/contato" className="final-cta-button">
            {t("finalCta.requestQuote", "Solicitar orcamento")}
          </a>
          <a
            href="https://wa.me/5561981774548"
            className="final-cta-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("finalCta.contactWhatsapp", "Falar no WhatsApp")}
          </a>
          <a href="#dev-lab" className="final-cta-button">
            {t("finalCta.viewDevLab", "Ver Dev Lab")}
          </a>
        </div>
      </div>
    </section>
  );
}

export default FinalCTASection;
