import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import "./OwnProductsSection.css";

const products = [
  "togyro-delivery-ai",
  "togyro-store",
  "togyro-space",
  "portfolio-virtual-agent",
  "togyro-dev-lab",
];

export function OwnProductsSection() {
  const { t } = useTranslation();

  const handleProductClick = (event, productId, url) => {
    const normalizedUrl = (url || "").trim();

    if (productId === "portfolio-virtual-agent") {
      event.preventDefault();
      window.dispatchEvent(
        new CustomEvent("portfolio-virtual-assistant-open", {
          detail: {
            message: t(
              "ownProducts.assistantPrompt",
              "Oi! Sou o agente virtual do portfolio. Como posso te ajudar hoje e do que voce precisa neste momento?",
            ),
          },
        }),
      );
      return;
    }

    if (productId === "togyro-dev-lab") {
      event.preventDefault();
      window.dispatchEvent(
        new CustomEvent("portfolio-scroll-to-section", {
          detail: { sectionId: "dev-lab" },
        }),
      );
      return;
    }

    if (!normalizedUrl || normalizedUrl === "#") {
      event.preventDefault();
    }
  };

  return (
    <section
      id="own-products"
      className="own-products-section"
      aria-labelledby="own-products-title"
    >
      <div className="own-products-container">
        <h2 id="own-products-title">
          {t("ownProducts.title", "Produtos autorais")}
        </h2>
        <p>
          {t(
            "ownProducts.subtitle",
            "Projetos proprios que conectam tecnologia, negocio e evolucao continua.",
          )}
        </p>

        <div className="own-products-grid">
          {products.map((productId) => {
            const url = t(`ownProducts.items.${productId}.url`, "#");
            const hasRealDestination =
              productId === "portfolio-virtual-agent" ||
              productId === "togyro-dev-lab" ||
              (typeof url === "string" && url.trim() && url.trim() !== "#");
            const isExternalUrl = /^https?:\/\//i.test(url);

            return (
              <article className="own-product-card" key={productId}>
                <h3>{t(`ownProducts.items.${productId}.name`, productId)}</h3>
                <p>{t(`ownProducts.items.${productId}.description`, "")}</p>
                <p>
                  <strong>{t("ownProducts.stack", "Stack")}: </strong>
                  {t(`ownProducts.items.${productId}.stack`, "")}
                </p>
                <p>
                  <strong>
                    {t("ownProducts.problemSolved", "Problema resolvido")}:{" "}
                  </strong>
                  {t(`ownProducts.items.${productId}.problemSolved`, "")}
                </p>
                <p>
                  <strong>{t("ownProducts.status", "Status")}: </strong>
                  {t(`ownProducts.items.${productId}.status`, "")}
                </p>
                <a
                  href={url}
                  className={`own-product-link${!hasRealDestination ? " own-product-link--disabled" : ""}`}
                  target={isExternalUrl ? "_blank" : undefined}
                  rel={isExternalUrl ? "noopener noreferrer" : undefined}
                  aria-label={t("ownProducts.viewMore", "Ver mais")}
                  aria-disabled={!hasRealDestination}
                  onClick={(event) => handleProductClick(event, productId, url)}
                >
                  {t("ownProducts.viewMore", "Ver mais")}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default OwnProductsSection;
