import "./Services.css";
import { FaCode } from "react-icons/fa";
import { FaPenNib } from "react-icons/fa";
import { FiLayout } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { AnimatedSection } from "../AnimatedSection/AnimatedSection";
import { useTranslation } from "../../hooks/useTranslation";

export function Services() {
  const [modalOpen, setModalOpen] = useState({
    webDevelopment: false,
    developerWeb1: false,
    developerWeb2: false,
  });
  const { t } = useTranslation();

  const openModal = (modalName) => {
    setModalOpen((prev) => ({
      ...prev,
      [modalName]: true,
    }));
    document.body.classList.add("modal-open");
  };

  const closeModal = (modalName) => {
    setModalOpen((prev) => ({
      ...prev,
      [modalName]: false,
    }));
    document.body.classList.remove("modal-open");
  };

  return (
    <section className="services-section">
      <AnimatedSection variant="fadeDown">
        <h2 className="section-title">
          {t("services.title", "Os Serviços que eu ofereço")}
        </h2>
      </AnimatedSection>
      <div className="services-container">
        <AnimatedSection className="services-card" variant="scale" delay={0.2}>
          <FaCode className="services-icon" />
          <h2 className="services-title">
            {t("services.frontend.title", "Desenvolvedor Front-end")}
          </h2>
          <p className="services-description">
            {t(
              "services.frontend.description",
              "Designs bonitos e responsivos com uma interface intuitiva, eficiente e prazerosa ao usuário."
            )}
          </p>
          <button
            className="services-button"
            onClick={() => openModal("webDevelopment")}
          >
            {t("common.learnMore", "Saiba mais")}
          </button>
          {modalOpen.webDevelopment && (
            <div className="services-modal">
              <div className="services-modal-content">
                <IoMdClose
                  className="modal-close"
                  onClick={() => closeModal("webDevelopment")}
                />
                <h2 className="modal-title">
                  {t("services.frontend.modalTitle", "Desenvolvedor web")}
                </h2>
                <ul className="services-modal-list">
                  {t("services.frontend.modalItems", [
                    "Criação de websites profissionais, com qualidade e foco nas necessidades dos clientes.",
                    "Design Responsivo para mobile.",
                    "Eu posiciono seu website com SEO avançado, ajuda os mecanismos de busca a encontrar sua página, sem a necessidade do tráfego pago.",
                    "Eu resolvo problemas em páginas da web.",
                  ]).map((item, index) => (
                    <li key={index} className="modal-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </AnimatedSection>
        <AnimatedSection className="services-card" variant="scale" delay={0.4}>
          <FaPenNib className="services-icon" />
          <h2 className="services-title">
            {t("services.backend.title", "Desenvolvimento Back-end")}
          </h2>
          <p className="services-description">
            {t(
              "services.backend.description",
              "Criação de softwares profissionais, com qualidade e foco nas necessidades dos clientes."
            )}
          </p>
          <button
            className="services-button"
            onClick={() => openModal("developerWeb1")}
          >
            {t("common.learnMore", "Saiba mais")}
          </button>
          {modalOpen.developerWeb1 && (
            <div className="services-modal">
              <div className="services-modal-content">
                <IoMdClose
                  className="modal-close"
                  onClick={() => closeModal("developerWeb1")}
                />
                <h2 className="modal-title">
                  {t("services.backend.modalTitle", "Back-end")}
                </h2>
                <ul className="services-modal-list">
                  {t("services.backend.modalItems", [
                    "Desenvolvimento de APIs RESTful robustas e escaláveis.",
                    "Integração com bancos de dados relacionais e não relacionais.",
                    "Implementação de autenticação e autorização seguras.",
                    "Otimização de performance e escalabilidade.",
                  ]).map((item, index) => (
                    <li key={index} className="modal-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </AnimatedSection>
        <AnimatedSection className="services-card" variant="scale" delay={0.6}>
          <FiLayout className="services-icon" />
          <h2 className="services-title">
            {t("services.fullstack.title", "Desenvolvedor Full Stack")}
          </h2>
          <p className="services-description">
            {t(
              "services.fullstack.description",
              "Soluções completas de ponta a ponta, desde o front-end até o back-end."
            )}
          </p>
          <button
            className="services-button"
            onClick={() => openModal("developerWeb2")}
          >
            {t("common.learnMore", "Saiba mais")}
          </button>
          {modalOpen.developerWeb2 && (
            <div className="services-modal">
              <div className="services-modal-content">
                <IoMdClose
                  className="modal-close"
                  onClick={() => closeModal("developerWeb2")}
                />
                <h2 className="modal-title">
                  {t("services.fullstack.modalTitle", "Full Stack")}
                </h2>
                <ul className="services-modal-list">
                  {t("services.fullstack.modalItems", [
                    "Desenvolvimento completo de aplicações web.",
                    "Arquitetura de sistemas e planejamento técnico.",
                    "Integração de front-end e back-end.",
                    "Deploy e manutenção de aplicações.",
                  ]).map((item, index) => (
                    <li key={index} className="modal-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
