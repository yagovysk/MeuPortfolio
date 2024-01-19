import './Work.css';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import site1 from '../../assets/fundo-gas.png';
import togyro from '../../assets/togyro-fundo.png';
import carbon from '../../assets/4less.png';
import eco from '../../assets/ecosempre-fundo.png';

export function Work() {
  return (
    <section className="work-section">
      <h2 className="work-section-title">Meus Trabalhos Recentes</h2>
      <div className="work-container">
        <article className="work-card">
          <a
            href="https://telegasmonteverde.com.br/"
            target="blank"
            className="work-link">
            <img
              src={site1}
              alt="Imagem de capa do meu trabalho"
              className="work-img-gas"
            />
            <FaRegArrowAltCircleRight className="work-icon-gas" />
          </a>
          <h2 className="work-title">
            Website TeleGás Monte Verde - Betim (MG)
          </h2>
          <span className="work-subtitle">Landing Page</span>
        </article>
        <article className="work-card">
          <a
            href="https://togyrogroupvictory.com/"
            target="blank"
            className="work-link">
            <img
              src={togyro}
              alt="Imagem de capa do meu trabalho"
              className="work-img-togyro"
            />
            <FaRegArrowAltCircleRight className="work-icon" />
          </a>
          <h2 className="work-title">Website Togyro Group Victory</h2>
          <span className="work-subtitle">Landing Page</span>
        </article>
        <article className="work-card">
          <a
            href="https://4lesscarbon.netlify.app/"
            target="blank"
            className="work-link">
            <img
              src={carbon}
              alt="Imagem de capa do meu trabalho"
              className="work-img"
            />
            <FaRegArrowAltCircleRight className="work-icon-2" />
          </a>
          <h2 className="work-title">Website 4LessCarbon</h2>
          <span className="work-subtitle">Landing Page</span>
        </article>
        <article className="work-card">
          <a
            href="https://ecosempre.netlify.app/#home"
            target="blank"
            className="work-link">
            <img
              src={eco}
              alt="Imagem de capa do meu trabalho"
              className="work-img"
            />
            <FaRegArrowAltCircleRight className="work-icon-2" />
          </a>
          <h2 className="work-title">Website Projeto EcoSempre</h2>
          <span className="work-subtitle">Landing Page</span>
        </article>
      </div>
    </section>
  );
}
