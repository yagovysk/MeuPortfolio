import "./Home.css";
import { FaGithub, FaLinkedin, FaArrowUp, FaWhatsapp } from "react-icons/fa";
import { IoMdGlobe } from "react-icons/io";
import pdfFile from "../../assets/Curriculo.pdf";
import foto from "../../assets/minha-foto.png";
import { Services } from "../Services/Services";
import { Work } from "../Work-section/Work";
import { Testimonials } from "../Testimonials/Testimonials";
import React, { useState, useEffect } from "react";
import { Footer } from "../Footer/Footer";
import backgroundVideo from "../../assets/background-video.mp4";
import AOS from "aos";
import "aos/dist/aos.css";

export function Home() {
  const [showButton, setShowButton] = useState(false);

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
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = "5531000000000"; // Substitua pelo seu número com DDI + DDD
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
          <div className="home-perfil" data-aos="fade-up">
            <div className="perfil-content">
              <img
                className="perfil-img"
                src={foto}
                alt="Foto de perfil de Yago Cerqueira Regis"
              />
            </div>
          </div>
          <div className="home-content" data-aos="fade-up">
            <div className="home-data">
              <h1 className="home-name" data-aos="fade-up">
                Yago Cerqueira Regis
              </h1>
              <h2 className="home-profession" data-aos="fade-up">
                Desenvolvedor Full Stack
              </h2>
              <div className="home-social" data-aos="fade-up">
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
              </div>
              <div className="home-buttons" data-aos="fade-up">
                <button className="home-button" onClick={handleDownload}>
                  Baixar Currículo
                </button>
                <button
                  className="home-button-whatsapp"
                  onClick={handleWhatsAppClick}
                >
                  <FaWhatsapp className="whatsapp-icon" />
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Services />
      <Work />
      <Testimonials />
      <Footer />
    </main>
  );
}
