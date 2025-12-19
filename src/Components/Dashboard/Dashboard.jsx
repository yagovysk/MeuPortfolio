import React, { useRef } from "react";
import {
  motion,
  useInView,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useTranslation } from "../../hooks/useTranslation";
import "./Dashboard.css";
import { useMediaQuery } from "../../hooks/useMediaQuery";

// Hook para contador animado avançado
const useCounter = (target, isInView, shouldReduceMotion) => {
  if (shouldReduceMotion) {
    return target;
  }

  const spring = useSpring(0, {
    bounce: 0.25,
    duration: 2500,
  });

  React.useEffect(() => {
    if (isInView) {
      spring.set(target);
    }
  }, [isInView, target, spring]);

  const rounded = useTransform(spring, (value) => Math.round(value));

  return rounded;
};

const Dashboard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const isMobileViewport = useMediaQuery("(max-width: 768px)");
  const shouldReduceMotion = prefersReducedMotion || isMobileViewport;

  // Contadores animados
  const projectsCount = useCounter(13, isInView, shouldReduceMotion);
  const clientsCount = useCounter(8, isInView, shouldReduceMotion);
  const yearsCount = useCounter(3, isInView, shouldReduceMotion);
  const techCount = useCounter(10, isInView, shouldReduceMotion);

  const stats = [
    {
      count: projectsCount,
      label: t("dashboard.projects", "Projetos Completos"),
      icon: "🚀",
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      color: "#3B82F6",
    },
    {
      count: clientsCount,
      label: t("dashboard.clients", "Clientes Satisfeitos"),
      icon: "😊",
      gradient: "from-green-400 via-cyan-500 to-blue-500",
      color: "#10B981",
    },
    {
      count: yearsCount,
      label: t("dashboard.years", "Anos de Experiência"),
      icon: "📈",
      gradient: "from-yellow-400 via-red-500 to-pink-500",
      color: "#F59E0B",
    },
    {
      count: techCount,
      label: t("dashboard.technologies", "Tecnologias Dominadas"),
      icon: "💻",
      gradient: "from-purple-400 via-pink-500 to-red-500",
      color: "#8B5CF6",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: {
      y: 60,
      opacity: 0,
      scale: 0.8,
      rotateX: -15,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1.2,
      },
    },
  };

  return (
    <section className="dashboard" ref={ref}>
      {/* Background Effects */}
      <div className="dashboard-bg-effects">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
        <div className="grid-pattern"></div>
      </div>

      <motion.div
        className="dashboard-container"
        variants={containerVariants}
        initial={shouldReduceMotion ? undefined : "hidden"}
        animate={
          shouldReduceMotion ? undefined : isInView ? "visible" : "hidden"
        }
      >
        <motion.div className="dashboard-header" variants={cardVariants}>
          <h2 className="dashboard-title">
            <span className="title-gradient">
              {t("dashboard.title", "Meu Progresso")}
            </span>
          </h2>
          <p className="dashboard-subtitle">
            {t(
              "dashboard.subtitle",
              "Transformando ideias em realidade digital"
            )}
          </p>
        </motion.div>

        <div className="dashboard-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="dashboard-card"
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="card-bg-gradient"
                style={{
                  background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}05)`,
                }}
              ></div>

              <div className="card-content">
                <div className="dashboard-icon-container">
                  <div
                    className="icon-glow"
                    style={{ boxShadow: `0 0 30px ${stat.color}50` }}
                  >
                    <span className="dashboard-icon">{stat.icon}</span>
                  </div>
                </div>

                <motion.div className="dashboard-number">
                  <motion.span className="count-number">
                    {stat.count}
                  </motion.span>
                  <span className="plus-sign">+</span>
                </motion.div>

                <div className="dashboard-label">{stat.label}</div>

                <div className="card-progress-bar">
                  <motion.div
                    className="progress-fill"
                    style={{ backgroundColor: stat.color }}
                    initial={shouldReduceMotion ? undefined : { width: 0 }}
                    animate={
                      shouldReduceMotion
                        ? { width: "100%" }
                        : isInView
                        ? { width: "100%" }
                        : { width: 0 }
                    }
                    transition={{
                      delay: shouldReduceMotion ? 0 : index * 0.2 + 0.5,
                      duration: shouldReduceMotion ? 0.2 : 1.5,
                    }}
                  />
                </div>
              </div>

              <div className="card-shine"></div>
            </motion.div>
          ))}
        </div>

        <motion.div className="dashboard-footer" variants={cardVariants}>
          <div className="achievement-badge">
            <span className="badge-icon">🏆</span>
            <span className="badge-text">
              {t("dashboard.badge", "Portfolio em constante evolução")}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Dashboard;
