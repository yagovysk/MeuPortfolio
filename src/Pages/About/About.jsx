import "./About.css";
import foto from "../../assets/minha-foto.png";
import { Menu } from "../../Components/Menu/Menu";
import { Link } from "react-router-dom";
import html from "../../assets/html-icon.svg";
import css from "../../assets/css-icon.svg";
import javascript from "../../assets/javascript-icon.svg";
import react from "../../assets/react-icon.svg";
import typescript from "../../assets/typescript-icon.svg";
import node from "../../assets/node-icon.svg";
import angular from "../../assets/angular-icon.svg";
import vue from "../../assets/vue-icon.svg";
import ruby from "../../assets/ruby-icon.png";
import python from "../../assets/python-icon.svg";
import { Footer } from "../../Components/Footer/Footer";
import Accessibility from "../../Components/Accessibility/Accessibility";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function About() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div>
      <Menu />
      <section className="section-about">
        <h2 data-aos="fade-up">Minha Informação Pessoal</h2>
        <div className="container-about" data-aos="fade-up">
          <div className="about-perfil" data-aos="fade-up">
            <div className="perfil-content" data-aos="fade-up">
              <img
                src={foto}
                alt="imagem de perfil"
                className="perfil-img"
                data-aos="fade-up"
              />
            </div>
          </div>
          <div className="about-content" data-aos="fade-up">
            <div className="about-data">
              <div className="about-info" data-aos="fade-up">
                <h1 className="about-name" data-aos="fade-up">
                  Yago Cerqueira Regis
                </h1>
                <h2 className="about-profession" data-aos="fade-up">
                  Desenvolvedor
                </h2>
                <p className="about-description">
                  Desenvolvo <b>Páginas da Web</b> com ênfase em
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
                <img
                  className="about-skills-img"
                  src={ruby}
                  alt="imagem ícone ruby on rails"
                />
                <img
                  className="about-skills-img"
                  src={python}
                  alt="imagem ícone python"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Accessibility />
    </div>
  );
}
