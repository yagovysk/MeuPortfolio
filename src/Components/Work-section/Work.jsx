import React, { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaExternalLinkAlt,
  FaCode,
  FaChevronLeft,
  FaChevronRight,
  FaBookOpen,
  FaTimes,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "./Work.css";
import TVNoiseEffect from "../TVNoiseEffect/TVNoiseEffect";
import { useTranslation } from "../../hooks/useTranslation";
import { useMediaQuery } from "../../hooks/useMediaQuery";
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
import vivacqua from "../../assets/print-vivacqua.png";
import togyrostore from "../../assets/print-togyrostore.png";
import togyroDeliveryIa from "../../assets/togyro-delivery-ia.png";

const Work = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [tuningSlides, setTuningSlides] = useState(new Set());
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const isMobileViewport = useMediaQuery("(max-width: 768px)");
  const shouldReduceMotion = prefersReducedMotion || isMobileViewport;
  const shouldShowTvEffect = !shouldReduceMotion;

  useEffect(() => {
    if (!shouldShowTvEffect) {
      setTuningSlides(new Set());
    }
  }, [shouldShowTvEffect]);

  useEffect(() => {
    if (!selectedCaseStudy) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedCaseStudy(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedCaseStudy]);

  const swiperModules = useMemo(() => {
    const baseModules = [Navigation, Pagination];
    if (!shouldReduceMotion) {
      baseModules.push(Autoplay, EffectCoverflow);
    }
    return baseModules;
  }, [shouldReduceMotion]);

  const projects = [
    {
      id: "telegas",
      imgSrc: site1,
      altText: t("projects.telegas.alt", "Website TeleGás Monte Verde"),
      title: t("projects.telegas.title", "TeleGás Monte Verde"),
      subtitle: t("projects.telegas.subtitle", "Landing Page Comercial"),
      description: t(
        "projects.telegas.description",
        "Desenvolvi uma landing page moderna e responsiva para uma distribuidora de gás em Betim-MG. Implementei formulário de contato integrado, seções de serviços e otimização SEO para aumentar a visibilidade online da empresa.",
      ),
      technologies: "React, CSS3, JavaScript",
      link: "https://telegasmonteverde.com.br/",
    },
    {
      id: "togyro",
      imgSrc: togyro,
      altText: t("projects.togyro.alt", "Website Togyro Group Victory"),
      title: t("projects.togyro.title", "Togyro Group Victory"),
      subtitle: t("projects.togyro.subtitle", "Portfolio Corporativo"),
      description: t(
        "projects.togyro.description",
        "Criei um site institucional com design futurista para uma empresa de tecnologia. Utilizei animações suaves, design responsivo e uma arquitetura de código limpa e escalável.",
      ),
      technologies: "React, AOS, CSS3",
      link: "https://togyrogroupvictory.com/",
      caseStudyId: "togyro-group-victory",
    },
    {
      id: "togyrodelivery",
      imgSrc: togyroDeliveryIa,
      altText: t("projects.togyrodelivery.alt", "Togyro Delivery AI platform"),
      title: t("projects.togyrodelivery.title", "Togyro Delivery IA"),
      subtitle: t("projects.togyrodelivery.subtitle", "Delivery com IA"),
      description: t(
        "projects.togyrodelivery.description",
        "Plataforma de delivery com agente de IA para auxiliar restaurantes no atendimento, automacao de vendas e disparos no WhatsApp.",
      ),
      technologies: "Next.js, NestJS, Fastify, PostgreSQL, IA, WhatsApp API",
      link: "https://togyro-web.onrender.com/",
      caseStudyId: "togyro-delivery",
    },
    {
      id: "togyrostore",
      imgSrc: togyrostore,
      altText: t("projects.togyrostore.alt", "SaaS TogyroStore"),
      title: t("projects.togyrostore.title", "TogyroStore"),
      subtitle: t("projects.togyrostore.subtitle", "Plataforma SaaS"),
      description: t(
        "projects.togyrostore.description",
        "Plataforma SaaS em Ruby on Rails que permite criar lojas, landing pages ou sistemas de delivery com gerenciamento completo e deploy rápido.",
      ),
      technologies: "Ruby on Rails, PostgreSQL, Stimulus, Tailwind",
      link: "https://github.com/yagovysk/Togyro_store",
    },
    {
      id: "kypy",
      imgSrc: kypy,
      altText: t("projects.kypy.alt", "Website Kypy-Saúde"),
      title: t("projects.kypy.title", "Kypy Saúde"),
      subtitle: t("projects.kypy.subtitle", "Landing Page para a Clínica"),
      description: t(
        "projects.kypy.description",
        "Desenvolvi uma plataforma focada em saúde e bem-estar para a clínica Kypy. O site inclui agendamento online, informações sobre tratamentos e uma seção de blog para dicas de saúde.",
      ),
      technologies: "HTML, CSS3, JavaScript",
      link: "https://kypysaude.com.br/",
    },
    {
      id: "ecosempre",
      imgSrc: eco,
      altText: t("projects.ecosempre.alt", "Website EcoSempre"),
      title: t("projects.ecosempre.title", "Projeto EcoSempre"),
      subtitle: t("projects.ecosempre.subtitle", "Plataforma Ambiental"),
      description: t(
        "projects.ecosempre.description",
        "Criei um site educacional sobre descarte correto de lixo eletrônico. Implementei seções interativas, informações sobre reciclagem e pontos de coleta, com foco em conscientização ambiental.",
      ),
      technologies: "React, CSS3, JavaScript",
      link: "https://ecosempre.netlify.app/#home",
    },
    {
      id: "teamblack",
      imgSrc: black,
      altText: t("projects.teamblack.alt", "Website TeamBlack"),
      title: t("projects.teamblack.title", "TeamBlack"),
      subtitle: t("projects.teamblack.subtitle", "Site Educacional"),
      description: t(
        "projects.teamblack.description",
        "Desenvolvi um site institucional para um professor, com design profissional, galeria de cursos, depoimentos de alunos e integração com redes sociais.",
      ),
      technologies: "React, CSS3, JavaScript",
      link: "https://teamblack.netlify.app/",
    },
    {
      id: "todolist",
      imgSrc: print,
      altText: t("projects.todolist.alt", "Aplicativo Lista de Tarefas"),
      title: t("projects.todolist.title", "Lista de Tarefas"),
      subtitle: t("projects.todolist.subtitle", "Aplicação Web"),
      description: t(
        "projects.todolist.description",
        "Desenvolvi uma aplicação completa de gerenciamento de tarefas com funcionalidades de adicionar, editar, marcar como concluída e deletar tarefas. Design espacial único com persistência de dados no localStorage.",
      ),
      technologies: "React, LocalStorage, CSS3",
      link: "https://yagolist.netlify.app/",
    },
    {
      id: "gt",
      imgSrc: guto,
      altText: t("projects.gt.alt", "Website GT Personal Trainer"),
      title: t("projects.gt.title", "GT Personal Trainer"),
      subtitle: t("projects.gt.subtitle", "Site Fitness"),
      description: t(
        "projects.gt.description",
        "Criei um site profissional para personal trainer com seções de treinos, depoimentos, planos de treinamento e formulário de contato. Design motivacional focado em conversão de leads.",
      ),
      technologies: "React, CSS3, JavaScript",
      link: "https://github.com/yagovysk/Projeto-Guto",
    },
    {
      id: "phbytes",
      imgSrc: paulo,
      altText: t("projects.phbytes.alt", "Website Ph Bytes"),
      title: t("projects.phbytes.title", "Ph Bytes"),
      subtitle: t("projects.phbytes.subtitle", "Portfolio Tecnologia"),
      description: t(
        "projects.phbytes.description",
        "Desenvolvi um site institucional para empresa de tecnologia com design moderno, seções de serviços, portfólio de projetos e formulário de contato integrado.",
      ),
      technologies: "React, CSS3, JavaScript",
      link: "https://phso.com.br/",
    },
    {
      id: "bodegueira",
      imgSrc: bodegueira,
      altText: t("projects.bodegueira.alt", "Bodegueira Charcutaria & Cia"),
      title: t("projects.bodegueira.title", "Bodegueira Charcutaria & Cia"),
      subtitle: t("projects.bodegueira.subtitle", "E-commerce Alimentação"),
      description: t(
        "projects.bodegueira.description",
        "Criei um site completo para delivery para a bodegueira promovendo a vendas de seus produtos em Brasília. Implementei carrinho de compras, sistema de pedidos, integração com WhatsApp e design focado em conversão.",
      ),
      technologies: "HTML, WhatsApp API, CSS3 e Javascript",
      link: "https://github.com/yagovysk/Bodegueira-Charcutaria",
      caseStudyId: "bodegueira",
    },
    {
      id: "lacos",
      imgSrc: lacos,
      altText: t("projects.lacos.alt", "Website Laços e Confeitos"),
      title: t("projects.lacos.title", "Laços e Confeitos"),
      subtitle: t("projects.lacos.subtitle", "Site Confeitaria"),
      description: t(
        "projects.lacos.description",
        "Desenvolvi um site elegante para ateliê culinário especializado em doces finos. Galeria de produtos, formulário de orçamento e design sofisticado que transmite a qualidade dos produtos.",
      ),
      technologies: "React, CSS3, JavaScript",
      link: "https://lacoseconfeitos.netlify.app/",
      caseStudyId: "lacos-e-confeitos",
    },
    {
      id: "raha",
      imgSrc: raha,
      altText: t("projects.raha.alt", "Website Raha Saúde e Estética"),
      title: t("projects.raha.title", "Raha Saúde e Estética"),
      subtitle: t("projects.raha.subtitle", "Site Clínica"),
      description: t(
        "projects.raha.description",
        "Criei um site profissional para clínica de saúde e estética. Seções de serviços, galeria de tratamentos, agendamento online e design clean que transmite confiança e profissionalismo.",
      ),
      technologies: "React, CSS3, JavaScript",
      link: "https://www.rahaclin.com.br/",
    },
    {
      id: "vivacqua",
      imgSrc: vivacqua,
      altText: t("projects.vivacqua.alt", "Website Vivacqua Odontologia"),
      title: t("projects.vivacqua.title", "Vivacqua Odontologia"),
      subtitle: t("projects.vivacqua.subtitle", "Website Corporativo"),
      description: t(
        "projects.vivacqua.description",
        "Desenvolvi um website corporativo moderno para clínica odontológica. Implementei HTML semântico para melhor SEO, design responsivo com Tailwind CSS e funcionalidades interativas com JavaScript, priorizando acessibilidade e performance.",
      ),
      technologies: "HTML5, Tailwind CSS, JavaScript",
      link: "https://vivacquaondontologiadf.com.br/",
      caseStudyId: "vivacqua",
    },
    {
      id: "upcoming",
      imgSrc: pagedev,
      altText: t("projects.upcoming.alt", "Novos projetos em breve"),
      title: t("projects.upcoming.title", "Novos Projetos"),
      subtitle: t("projects.upcoming.subtitle", "Em Desenvolvimento"),
      description: t(
        "projects.upcoming.description",
        "Estou constantemente desenvolvendo novos projetos e aprendendo novas tecnologias. Em breve, mais trabalhos incríveis estarão disponíveis aqui!",
      ),
      technologies: "React, Node.js, TypeScript, Ruby on Rails",
      link: "#",
    },
  ];

  const caseStudy = selectedCaseStudy
    ? {
        title: t(`caseStudies.items.${selectedCaseStudy}.title`, "Case Study"),
        problem: t(`caseStudies.items.${selectedCaseStudy}.problem`, ""),
        solution: t(`caseStudies.items.${selectedCaseStudy}.solution`, ""),
        decisions: t(`caseStudies.items.${selectedCaseStudy}.decisions`, ""),
        differentials: t(
          `caseStudies.items.${selectedCaseStudy}.differentials`,
          "",
        ),
        technologies: t(
          `caseStudies.items.${selectedCaseStudy}.technologies`,
          "",
        ),
        learnings: t(`caseStudies.items.${selectedCaseStudy}.learnings`, ""),
        nextSteps: t(`caseStudies.items.${selectedCaseStudy}.nextSteps`, ""),
      }
    : null;

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
    <section className="work-section" id="projects-section">
      <motion.div
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: -20 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="work-section-title">
          <span className="title-gradient">
            {t("portfolio.titleHighlight", "Meus Trabalhos")}
          </span>{" "}
          {t("portfolio.titleSuffix", "Recentes")}
        </h2>
        <p className="work-section-subtitle">
          {t(
            "portfolio.subtitle",
            "Projetos que transformam ideias em experiências digitais incríveis",
          )}
        </p>
      </motion.div>

      <motion.div
        className="carousel-wrapper"
        variants={containerVariants}
        initial={shouldReduceMotion ? undefined : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={{ once: true }}
      >
        <Swiper
          modules={swiperModules}
          spaceBetween={shouldReduceMotion ? 16 : 30}
          slidesPerView={1}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onSlideChange={(swiper) => {
            const newActiveSlide = swiper.realIndex;

            if (shouldShowTvEffect) {
              // Adiciona o slide atual ao set de slides em sintonização
              setTuningSlides((prev) => new Set([...prev, newActiveSlide]));
            }

            setActiveSlide(newActiveSlide);
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={
            shouldReduceMotion
              ? false
              : {
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
          }
          effect={shouldReduceMotion ? "slide" : "coverflow"}
          coverflowEffect={
            shouldReduceMotion
              ? undefined
              : {
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: false,
                }
          }
          loop={!shouldReduceMotion}
          className="projects-swiper"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <motion.div
                className="work-card"
                variants={itemVariants}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="work-image-container">
                  <motion.img
                    src={project.imgSrc}
                    alt={project.altText}
                    className="work-img"
                    loading="lazy"
                    whileHover={
                      shouldReduceMotion ? undefined : { scale: 1.05 }
                    }
                    transition={{ duration: 0.4 }}
                  />
                  {/* TV Noise Effect for non-active slides */}
                  {shouldShowTvEffect && activeSlide !== index && (
                    <TVNoiseEffect isActive={false} isTuning={false} />
                  )}
                  {/* TV Tuning Effect when slide becomes active */}
                  {shouldShowTvEffect &&
                    activeSlide === index &&
                    tuningSlides.has(index) && (
                      <TVNoiseEffect
                        isActive={true}
                        isTuning={true}
                        onTransitionComplete={() => {
                          setTuningSlides((prev) => {
                            const newSet = new Set(prev);
                            newSet.delete(index);
                            return newSet;
                          });
                        }}
                      />
                    )}
                  <div className="image-overlay">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="overlay-content"
                    >
                      <FaExternalLinkAlt
                        className="overlay-icon"
                        aria-hidden="true"
                      />
                    </motion.div>
                  </div>
                </div>
                <div className="work-info">
                  <div className="work-header">
                    <motion.h3
                      className="work-title"
                      initial={
                        shouldReduceMotion ? undefined : { opacity: 0, x: -20 }
                      }
                      whileInView={
                        shouldReduceMotion ? undefined : { opacity: 1, x: 0 }
                      }
                      transition={{ delay: 0.2 }}
                    >
                      {project.title}
                    </motion.h3>
                    <span className="work-subtitle">{project.subtitle}</span>
                  </div>
                  <p className="work-description">{project.description}</p>
                  <div className="work-tech">
                    <FaCode className="tech-icon" aria-hidden="true" />
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
                        whileHover={
                          shouldReduceMotion ? undefined : { scale: 1.05, x: 5 }
                        }
                        whileTap={
                          shouldReduceMotion ? undefined : { scale: 0.95 }
                        }
                      >
                        <FaExternalLinkAlt
                          className="btn-icon"
                          aria-hidden="true"
                        />
                        {t("portfolio.viewProject", "Ver Projeto")}
                      </motion.a>
                    )}
                    {project.caseStudyId && (
                      <button
                        type="button"
                        className="work-btn work-btn-secondary"
                        onClick={() =>
                          setSelectedCaseStudy(project.caseStudyId)
                        }
                        aria-haspopup="dialog"
                        aria-controls="case-study-dialog"
                      >
                        <FaBookOpen className="btn-icon" aria-hidden="true" />
                        {t("portfolio.viewCaseStudy", "Ver estudo de caso")}
                      </button>
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
          <FaChevronLeft aria-hidden="true" />
        </button>
        <button
          ref={nextRef}
          className="swiper-nav-btn swiper-next"
          aria-label="Próximo projeto"
        >
          <FaChevronRight aria-hidden="true" />
        </button>
      </motion.div>

      {caseStudy && (
        <div
          className="work-modal-overlay"
          role="presentation"
          onClick={() => setSelectedCaseStudy(null)}
        >
          <article
            className="work-modal"
            id="case-study-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="work-modal-close"
              onClick={() => setSelectedCaseStudy(null)}
              aria-label={t("common.close", "Fechar")}
            >
              <FaTimes aria-hidden="true" />
            </button>
            <h3 id="case-study-title">{caseStudy.title}</h3>
            <p>
              <strong>{t("caseStudies.problem", "Problema")}: </strong>
              {caseStudy.problem}
            </p>
            <p>
              <strong>{t("caseStudies.solution", "Solucao")}: </strong>
              {caseStudy.solution}
            </p>
            <p>
              <strong>
                {t("caseStudies.decisions", "Decisoes tecnicas")}:{" "}
              </strong>
              {caseStudy.decisions}
            </p>
            <p>
              <strong>
                {t("caseStudies.differentials", "Diferenciais")}:{" "}
              </strong>
              {caseStudy.differentials}
            </p>
            <p>
              <strong>{t("caseStudies.technologies", "Tecnologias")}: </strong>
              {caseStudy.technologies}
            </p>
            <p>
              <strong>{t("caseStudies.learnings", "Aprendizados")}: </strong>
              {caseStudy.learnings}
            </p>
            <p>
              <strong>{t("caseStudies.nextSteps", "Proximos passos")}: </strong>
              {caseStudy.nextSteps}
            </p>
          </article>
        </div>
      )}
    </section>
  );
};

export default Work;
