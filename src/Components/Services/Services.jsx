import "./Services.css";
import { FaCode } from "react-icons/fa";
import { FaPenNib } from "react-icons/fa";
import { FiLayout } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { AnimatedSection } from "../AnimatedSection/AnimatedSection";

export function Services() {
  const [modalOpen, setModalOpen] = useState({
    webDevelopment: false,
    developerWeb1: false,
    developerWeb2: false,
  });

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
        <h2 className="section-title">Os Serviços que eu ofereço</h2>
      </AnimatedSection>
      <div className="services-container">
        <AnimatedSection className="services-card" variant="scale" delay={0.2}>
          <FaCode className="services-icon" />
          <h2 className="services-title">Desenvolvedor Front-end</h2>
          <p className="services-description">
            Designs bonitos e responsivos com uma interface intuitiva, eficiente
            e prazerosa ao usuário.
          </p>
          <button
            className="services-button"
            onClick={() => openModal("webDevelopment")}
          >
            Saiba mais
          </button>
          {modalOpen.webDevelopment && (
            <div className="services-modal">
              <div className="services-modal-content">
                <IoMdClose
                  className="modal-close"
                  onClick={() => closeModal("webDevelopment")}
                />
                <h2 className="modal-title">Desenvolvedor web</h2>
                <ul className="services-modal-list">
                  <li className="modal-item">
                    Criação de websites profissionais, com qualidade e foco nas
                    necessidades dos clientes.
                  </li>
                  <li className="modal-item">Design Responsivo para mobile.</li>
                  <li className="modal-item">
                    Eu posiciono seu website com SEO avançado, ajuda os
                    mecanismos de busca a encontrar sua página, sem a
                    necessidade do tráfego pago.
                  </li>
                  <li className="modal-item">
                    Eu resolvo problemas em páginas da web.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </AnimatedSection>
        <AnimatedSection className="services-card" variant="scale" delay={0.4}>
          <FaPenNib className="services-icon" />
          <h2 className="services-title">Desenvolvimento Back-end</h2>
          <p className="services-description">
            Criação de softwares profissionais, com qualidade e foco nas
            necessidades dos clientes.
          </p>
          <button
            className="services-button"
            onClick={() => openModal("developerWeb1")}
          >
            Saiba mais
          </button>
          {modalOpen.developerWeb1 && (
            <div className="services-modal">
              <div className="services-modal-content">
                <IoMdClose
                  className="modal-close"
                  onClick={() => closeModal("developerWeb1")}
                />
                <h2 className="modal-title">Back-end</h2>
                <ul className="services-modal-list">
                  <li className="modal-item">
                    Softwares com linguagens de alto nível, que atendem bem as
                    necessidades dos clientes.
                  </li>
                  <li className="modal-item">
                    Testes no código e garantia de qualidade.
                  </li>
                  <li className="modal-item">
                    Melhores métodos para aplicação e análise de requisitos.
                  </li>
                  <li className="modal-item">
                    Eu resolvo problemas em qualquer código.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </AnimatedSection>
        <AnimatedSection className="services-card" variant="scale" delay={0.6}>
          <FiLayout className="services-icon" />
          <h2 className="services-title">Manipulação de B.D.</h2>
          <p className="services-description">
            gerenciamento e otimização de bancos de dados, oferecendo soluções
            personalizadas para atender às necessidades específicas dos
            Clientes.
          </p>
          <button
            className="services-button"
            onClick={() => openModal("developerWeb2")}
          >
            Saiba mais
          </button>
          {modalOpen.developerWeb2 && (
            <div className="services-modal">
              <div className="services-modal-content">
                <IoMdClose
                  className="modal-close"
                  onClick={() => closeModal("developerWeb2")}
                />
                <h2 className="modal-title">MySQL</h2>
                <ul className="services-modal-list">
                  <li className="modal-item">
                    Implemento estratégias para otimizar o desempenho do MySQL,
                    ajustando índices, consultas e configurações do servidor.
                  </li>
                  <li className="modal-item">
                    Identifico e resolvo problemas de desempenho, garantindo
                    tempos de resposta mais rápidos e maior escalabilidade.
                  </li>
                  <li className="modal-item">
                    Melhoro a eficiência operacional, reduzindo tempos de
                    resposta e aumentando a eficiência do banco de dados.
                  </li>
                  <li className="modal-item">
                    Desenvolvo soluções escaláveis para apoiar o crescimento
                    contínuo da sua empresa.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
