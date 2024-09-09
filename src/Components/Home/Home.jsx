import "./Home.css";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoMdGlobe } from "react-icons/io";
import pdfFile from "../../assets/Curriculo.pdf";
import { FaArrowUp } from "react-icons/fa";
import foto from "../../assets/minha-foto.png";
import { Services } from "../Services/Services";
import { Work } from "../Work-section/Work";
import { Testimonials } from "../Testimonials/Testimonials";
import { Contato } from "../../Pages/Contato/Contato";
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
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <main className="main">
      <section className="home-section">
        <div className="home-rectangle">
          <video autoPlay loop muted className="background-video">
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
        <div className="home-container">
          {showButton && (
            <button
              className="scroll-button"
              onClick={() => window.scrollTo(0, 0)}
            >
              <FaArrowUp className="scrolltotop-icon" />
            </button>
          )}
          <div className="home-perfil" data-aos="fade-up">
            <div className="perfil-content" data-aos="fade-up">
              <img
                className="perfil-img"
                src={foto}
                alt=""
                data-aos="fade-up"
              />
            </div>
          </div>
          <div className="home-content" data-aos="fade-up">
            <div className="home-data" data-aos="fade-up">
              <h1 className="home-name" data-aos="fade-up">
                Yago Cerqueira Regis
              </h1>
              <meta
                name="description"
                content="Yago Cerqueira Regis, Desenvolvedor Web."
              />
              <h2 className="home-profession" data-aos="fade-up">
                Desenvolvedor Web
              </h2>
              <div className="home-social" data-aos="fade-up">
                <a
                  href="https://github.com/yagovysk"
                  target="blank"
                  className="home-social-link"
                >
                  <FaGithub className="git-icon" />
                </a>
                <a
                  href="https://www.linkedin.com/in/yago-cerqueira-regis/"
                  target="blank"
                  className="home-social-link"
                >
                  <FaLinkedin className="linkedin-icon" />
                </a>
                <a
                  href="https://togyrogroupvictory.com/"
                  target="blank"
                  className="home-social-link"
                >
                  <IoMdGlobe className="home-social-globe" />
                </a>
              </div>
              <a
                href="#"
                className="home-button"
                onClick={handleDownload}
                data-aos="fade-up"
              >
                Baixar Currículo
              </a>
            </div>
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
