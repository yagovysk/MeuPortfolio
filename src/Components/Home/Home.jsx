import "./Home.css";
import { FaGithub, FaLinkedin, FaArrowUp, FaWhatsapp } from "react-icons/fa";
import { IoMdGlobe } from "react-icons/io";
import cvPtBr from "../../assets/meu-curriculo-definitivo.pdf";
import cvEn from "../../assets/meu-curriculo-ingles.pdf";
import { Services } from "../Services/Services";
import Dashboard from "../Dashboard/Dashboard";
import Work from "../Work-section/Work";
import { Testimonials } from "../Testimonials/Testimonials";
import React, { useState, useEffect, useMemo } from "react";
import { Footer } from "../Footer/Footer";
import backgroundVideo from "../../assets/background-video.mp4";
import { AnimatedSection } from "../AnimatedSection/AnimatedSection";
import PWAInstall from "../PWAInstall/PWAInstall";
import { useTranslation } from "../../hooks/useTranslation";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useReducedMotion, motion } from "framer-motion";

const profilePhoto = "/foto-melhor.jpeg";

export function Home() {
  const [showButton, setShowButton] = useState(false);
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const isMobileViewport = useMediaQuery("(max-width: 768px)");
  const shouldShowVideo = useMemo(
    () => !prefersReducedMotion && !isMobileViewport,
    [prefersReducedMotion, isMobileViewport],
  );

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

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  const downloadCv = (fileUrl, fileName) => {
    // iOS Safari não honra atributo download, abrir em nova aba funciona como salvar/compartilhar.
    if (isIOS) {
      window.open(fileUrl, "_blank");
      return;
    }

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPt = () => {
    downloadCv(cvPtBr, "Curriculo_Yago_Cerqueira_Regis_PTBR.pdf");
  };

  const handleDownloadEn = () => {
    downloadCv(cvEn, "Resume_Yago_Cerqueira_Regis_EN.pdf");
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "5561981774548"; // Número com DDI (55) + DDD (61) + número
    const message = "Olá! Gostaria de conversar sobre um projeto.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, "_blank");
  };

  return (
    <main className="main">
      <section className="home-section">
        <div
          className={`home-rectangle ${
            shouldShowVideo ? "" : "home-rectangle--static"
          }`}
        >
          {shouldShowVideo && (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              disablePictureInPicture
              className="background-video"
              aria-hidden="true"
              tabIndex={-1}
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="home-glows" aria-hidden="true">
          <span className="home-glow home-glow--cyan" />
          <span className="home-glow home-glow--magenta" />
        </div>
        <div className="home-container">
          {showButton && (
            <button
              className="scroll-button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Voltar ao topo"
            >
              <FaArrowUp className="scrolltotop-icon" aria-hidden="true" />
            </button>
          )}
          <div className="home-hero-card">
            <AnimatedSection className="home-perfil" variant="fadeLeft">
              <div className="perfil-content">
                <motion.div
                  className="perfil-frame"
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, scale: 0.85, y: 24 }
                  }
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 1, scale: 1, y: 0 }
                  }
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <span className="perfil-glow" aria-hidden="true" />
                  <img
                    className="perfil-img"
                    src={profilePhoto}
                    alt="Foto de perfil de Yago Cerqueira Regis"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
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
                    <FaGithub className="git-icon" aria-hidden="true" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/yago-cerqueira-regis/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-social-link"
                    aria-label="LinkedIn de Yago Cerqueira"
                  >
                    <FaLinkedin className="linkedin-icon" aria-hidden="true" />
                  </a>
                  <a
                    href="https://togyrogroupvictory.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-social-link"
                    aria-label="Website Togyro Group"
                  >
                    <IoMdGlobe
                      className="home-social-globe"
                      aria-hidden="true"
                    />
                  </a>
                </AnimatedSection>
                <AnimatedSection
                  className="home-buttons"
                  variant="blur"
                  delay={0.5}
                >
                  <button className="home-button" onClick={handleDownloadPt}>
                    {isIOS
                      ? t("hero.openCVBR", "Abrir Currículo (BR)")
                      : t("hero.downloadCVBR", "Baixar Currículo (BR)")}
                  </button>
                  <button className="home-button" onClick={handleDownloadEn}>
                    {isIOS
                      ? t("hero.openCVEN", "Abrir Currículo (EN)")
                      : t("hero.downloadCVEN", "Baixar Currículo (EN)")}
                  </button>
                  <button
                    className="home-button-whatsapp"
                    onClick={handleWhatsAppClick}
                  >
                    <FaWhatsapp className="whatsapp-icon" aria-hidden="true" />
                    WhatsApp
                  </button>
                </AnimatedSection>
              </div>
            </AnimatedSection>
          </div>
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
