import "./Home.css";
import { FaGithub, FaLinkedin, FaArrowUp, FaWhatsapp } from "react-icons/fa";
import { IoMdGlobe } from "react-icons/io";
import cvPtBr from "../../assets/meu-curriculo-definitivo.pdf";
import cvEn from "../../assets/meu-curriculo-ingles.pdf";
import { Services } from "../Services/Services";
import Dashboard from "../Dashboard/Dashboard";
import Work from "../Work-section/Work";
import { Testimonials } from "../Testimonials/Testimonials";
import React, { lazy, Suspense, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import newFundoHome from "../../assets/new-fundo-home.png";
import { AnimatedSection } from "../AnimatedSection/AnimatedSection";
import PWAInstall from "../PWAInstall/PWAInstall";
import { useTranslation } from "../../hooks/useTranslation";
import { motion } from "framer-motion";

const DevLabSection = lazy(() => import("../DevLab/DevLabSection"));
const ProfileModeSelector = lazy(
  () => import("../ProfileModeSelector/ProfileModeSelector"),
);
const AIWorkflowSection = lazy(() => import("../AIWorkflow/AIWorkflowSection"));
const OwnProductsSection = lazy(
  () => import("../OwnProducts/OwnProductsSection"),
);
const FinalCTASection = lazy(() => import("../FinalCTA/FinalCTASection"));

const profilePhoto = "/foto-melhor.jpeg";

export function Home() {
  const [showButton, setShowButton] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const heroHighlights = t("hero.highlights", [
    "Interfaces modernas com foco em conversão.",
    "Código limpo, escalável e orientado a performance.",
    "Comunicação clara e entrega com visão de negócio.",
  ]);

  useEffect(() => {
    const scrollToSectionWithRetry = (sectionId, attempt = 0) => {
      const target = document.getElementById(sectionId);
      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        return;
      }

      if (attempt >= 20) return;

      setTimeout(() => {
        scrollToSectionWithRetry(sectionId, attempt + 1);
      }, 120);
    };

    if (location.hash) {
      scrollToSectionWithRetry(location.hash.replace("#", ""));
    }

    const handleSectionRequest = (event) => {
      const sectionId = event?.detail?.sectionId;
      if (!sectionId) return;
      scrollToSectionWithRetry(sectionId);
    };

    window.addEventListener("portfolio-scroll-to-section", handleSectionRequest);

    return () => {
      window.removeEventListener(
        "portfolio-scroll-to-section",
        handleSectionRequest,
      );
    };
  }, [location.hash]);

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
    const message = t(
      "contact.whatsappMessage",
      "Olá! Gostaria de conversar sobre um projeto.",
    );
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, "_blank");
  };

  const handleNavigateToSection = (sectionId) => () => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="main">
      <section className="home-section">
        <div className="home-rectangle" aria-hidden="true">
          <span
            className="home-space-background"
            style={{ backgroundImage: `url(${newFundoHome})` }}
          />
          <span className="mesh-layer mesh-layer--a" />
          <span className="mesh-layer mesh-layer--b" />
          <span className="mesh-layer mesh-layer--c" />
          <span className="home-grid-overlay" />
          <span className="home-noise-overlay" />
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
                  initial={{ opacity: 0, scale: 0.85, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
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
                    {t(
                      "hero.profession",
                      "Full Stack Developer | IA, SaaS, SEO e Acessibilidade",
                    )}
                  </h2>
                </AnimatedSection>
                <AnimatedSection delay={0.35}>
                  <p className="home-tagline">
                    {t(
                      "hero.tagline",
                      "Desenvolvo landing pages, sistemas web e produtos digitais com foco em performance, acessibilidade, automação com IA e resultado de negócio.",
                    )}
                  </p>
                </AnimatedSection>
                <AnimatedSection delay={0.38}>
                  <ul className="home-highlights">
                    {heroHighlights.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
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
                  <button
                    type="button"
                    className="home-button"
                    onClick={handleNavigateToSection("projects-section")}
                  >
                    {t("hero.viewProjects", "Ver projetos")}
                  </button>
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
                    {t("hero.whatsapp", "WhatsApp")}
                  </button>
                  <button
                    type="button"
                    className="home-button"
                    onClick={handleNavigateToSection("dev-lab")}
                  >
                    {t("hero.viewDevLab", "Ver Dev Lab")}
                  </button>
                </AnimatedSection>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      <Suspense fallback={null}>
        <ProfileModeSelector />
      </Suspense>
      {/* Dashboard Section */}
      <section id="dashboard" className="dashboard-section">
        <Dashboard />
      </section>
      <Services />
      <Work />
      <Suspense fallback={null}>
        <DevLabSection />
      </Suspense>
      <Suspense fallback={null}>
        <AIWorkflowSection />
      </Suspense>
      <Suspense fallback={null}>
        <OwnProductsSection />
      </Suspense>
      {/* PWA Install Component */}
      <PWAInstall />
      <Testimonials />
      <Suspense fallback={null}>
        <FinalCTASection />
      </Suspense>
      <Footer />
    </main>
  );
}
