import "./Contato.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function Contato() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <section className="contact-section">
      <div className="contact-container" data-aos="fade-up">
        <h2 className="section-title" data-aos="fade-up">
          Vamos Conversar <br /> Sobre seu Projeto
        </h2>

        <Link
          to="/contato"
          href=""
          className="contato-button"
          data-aos="fade-up"
        >
          Contato
        </Link>
      </div>
    </section>
  );
}
