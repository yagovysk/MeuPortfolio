import "./Footer.css";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoMdGlobe } from "react-icons/io";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function Footer() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <Link to="/" className="footer-logo">
          Yago
        </Link>
        <div className="footer-content" data-aos="fade-up">
          <ul className="footer-links">
            <li>
              <Link to="/About" className="footer-link">
                Sobre mim
              </Link>
            </li>
            <li>
              <Link to="/Portfolio" className="footer-link">
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/contato" className="footer-link">
                Contato
              </Link>
            </li>
          </ul>
          <div className="footer-social">
            <a
              className="social-link"
              target="blank"
              href="https://github.com/yagovysk"
            >
              <FaGithub className="icon-footer" />
            </a>
            <a
              className="social-link"
              target="blank"
              href="https://www.linkedin.com/in/yago-cerqueira-regis/"
            >
              <FaLinkedin className="icon-footer" />
            </a>
            <a
              className="social-link"
              target="blank"
              href="https://togyrogroupvictory.com/"
            >
              <IoMdGlobe className="icon-footer" />
            </a>
          </div>
        </div>
        <span className="footer-copy">
          &#169; Todos os Direitos Reservados a Yago C. Regis
        </span>
      </div>
    </footer>
  );
}
