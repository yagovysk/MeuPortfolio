import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./SkillsChart.css";
import { AnimatedSection } from "../AnimatedSection/AnimatedSection";
import { useTranslation } from "../../hooks/useTranslation";

// Import dos ícones existentes
import html from "../../assets/html-icon.svg";
import css from "../../assets/css-icon.svg";
import javascript from "../../assets/javascript-icon.svg";
import react from "../../assets/react-icon.svg";
import typescript from "../../assets/typescript-icon.svg";
import node from "../../assets/node-icon.svg";
import angular from "../../assets/angular-icon.svg";
import vue from "../../assets/vue-icon.svg";
import ruby from "../../assets/ruby-icon.png";
import python from "../../assets/python-icon.svg";
import mysql from "../../assets/mysql-icon.svg";
import tailwind from "../../assets/tailwind-icon.svg";
import postgresql from "../../assets/postgresql-icon.svg";

export function SkillsChart() {
  const { t } = useTranslation();

  // Componente para contador animado
  const AnimatedCounter = ({ target, duration = 1.5 }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: duration * 1000 });

    useEffect(() => {
      const unsubscribe = springValue.on("change", (latest) => {
        setDisplayValue(Math.round(latest));
      });
      return unsubscribe;
    }, [springValue]);

    const handleInView = () => {
      motionValue.set(target);
    };

    return (
      <motion.span
        onViewportEnter={handleInView}
        viewport={{ once: true }}
        className="animated-percentage"
      >
        {displayValue}%
      </motion.span>
    );
  };

  const skills = [
    { name: "React", icon: react, level: 100, color: "#0066ff" },
    { name: "HTML", icon: html, level: 100, color: "#0066ff" },
    { name: "CSS", icon: css, level: 100, color: "#0066ff" },
    { name: "JavaScript", icon: javascript, level: 100, color: "#0066ff" },
    { name: "TypeScript", icon: typescript, level: 100, color: "#0066ff" },
    { name: "Node.js", icon: node, level: 100, color: "#0066ff" },
    { name: "Tailwind CSS", icon: tailwind, level: 100, color: "#0066ff" },
    { name: "Ruby on Rails", icon: ruby, level: 100, color: "#0066ff" },
    { name: "Angular", icon: angular, level: 80, color: "#0080ff" },
    { name: "Vue.js", icon: vue, level: 80, color: "#0080ff" },
    { name: "MySQL", icon: mysql, level: 80, color: "#0080ff" },
    { name: "PostgreSQL", icon: postgresql, level: 80, color: "#0080ff" },
    { name: "Python", icon: python, level: 70, color: "#4da6ff" },
  ];

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

  const progressVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: (level) => ({
      width: `${level}%`,
      opacity: 1,
      transition: {
        width: {
          duration: 1.5,
          ease: "easeInOut",
          delay: 0.8,
        },
        opacity: {
          duration: 0.3,
          delay: 0.5,
        },
      },
    }),
  };

  return (
    <AnimatedSection
      className="skills-chart-section"
      variant="fadeUp"
      delay={0.3}
    >
      <div className="skills-chart-header">
        <h3 className="skills-chart-title">
          {t("skills.title", "Minhas Habilidades Técnicas")}
        </h3>
        <p className="skills-chart-subtitle">
          {t(
            "skills.subtitle",
            "Tecnologias que domino e utilizo no desenvolvimento de projetos"
          )}
        </p>
      </div>

      <motion.div
        className="skills-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="skill-item"
            variants={itemVariants}
          >
            <div className="skill-header">
              <div className="skill-icon-container">
                <img
                  src={skill.icon}
                  alt={`${skill.name} icon`}
                  className="skill-icon"
                />
              </div>
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <AnimatedCounter target={skill.level} />
              </div>
            </div>

            <div className="skill-progress-container">
              <motion.div
                className="skill-progress-bar"
                data-level={skill.level}
                variants={progressVariants}
                custom={skill.level}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
              <div className="skill-progress-bg" />
            </div>

            <div className="skill-level-indicator">
              {skill.level === 100 && (
                <span className="expertise-badge expert">
                  {t("skills.expert", "Especialista")}
                </span>
              )}
              {skill.level >= 80 && skill.level < 100 && (
                <span className="expertise-badge advanced">
                  {t("skills.advanced", "Avançado")}
                </span>
              )}
              {skill.level >= 70 && skill.level < 80 && (
                <span className="expertise-badge intermediate">
                  {t("skills.intermediate", "Intermediário")}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="skills-summary"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-number">
              {skills.filter((s) => s.level === 100).length}
            </span>
            <span className="stat-label">
              {t("skills.expertTechs", "Tecnologias Especialista")}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {skills.filter((s) => s.level >= 80).length}
            </span>
            <span className="stat-label">
              {t("skills.advancedTechs", "Tecnologias Avançado+")}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{skills.length}</span>
            <span className="stat-label">
              {t("skills.totalTechs", "Total de Tecnologias")}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}
