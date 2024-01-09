import './Home.css';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { IoMdGlobe } from 'react-icons/io';
import pdfFile from '../../assets/Curriculo Yago Cerqueira.pdf';
import { FaArrowUp } from 'react-icons/fa';
import foto from '../../assets/minha-foto.png';
import { Services } from '../Services/Services';
import { Work } from '../Work section/Work';
import { Testimonials } from '../Testimonials/Testimonials';
import { Contato } from '../../Pages/Contato/Contato';
import React, { useState, useEffect } from 'react';
import { Footer } from '../Footer/Footer';
import { Helmet } from 'react-helmet';

export function Home() {
  // Estado para controlar a visibilidade do botão
  const [showButton, setShowButton] = useState(false);

  // Função para manipular o evento de scroll
  const handleScroll = () => {
    // Calcule a posição do meio da página
    const middleOfPage = window.innerHeight / 2;

    // Verifique se a posição do scroll é maior que o meio da página
    const isPastMiddle = window.scrollY > middleOfPage;

    // Atualize o estado com base na condição
    setShowButton(isPastMiddle);
  };

  // Adicione um ouvinte de evento de scroll quando o componente for montado
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Remova o ouvinte de evento quando o componente for desmontado
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfFile;
    link.download = 'seu-arquivo.pdf'; // Nome do arquivo que será baixado
    link.click();
  };

  return (
    <main className="main">
      <section className="home-section">
        <div className="home-rectangle"></div>
        <div className="home-container">
          {showButton && (
            <button
              className="scroll-button"
              onClick={() => window.scrollTo(0, 0)}>
              <FaArrowUp className="scrolltotop-icon" />
            </button>
          )}
          <div className="home-perfil">
            <div className="perfil-content">
              <img className="perfil-img" src={foto} alt="" />
            </div>
          </div>
          <div className="home-content">
            <Helmet>
              <div className="home-data">
                <h1 className="home-name">Yago Cerqueira Regis</h1>
                <meta
                  name="description"
                  content="Yago Cerqueira Regis, Desenvolvedor Web."
                />
                <h2 className="home-profession">Desenvolvedor Web</h2>
                <div className="home-social">
                  <a
                    href="https://github.com/yagovysk"
                    target="blank"
                    className="home-social-link">
                    <FaGithub className="git-icon" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/yago-cerqueira-regis/"
                    target="blank"
                    className="home-social-link">
                    <FaLinkedin className="linkedin-icon" />
                  </a>
                  <a
                    href="https://togyrogroupvictory.com/"
                    target="blank"
                    className="home-social-link">
                    {' '}
                    <IoMdGlobe className="home-social-globe" />
                  </a>
                </div>
                <a href="#" className="home-button" onClick={handleDownload}>
                  Baixar Currículo
                </a>
              </div>
            </Helmet>
          </div>
        </div>
      </section>
      <Services />
      <Work />
      <Testimonials />
      <Contato />
      <Footer />
    </main>
  );
}
