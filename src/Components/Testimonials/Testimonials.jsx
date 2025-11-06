import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import {
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";
import { useTranslation } from "../../hooks/useTranslation";
import "./Testimonials.css";
import foto1 from "../../assets/perfil1.jpg";
import foto2 from "../../assets/perfil-2.png";
import foto3 from "../../assets/perfil-3.jpg";
import "swiper/css";
import "swiper/css/pagination";

export function Testimonials() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Hook para detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Geovanna de Souza",
      role: t("testimonials.role1", "Empresária"),
      image: foto1,
      rating: 5,
      text: t(
        "testimonials.text1",
        "Eu solicitei uma landing page para minha empresa, o serviço foi rápido e bem feito, gostaria de parabenizar o Yago por um excelente trabalho."
      ),
    },
    {
      id: 2,
      name: "Leonardo Ferreira",
      role: t("testimonials.role2", "Empreendedor"),
      image: foto2,
      rating: 5,
      text: t(
        "testimonials.text2",
        "Super recomendo, preços acessíveis, atendimento e esclarecimento de dúvidas ótimos. Só Sucesso!"
      ),
    },
    {
      id: 3,
      name: "Lucas Monteiro",
      role: t("testimonials.role3", "Diretor de Marketing"),
      image: foto3,
      rating: 5,
      text: t(
        "testimonials.text3",
        "Contrato respeitando todos os critérios, soube extrair bem a necessidade que eu tinha para melhorar a prospecção do meu negócio, recomendo demais."
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 50 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="testimonials-section">
      <motion.div
        className="testimonials-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <motion.div className="testimonials-header" variants={titleVariants}>
          <h2 className="testimonials-title">
            <span className="title-highlight">
              {t("testimonials.title", "O que dizem")}
            </span>
            <br />
            {t("testimonials.subtitle", "Sobre mim?")}
          </h2>
          <p className="testimonials-subtitle">
            {t(
              "testimonials.description",
              "Depoimentos reais de clientes satisfeitos com meus serviços"
            )}
          </p>
        </motion.div>

        {/* Testimonials Content */}
        <motion.div
          className="testimonials-carousel"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {isMobile ? (
            // Mobile: Swiper Carousel
            <>
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                onSwiper={setSwiperInstance}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={false}
                className="testimonials-swiper"
              >
                {testimonials.map((testimonial, index) => (
                  <SwiperSlide key={testimonial.id}>
                    <TestimonialCard testimonial={testimonial} index={index} />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Mobile Navigation */}
              <div className="testimonials-navigation mobile-nav">
                <motion.button
                  className="nav-button nav-prev"
                  onClick={() => {
                    if (swiperInstance) {
                      if (activeIndex > 0) {
                        swiperInstance.slidePrev();
                      } else {
                        swiperInstance.slideTo(testimonials.length - 1);
                      }
                    }
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaChevronLeft />
                </motion.button>
                <motion.button
                  className="nav-button nav-next"
                  onClick={() => {
                    if (swiperInstance) {
                      if (activeIndex < testimonials.length - 1) {
                        swiperInstance.slideNext();
                      } else {
                        swiperInstance.slideTo(0);
                      }
                    }
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaChevronRight />
                </motion.button>
              </div>
            </>
          ) : (
            // Desktop: Static Grid
            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={index}
                  isStatic={true}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Background Effects */}
        <div className="testimonials-bg-effects">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
      </motion.div>
    </section>
  );
}

// Componente TestimonialCard separado para reutilização
const TestimonialCard = ({ testimonial, index, isStatic = false }) => {
  return (
    <motion.div
      className={`testimonial-card ${isStatic ? "static-card" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: isStatic ? index * 0.2 : index * 0.1 }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 },
      }}
    >
      {/* Quote Icon */}
      <div className="quote-icon">
        <FaQuoteLeft />
      </div>

      {/* Stars Rating */}
      <div className="testimonial-rating">
        {[...Array(testimonial.rating)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: (isStatic ? index * 0.2 : 0) + 0.5 + i * 0.1 }}
          >
            <FaStar className="star" />
          </motion.div>
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="testimonial-text">"{testimonial.text}"</p>

      {/* Client Info */}
      <div className="testimonial-client">
        <div className="client-image-container">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="client-image"
          />
          <div className="image-glow"></div>
        </div>
        <div className="client-info">
          <h4 className="client-name">{testimonial.name}</h4>
          <p className="client-role">{testimonial.role}</p>
        </div>
      </div>

      {/* Card Background Effect */}
      <div className="card-bg-effect"></div>
    </motion.div>
  );
};
