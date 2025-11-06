import "./About.css";
import foto from "../../assets/minha-foto.png";
import { Menu } from "../../Components/Menu/Menu";
import { useState } from "react";
import { Footer } from "../../Components/Footer/Footer";
import Accessibility from "../../Components/Accessibility/Accessibility";
import { AnimatedSection } from "../../Components/AnimatedSection/AnimatedSection";
import { SkillsChart } from "../../Components/SkillsChart/SkillsChart";
import { useTranslation } from "../../hooks/useTranslation";
import { motion } from "framer-motion";

export function About() {
  const { t } = useTranslation();
  const [showSkills, setShowSkills] = useState(false);

  const toggleSkills = () => {
    setShowSkills(!showSkills);

    // Scroll suave para a seção de skills quando mostrar
    if (!showSkills) {
      setTimeout(() => {
        const skillsSection = document.getElementById("skills-section");
        if (skillsSection) {
          skillsSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  };

  return (
    <div>
      <Menu />
      <section className="section-about">
        <AnimatedSection variant="fadeDown">
          <h2>{t("about.title", "Minha Informação Pessoal")}</h2>
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
                <motion.button
                  onClick={toggleSkills}
                  className="skills-toggle-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t("about.skillsButton", "Veja minhas Habilidades")}
                  <motion.span
                    className="skills-arrow"
                    animate={{ rotate: showSkills ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ↓
                  </motion.span>
                </motion.button>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </AnimatedSection>

        {/* Seção de habilidades com animação */}
        <motion.div
          id="skills-section"
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{
            opacity: showSkills ? 1 : 0,
            height: showSkills ? "auto" : 0,
            marginTop: showSkills ? "3rem" : 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            opacity: { duration: 0.3 },
          }}
          style={{ overflow: "hidden" }}
        >
          {showSkills && <SkillsChart />}
        </motion.div>
      </section>
      <Footer />
      <Accessibility />
    </div>
  );
}
