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
import { AnimatedSection } from "../../Components/AnimatedSection/AnimatedSection";

export function About() {
  return (
    <div>
      <Menu />
      <section className="section-about">
        <AnimatedSection variant="fadeDown">
          <h2>Minha Informação Pessoal</h2>
        </AnimatedSection>
        <AnimatedSection
          className="container-about"
          variant="fadeUp"
          delay={0.2}
        >
          <AnimatedSection className="about-perfil" variant="fadeLeft">
            <div className="perfil-content">
              <img src={foto} alt="imagem de perfil" className="perfil-img" />
            </div>
          </AnimatedSection>
          <AnimatedSection className="about-content" variant="fadeRight">
            <div className="about-data">
              <AnimatedSection className="about-info" delay={0.2}>
                <AnimatedSection delay={0.3}>
                  <h1 className="about-name">Yago Cerqueira Regis</h1>
                </AnimatedSection>
                <AnimatedSection delay={0.4}>
                  <h2 className="about-profession">Desenvolvedor</h2>
                </AnimatedSection>
                <p className="about-description">
                  Desenvolvo <b>Páginas da Web</b> com ênfase em
                  <b>UI/UX (User Interface/ User Experience)</b>. Possuo anos de
                  experiência não apenas em design, mas também em programação,
                  utilizando tecnologias como React, entre outras, nos meus
                  projetos.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.5}>
                <Link to="/Contato" className="about-button">
                  Entre em contato
                </Link>
              </AnimatedSection>
            </div>
            <AnimatedSection
              className="about-skills"
              variant="scale"
              delay={0.3}
            >
              <h3 className="about-skills-title">Minhas Habilidades</h3>
              <div className="about-content-skills">
                <AnimatedSection variant="scale" delay={0.4}>
                  <img
                    className="about-skills-img"
                    src={html}
                    alt="imagem ícone html"
                  />
                </AnimatedSection>
                <AnimatedSection variant="scale" delay={0.45}>
                  <img
                    className="about-skills-img"
                    src={css}
                    alt="imagem ícone css"
                  />
                </AnimatedSection>
                <AnimatedSection variant="scale" delay={0.5}>
                  <img
                    className="about-skills-img"
                    src={javascript}
                    alt="imagem ícone javascript"
                  />
                </AnimatedSection>
                <AnimatedSection variant="scale" delay={0.55}>
                  <img
                    className="about-skills-img"
                    src={react}
                    alt="imagem ícone react"
                  />
                </AnimatedSection>
                <AnimatedSection variant="scale" delay={0.6}>
                  <img
                    className="about-skills-img"
                    src={typescript}
                    alt="imagem ícone typescript"
                  />
                </AnimatedSection>
                <AnimatedSection variant="scale" delay={0.65}>
                  <img
                    className="about-skills-img"
                    src={node}
                    alt="imagem ícone node.js"
                  />
                </AnimatedSection>
                <AnimatedSection variant="scale" delay={0.7}>
                  <img
                    className="about-skills-img"
                    src={angular}
                    alt="imagem ícone angular.js"
                  />
                </AnimatedSection>
                <AnimatedSection variant="scale" delay={0.75}>
                  <img
                    className="about-skills-img"
                    src={vue}
                    alt="imagem ícone vue.js"
                  />
                </AnimatedSection>
                <AnimatedSection variant="scale" delay={0.8}>
                  <img
                    className="about-skills-img"
                    src={ruby}
                    alt="imagem ícone ruby on rails"
                  />
                </AnimatedSection>
                <AnimatedSection variant="scale" delay={0.85}>
                  <img
                    className="about-skills-img"
                    src={python}
                    alt="imagem ícone python"
                  />
                </AnimatedSection>
              </div>
            </AnimatedSection>
          </AnimatedSection>
        </AnimatedSection>
      </section>
      <Footer />
      <Accessibility />
    </div>
  );
}
