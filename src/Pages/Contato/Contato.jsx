import './Contato.css';
import { Link } from 'react-router-dom';

export function Contato() {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2 className="section-title">
          Vamos Conversar <br /> Sobre seu Projeto
        </h2>

        <Link to="/contato" href="" className="contato-button">
          Contato
        </Link>
      </div>
    </section>
  );
}
