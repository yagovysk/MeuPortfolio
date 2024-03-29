import './About.css';
import foto from '../../assets/minha-foto.png';
import { Menu } from '../../Components/Menu/Menu';
import { Link } from 'react-router-dom';
import html from '../../assets/html-icon.svg';
import css from '../../assets/css-icon.svg';
import javascript from '../../assets/javascript-icon.svg';
import react from '../../assets/react-icon.svg';
import typescript from '../../assets/typescript-icon.svg';
import node from '../../assets/node-icon.svg';
import angular from '../../assets/angular-icon.svg';
import vue from '../../assets/vue-icon.svg';
import { Footer } from '../../Components/Footer/Footer';

export function About() {
  return (
    <div>
      <Menu />
      <section className="section-about">
        <h2>Minha Informação Pessoal</h2>
        <div className="container-about">
          <div className="about-perfil">
            <div className="perfil-content">
              <img src={foto} alt="image" className="perfil-img" />
            </div>
          </div>
          <div className="about-content">
            <div className="about-data">
              <div className="about-info">
                <h1 className="about-name">Yago Cerqueira Regis</h1>
                <h2 className="about-profession">Desenvolvedor Web</h2>
                <p className="about-description">
                  Desenvolvo <b>Páginas da Web</b> com ênfase em {''}
                  <b>UI/UX (User Interface/ User Experience)</b>. Possuo anos de
                  experiência não apenas em design, mas também em programação,
                  utilizando tecnologias como React, entre outras, nos meus
                  projetos.
                </p>
              </div>
              <Link to="/Contato" className="about-button">
                Entre em contato
              </Link>
            </div>
            <div className="about-skills">
              <h3 className="about-skills-title">Minhas Habilidades</h3>
              <div className="about-content-skills">
                <img
                  className="about-skills-img"
                  src={html}
                  alt="imagem ícone html"
                />
                <img
                  className="about-skills-img"
                  src={css}
                  alt="imagem ícone css"
                />
                <img
                  className="about-skills-img"
                  src={javascript}
                  alt="imagem ícone javascript"
                />
                <img
                  className="about-skills-img"
                  src={react}
                  alt="imagem ícone react"
                />
                <img
                  className="about-skills-img"
                  src={typescript}
                  alt="imagem ícone typescript"
                />
                <img
                  className="about-skills-img"
                  src={node}
                  alt="imagem ícone node.js"
                />
                <img
                  className="about-skills-img"
                  src={angular}
                  alt="imagem ícone angular.js"
                />
                <img
                  className="about-skills-img"
                  src={vue}
                  alt="imagem ícone vue.js"
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </div>
  );
}
