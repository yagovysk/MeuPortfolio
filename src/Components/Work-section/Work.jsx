import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { motion } from "framer-motion";
import {
  FaExternalLinkAlt,
  FaCode,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "./Work.css";
import bodegueira from "../../assets/print-bodegueira.png";
import site1 from "../../assets/fundo-gas.png";
import togyro from "../../assets/togyro-fundo.png";
import kypy from "../../assets/print-kypy.png";
import eco from "../../assets/ecosempre-fundo.png";
import black from "../../assets/fundo-black.png";
import pagedev from "../../assets/pagedev.png";
import guto from "../../assets/projeto-guto.svg";
import paulo from "../../assets/projeto-paulo.svg";
import print from "../../assets/print-list.png";
import lacos from "../../assets/lacos-site.png";
import raha from "../../assets/raha-project.png";

const projects = [
  {
    imgSrc: site1,
    altText: "Website TeleGás Monte Verde",
    title: "TeleGás Monte Verde",
    subtitle: "Landing Page Comercial",
    description:
      "Desenvolvi uma landing page moderna e responsiva para uma distribuidora de gás em Betim-MG. Implementei formulário de contato integrado, seções de serviços e otimização SEO para aumentar a visibilidade online da empresa.",
    technologies: "React, CSS3, JavaScript",
    link: "https://telegasmonteverde.com.br/",
  },
  {
    imgSrc: togyro,
    altText: "Website Togyro Group Victory",
    title: "Togyro Group Victory",
    subtitle: "Portfolio Corporativo",
    description:
      "Criei um site institucional com design futurista para uma empresa de tecnologia. Utilizei animações suaves, design responsivo e uma arquitetura de código limpa e escalável.",
    technologies: "React, AOS, CSS3",
    link: "https://togyrogroupvictory.com/",
  },
  {
    imgSrc: kypy,
    altText: "Website Kypy-Saúde",
    title: "Kypy Saúde",
    subtitle: "Landing Page para a Clínica",
    description:
      "Desenvolvi uma plataforma focada em saúde e bem-estar para a clínica Kypy. O site inclui agendamento online, informações sobre tratamentos e uma seção de blog para dicas de saúde.",
    technologies: "HTML, CSS3, JavaScript",
    link: "https://kypysaude.com.br/",
  },
  {
    imgSrc: eco,
    altText: "Website EcoSempre",
    title: "Projeto EcoSempre",
    subtitle: "Plataforma Ambiental",
    description:
      "Criei um site educacional sobre descarte correto de lixo eletrônico. Implementei seções interativas, informações sobre reciclagem e pontos de coleta, com foco em conscientização ambiental.",
    technologies: "React, CSS3, JavaScript",
    link: "https://ecosempre.netlify.app/#home",
  },
  {
    imgSrc: black,
    altText: "Website TeamBlack",
    title: "TeamBlack",
    subtitle: "Site Educacional",
    description:
      "Desenvolvi um site institucional para um professor, com design profissional, galeria de cursos, depoimentos de alunos e integração com redes sociais.",
    technologies: "React, CSS3, JavaScript",
    link: "https://teamblack.netlify.app/",
  },
  {
    imgSrc: print,
    altText: "Aplicativo Lista de Tarefas",
    title: "Lista de Tarefas",
    subtitle: "Aplicação Web",
    description:
      "Desenvolvi uma aplicação completa de gerenciamento de tarefas com funcionalidades de adicionar, editar, marcar como concluída e deletar tarefas. Design espacial único com persistência de dados no localStorage.",
    technologies: "React, LocalStorage, CSS3",
    link: "https://yagolist.netlify.app/",
  },
  {
    imgSrc: guto,
    altText: "Website GT Personal Trainer",
    title: "GT Personal Trainer",
    subtitle: "Site Fitness",
    description:
      "Criei um site profissional para personal trainer com seções de treinos, depoimentos, planos de treinamento e formulário de contato. Design motivacional focado em conversão de leads.",
    technologies: "React, CSS3, JavaScript",
    link: "https://garotinhasfitness.com.br/",
  },
  {
    imgSrc: paulo,
    altText: "Website Ph Bytes",
    title: "Ph Bytes",
    subtitle: "Portfolio Tecnologia",
    description:
      "Desenvolvi um site institucional para empresa de tecnologia com design moderno, seções de serviços, portfólio de projetos e formulário de contato integrado.",
    technologies: "React, CSS3, JavaScript",
    link: "https://phso.com.br/",
  },
  {
    imgSrc: bodegueira,
    altText: "Bodegueira Charcutaria & Cia",
    title: "Bodegueira Charcutaria & Cia",
    subtitle: "E-commerce Alimentação",
    description:
      "Criei um site completo para delivery para a bodegueira promovendo a vendas de seus produtos em Brasília. Implementei carrinho de compras, sistema de pedidos, integração com WhatsApp e design focado em conversão.",
    technologies: "HTML, WhatsApp API, CSS3 e Javascript",
    link: "https://bodegueirabsb.com.br/",
  },
  {
    imgSrc: lacos,
    altText: "Website Laços e Confeitos",
    title: "Laços e Confeitos",
    subtitle: "Site Confeitaria",
    description:
      "Desenvolvi um site elegante para ateliê culinário especializado em doces finos. Galeria de produtos, formulário de orçamento e design sofisticado que transmite a qualidade dos produtos.",
    technologies: "React, CSS3, JavaScript",
    link: "https://lacoseconfeitos.netlify.app/",
  },
  {
    imgSrc: raha,
    altText: "Website Raha Saúde e Estética",
    title: "Raha Saúde e Estética",
    subtitle: "Site Clínica",
    description:
      "Criei um site profissional para clínica de saúde e estética. Seções de serviços, galeria de tratamentos, agendamento online e design clean que transmite confiança e profissionalismo.",
    technologies: "React, CSS3, JavaScript",
    link: "https://www.rahaclin.com.br/",
  },
  {
    imgSrc: pagedev,
    altText: "Novos projetos em breve",
    title: "Novos Projetos",
    subtitle: "Em Desenvolvimento",
    description:
      "Estou constantemente desenvolvendo novos projetos e aprendendo novas tecnologias. Em breve, mais trabalhos incríveis estarão disponíveis aqui!",
    technologies: "React, Node.js, TypeScript, Ruby on Rails",
    link: "#",
  },
];

export function Work() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="work-section">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="work-section-title">
          <span className="title-gradient">Meus Trabalhos</span> Recentes
        </h2>
        <p className="work-section-subtitle">
          Projetos que transformam ideias em experiências digitais incríveis
        </p>
      </motion.div>

      <motion.div
        className="carousel-wrapper"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          loop={true}
          className="projects-swiper"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="work-card"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="work-image-container">
                  <motion.img
                    src={project.imgSrc}
                    alt={project.altText}
                    className="work-img"
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="image-overlay">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="overlay-content"
                    >
                      <FaExternalLinkAlt className="overlay-icon" />
                    </motion.div>
                  </div>
                </div>
                <div className="work-info">
                  <div className="work-header">
                    <motion.h3
                      className="work-title"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {project.title}
                    </motion.h3>
                    <span className="work-subtitle">{project.subtitle}</span>
                  </div>
                  <p className="work-description">{project.description}</p>
                  <div className="work-tech">
                    <FaCode className="tech-icon" />
                    <span className="tech-text">{project.technologies}</span>
                  </div>
                  <div className="work-buttons">
                    {project.link !== "#" && (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-btn work-btn-primary"
                        aria-label={`Visitar projeto ${project.title}`}
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaExternalLinkAlt className="btn-icon" />
                        Ver Projeto
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          ref={prevRef}
          className="swiper-nav-btn swiper-prev"
          aria-label="Projeto anterior"
        >
          <FaChevronLeft />
        </button>
        <button
          ref={nextRef}
          className="swiper-nav-btn swiper-next"
          aria-label="Próximo projeto"
        >
          <FaChevronRight />
        </button>
      </motion.div>
    </section>
  );
}
