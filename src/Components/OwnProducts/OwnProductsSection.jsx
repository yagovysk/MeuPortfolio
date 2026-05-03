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
          {products.map((productId) => (
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
                href={t(`ownProducts.items.${productId}.url`, "#")}
                className="own-product-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("ownProducts.viewMore", "Ver mais")}
              >
                {t("ownProducts.viewMore", "Ver mais")}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OwnProductsSection;
