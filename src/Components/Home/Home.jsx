import "./Home.css";
import { FaGithub, FaLinkedin, FaArrowUp, FaWhatsapp } from "react-icons/fa";
import { IoMdGlobe } from "react-icons/io";
import pdfFile from "../../assets/Curriculo.pdf";
import foto from "../../assets/minha-foto.png";
import { Services } from "../Services/Services";
import Dashboard from "../Dashboard/Dashboard";
import Work from "../Work-section/Work";
import { Testimonials } from "../Testimonials/Testimonials";
import React, { useState, useEffect } from "react";
import { Footer } from "../Footer/Footer";
import backgroundVideo from "../../assets/background-video.mp4";
import { AnimatedSection } from "../AnimatedSection/AnimatedSection";
import PWAInstall from "../PWAInstall/PWAInstall";
import { useTranslation } from "../../hooks/useTranslation";

export function Home() {
  const [showButton, setShowButton] = useState(false);
  const { t } = useTranslation();

  const handleScroll = () => {
    const middleOfPage = window.innerHeight / 2;
    const isPastMiddle = window.scrollY > middleOfPage;
    setShowButton(isPastMiddle);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfFile;
    link.download = "Currículo Yago Cerqueira Regis";
    link.click();
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "5561981774548"; // Número com DDI (55) + DDD (61) + número
    const message = "Olá! Gostaria de conversar sobre um projeto.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <main className="main">
      <section className="home-section">
        <div className="home-rectangle">
          <video autoPlay loop muted playsInline className="background-video">
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
        <div className="home-container">
          {showButton && (
            <button
              className="scroll-button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Voltar ao topo"
            >
              <FaArrowUp className="scrolltotop-icon" />
            </button>
          )}
          <AnimatedSection className="home-perfil" variant="fadeLeft">
            <div className="perfil-content">
              <img
                className="perfil-img"
                src={foto}
                alt="Foto de perfil de Yago Cerqueira Regis"
              />
            </div>
          </AnimatedSection>
          <AnimatedSection className="home-content" variant="fadeRight">
            <div className="home-data">
              <AnimatedSection delay={0.2}>
                <h1 className="home-name">Yago Cerqueira Regis</h1>
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <h2 className="home-profession">
                  {t("hero.profession", "Desenvolvedor Full Stack")}
                </h2>
              </AnimatedSection>
              <AnimatedSection
                className="home-social"
                variant="scale"
                delay={0.4}
              >
                <a
                  href="https://github.com/yagovysk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-social-link"
                  aria-label="GitHub de Yago Cerqueira"
                >
                  <FaGithub className="git-icon" />
                </a>
                <a
                  href="https://www.linkedin.com/in/yago-cerqueira-regis/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-social-link"
                  aria-label="LinkedIn de Yago Cerqueira"
                >
                  <FaLinkedin className="linkedin-icon" />
                </a>
                <a
                  href="https://togyrogroupvictory.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-social-link"
                  aria-label="Website Togyro Group"
                >
                  <IoMdGlobe className="home-social-globe" />
                </a>
              </AnimatedSection>
              <AnimatedSection
                className="home-buttons"
                variant="blur"
                delay={0.5}
              >
                <button className="home-button" onClick={handleDownload}>
                  {t("hero.downloadCV", "Baixar Currículo")}
                </button>
                <button
                  className="home-button-whatsapp"
                  onClick={handleWhatsAppClick}
                >
                  <FaWhatsapp className="whatsapp-icon" />
                  WhatsApp
                </button>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* Dashboard Section */}
      <section id="dashboard" className="dashboard-section">
        <Dashboard />
      </section>
      <Services />
      <Work />
      {/* PWA Install Component */}
      <PWAInstall />
      <Testimonials />
      <Footer />
    </main>
  );
}
