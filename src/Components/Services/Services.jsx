import './Services.css';
import { FaCode } from 'react-icons/fa';
import { FaPenNib } from 'react-icons/fa';
import { FiLayout } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import React, { useState } from 'react';

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
    document.body.classList.add('modal-open');
  };

  const closeModal = (modalName) => {
    setModalOpen((prev) => ({
      ...prev,
      [modalName]: false,
    }));
    document.body.classList.remove('modal-open');
  };

  return (
    <section className="services-section">
      <h2 className="section-title">Os Serviços que eu ofereço</h2>
      <div className="services-container">
        <article className="services-card">
          <FaCode className="services-icon" />
          <h2 className="services-title">Desenvolvedor Web</h2>
          <p className="services-description">
            Designs bonitos e responsivos com uma interface intuitiva, eficiente
            e prazerosa ao usuário.
          </p>
          <button
            className="services-button"
            onClick={() => openModal('webDevelopment')}>
            Saiba mais
          </button>
          {modalOpen.webDevelopment && (
            <div className="services-modal">
              <div className="services-modal-content">
                <IoMdClose
                  className="modal-close"
                  onClick={() => closeModal('webDevelopment')}
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
        </article>
        <article className="services-card">
          <FaPenNib className="services-icon" />
          <h2 className="services-title">Web Design</h2>
          <p className="services-description">
            Designs bonitos e responsivos com uma interface intuitiva, eficiente
            e prazerosa ao usuário.
          </p>
          <button
            className="services-button"
            onClick={() => openModal('developerWeb1')}>
            Saiba mais
          </button>
          {modalOpen.developerWeb1 && (
            <div className="services-modal">
              <div className="services-modal-content">
                <IoMdClose
                  className="modal-close"
                  onClick={() => closeModal('developerWeb1')}
                />
                <h2 className="modal-title">Web Design</h2>
                <ul className="services-modal-list">
                  <li className="modal-item">
                    Criação de websites profissionais, com qualidade e foco nas
                    necessidades dos clientes.
                  </li>
                  <li className="modal-item">Design Responsivo para mobile.</li>
                  <li className="modal-item">
                    Eu posiciono seu website com SEO avançado, ajuda os
                    mecanismos de busca a encontrar, sem a necessidade do
                    tráfego pago.
                  </li>
                  <li className="modal-item">
                    Eu resolvo problemas em páginas da web.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </article>
        <article className="services-card">
          <FiLayout className="services-icon" />
          <h2 className="services-title">Interfaces UI/UX</h2>
          <p className="services-description">
            Designs bonitos e responsivos com uma interface intuitiva, eficiente
            e prazerosa ao usuário.
          </p>
          <button
            className="services-button"
            onClick={() => openModal('developerWeb2')}>
            Saiba mais
          </button>
          {modalOpen.developerWeb2 && (
            <div className="services-modal">
              <div className="services-modal-content">
                <IoMdClose
                  className="modal-close"
                  onClick={() => closeModal('developerWeb2')}
                />
                <h2 className="modal-title">Interfaces UI/UX</h2>
                <ul className="services-modal-list">
                  <li className="modal-item">
                    Criação de websites profissionais, com qualidade e foco nas
                    necessidades dos clientes.
                  </li>
                  <li className="modal-item">Design Responsivo para mobile.</li>
                  <li className="modal-item">
                    Eu posiciono seu website com SEO avançado, ajuda os
                    mecanismos de busca a encontrar, sem a necessidade do
                    tráfego pago.
                  </li>
                  <li className="modal-item">
                    Eu resolvo problemas em páginas da web.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
