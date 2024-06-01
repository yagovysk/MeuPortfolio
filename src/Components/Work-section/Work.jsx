import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MdArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import "./Work.css";

import site1 from "../../assets/fundo-gas.png";
import togyro from "../../assets/togyro-fundo.png";
import carbon from "../../assets/4less.png";
import eco from "../../assets/ecosempre-fundo.png";
import black from "../../assets/fundo-black.png";
import pagedev from "../../assets/pagedev.png";
import print from "../../assets/print-list.png";

const projects = [
  {
    imgSrc: site1,
    altText:
      "Imagem de capa do projeto de gás, um homem carregando um gás e está sorrindo",
    title: "Website TeleGás Monte Verde - Betim (MG)",
    subtitle: "Landing Page",
    link: "https://telegasmonteverde.com.br/",
    imgClass: "work-img-gas",
  },
  {
    imgSrc: togyro,
    altText:
      "Imagem de capa do projeto Togyro, Capa com um Astronauta em um mar do espaço, com várias estrelas atrás dele.",
    title: "Website Togyro Group Victory",
    subtitle: "Landing Page",
    link: "https://togyrogroupvictory.com/",
    imgClass: "work-img-togyro",
  },
  {
    imgSrc: carbon,
    altText:
      "Imagem de capa do projeto 4less, capa co folhas verdes e letras de título brancas.",
    title: "Website 4LessCarbon",
    subtitle: "Landing Page",
    link: "https://4lesscarbon.netlify.app/",
    imgClass: "work-img",
  },
  {
    imgSrc: eco,
    altText:
      "Imagem de capa do projeto EcoSempre, ecologia e sustentabilidade, descarte de lixos eletrônicos.",
    title: "Website Projeto EcoSempre",
    subtitle: "Landing Page",
    link: "https://ecosempre.netlify.app/#home",
    imgClass: "work-img",
  },
  {
    imgSrc: black,
    altText:
      "Imagem de Capa do projeto Team Black, Capa contém o professor Black olhando para cima e do lado esquerdo contém título e botão para entrar em contato.",
    title: "Website Projeto TeamBlack",
    subtitle: "Landing Page",
    link: "https://teamblack.netlify.app/",
    imgClass: "work-img-black",
  },
  {
    imgSrc: print,
    altText:
      "Imagem de capa do projeto Lista de Tarefas, o wallpaper são planetas no espaço.",
    title: "Website Lista de Tarefas",
    subtitle: "Landing Page",
    link: "https://yagolist.netlify.app/",
    imgClass: "work-img",
  },
  {
    imgSrc: pagedev,
    altText: "Capa de Em Breve hávera novos projetos.",
    title: "Em Breve...",
    subtitle: "Em desenvolvimento",
    link: "#",
    imgClass: "work-img-dev",
  },
];

export function Work() {
  return (
    <section className="work-section">
      <h2 className="work-section-title">Meus Trabalhos Recentes</h2>
      <Carousel
        className="carousel-projects"
        autoPlay
        interval={6000}
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        showArrows={true}
        showIndicators={true}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="arrow arrow-prev"
            >
              <MdArrowBackIosNew />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="arrow arrow-next"
            >
              <MdOutlineArrowForwardIos />
            </button>
          )
        }
      >
        {projects.map((project, index) => (
          <div key={index} className="work-card">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="work-link"
            >
              <img
                src={project.imgSrc}
                alt={project.altText}
                className={project.imgClass}
              />
            </a>
            <h2 className="work-title">{project.title}</h2>
            <span className="work-subtitle">{project.subtitle}</span>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
