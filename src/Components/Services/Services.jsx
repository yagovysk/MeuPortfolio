import "./Services.css";
import { FaCode } from "react-icons/fa";
import { FaPenNib } from "react-icons/fa";
import { FiLayout } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { AnimatedSection } from "../AnimatedSection/AnimatedSection";
import { useTranslation } from "../../hooks/useTranslation";

export function Services() {
  const initialModalState = {
    webDevelopment: false,
    developerWeb1: false,
    developerWeb2: false,
  };
  const [modalOpen, setModalOpen] = useState(initialModalState);
  const { t } = useTranslation();
  const webDevelopmentModalRef = useRef(null);
  const developerWeb1ModalRef = useRef(null);
  const developerWeb2ModalRef = useRef(null);
  const lastTriggerRef = useRef(null);

  const modalRefs = {
    webDevelopment: webDevelopmentModalRef,
    developerWeb1: developerWeb1ModalRef,
    developerWeb2: developerWeb2ModalRef,
  };

  const openModal = (modalName) => (event) => {
    if (event && event.currentTarget instanceof HTMLElement) {
      lastTriggerRef.current = event.currentTarget;
    }

    setModalOpen({
      ...initialModalState,
      [modalName]: true,
    });
  };

  const closeModal = () => {
    setModalOpen(initialModalState);
    requestAnimationFrame(() => {
      lastTriggerRef.current?.focus();
    });
  };

  useEffect(() => {
    const isAnyModalOpen = Object.values(modalOpen).some(Boolean);
    if (isAnyModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [modalOpen]);

  useEffect(() => {
    if (!Object.values(modalOpen).some(Boolean)) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  useEffect(() => {
    const openEntry = Object.entries(modalOpen).find(([, isOpen]) => isOpen);
    if (!openEntry) {
      return;
    }

    const [modalName] = openEntry;
    const modalNode = modalRefs[modalName]?.current;
    if (modalNode) {
      requestAnimationFrame(() => {
        modalNode.focus();
      });
    }
  }, [modalOpen]);

  return (
    <section className="services-section">
      <AnimatedSection variant="fadeDown">
        <h2 className="section-title">
          {t("services.title", "Os Serviços que eu ofereço")}
        </h2>
      </AnimatedSection>
      <div className="services-container">
        <AnimatedSection className="services-card" variant="scale" delay={0.2}>
          <FaCode className="services-icon" aria-hidden="true" />
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
            onClick={openModal("webDevelopment")}
          >
            {t("common.learnMore", "Saiba mais")}
          </button>
          {modalOpen.webDevelopment && (
            <div
              className="services-modal"
              role="presentation"
              onClick={closeModal}
            >
              <div
                ref={webDevelopmentModalRef}
                className="services-modal-content"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-webDevelopment-title"
                aria-describedby="modal-webDevelopment-content"
                tabIndex={-1}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  className="modal-close"
                  onClick={closeModal}
                  aria-label={t("services.closeModal", "Fechar modal")}
                >
                  <IoMdClose aria-hidden="true" />
                </button>
                <h2 className="modal-title" id="modal-webDevelopment-title">
                  {t("services.frontend.modalTitle", "Desenvolvedor web")}
                </h2>
                <ul
                  className="services-modal-list"
                  id="modal-webDevelopment-content"
                >
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
          <FaPenNib className="services-icon" aria-hidden="true" />
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
            onClick={openModal("developerWeb1")}
          >
            {t("common.learnMore", "Saiba mais")}
          </button>
          {modalOpen.developerWeb1 && (
            <div
              className="services-modal"
              role="presentation"
              onClick={closeModal}
            >
              <div
                ref={developerWeb1ModalRef}
                className="services-modal-content"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-developerWeb1-title"
                aria-describedby="modal-developerWeb1-content"
                tabIndex={-1}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  className="modal-close"
                  onClick={closeModal}
                  aria-label={t("services.closeModal", "Fechar modal")}
                >
                  <IoMdClose aria-hidden="true" />
                </button>
                <h2 className="modal-title" id="modal-developerWeb1-title">
                  {t("services.backend.modalTitle", "Back-end")}
                </h2>
                <ul
                  className="services-modal-list"
                  id="modal-developerWeb1-content"
                >
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
          <FiLayout className="services-icon" aria-hidden="true" />
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
            onClick={openModal("developerWeb2")}
          >
            {t("common.learnMore", "Saiba mais")}
          </button>
          {modalOpen.developerWeb2 && (
            <div
              className="services-modal"
              role="presentation"
              onClick={closeModal}
            >
              <div
                ref={developerWeb2ModalRef}
                className="services-modal-content"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-developerWeb2-title"
                aria-describedby="modal-developerWeb2-content"
                tabIndex={-1}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  className="modal-close"
                  onClick={closeModal}
                  aria-label={t("services.closeModal", "Fechar modal")}
                >
                  <IoMdClose aria-hidden="true" />
                </button>
                <h2 className="modal-title" id="modal-developerWeb2-title">
                  {t("services.fullstack.modalTitle", "Full Stack")}
                </h2>
                <ul
                  className="services-modal-list"
                  id="modal-developerWeb2-content"
                >
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
