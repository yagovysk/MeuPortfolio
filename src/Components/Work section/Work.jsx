import './Work.css';
import site1 from '../../assets/fundo-gas.png';
import togyro from '../../assets/togyro-fundo.png';
import carbon from '../../assets/4less.png';
import eco from '../../assets/ecosempre-fundo.png';
import black from '../../assets/fundo-black.png';
import pagedev from '../../assets/pagedev.png';
import print from '../../assets/print-list.png';

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
              alt="Imagem de capa do projeto de gás, um homem carregando um gás e está sorrindo"
              className="work-img-gas"
            />
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
              alt="Imagem de capa do projeto Togyro, Capa com um Astronauta em um mar do espaço, com várias estrelas atrás dele."
              className="work-img-togyro"
            />
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
              alt="Imagem de capa do projeto 4less, capa co folhas verdes e letras de título brancas."
              className="work-img"
            />
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
              alt="Imagem de capa do projeto EcoSempre, ecologia e sustentabilidade, descarte de lixos eletrônicos."
              className="work-img"
            />
          </a>
          <h2 className="work-title">Website Projeto EcoSempre</h2>
          <span className="work-subtitle">Landing Page</span>
        </article>
        <article className="work-card">
          <a
            href="https://teamblack.netlify.app/"
            target="blank"
            className="work-link">
            <img
              src={black}
              alt="Imagem de Capa do projeto Team Black, Capa contém o professor Black olhando para cima e do lado esquerdo contém título e botão para entrar em contato."
              className="work-img"
            />
          </a>
          <h2 className="work-title">Website Projeto TeamBlack</h2>
          <span className="work-subtitle">Landing Page</span>
        </article>
        <article className="work-card">
          <a
            href="https://yagolist.netlify.app/"
            target="blank"
            className="work-link">
            <img
              src={print}
              alt="Imagem de capa do projeto Lista de Tarefas, o wallpaper são planetas no espaço."
              className="work-img"
            />
          </a>
          <h2 className="work-title">Website Lista de Tarefas</h2>
          <span className="work-subtitle">Landing Page</span>
        </article>
        <article className="work-card">
          <a href="#" className="work-link">
            <img
              src={pagedev}
              alt="Capa de Em Breve hávera novos projetos."
              className="work-img-dev"
            />
          </a>
          <h2 className="work-title">Em Breve...</h2>
          <span className="work-subtitle">Em desenvolvimento</span>
        </article>
      </div>
    </section>
  );
}
