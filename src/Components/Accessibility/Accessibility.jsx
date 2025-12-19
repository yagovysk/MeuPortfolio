import React, { useState, useEffect, useRef } from "react";
import {
  FaUniversalAccess,
  FaTextHeight,
  FaMinus,
  FaPlus,
  FaAdjust,
  FaSun,
  FaMoon,
  FaFont,
  FaTimes,
} from "react-icons/fa";
import "./Accessibility.css";

export default function Accessibility() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [contrast, setContrast] = useState("normal");
  const [theme, setTheme] = useState("light");
  const triggerButtonRef = useRef(null);
  const menuRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    // Carregar configurações salvas
    const savedFontSize = localStorage.getItem("fontSize");
    const savedContrast = localStorage.getItem("contrast");
    const savedTheme = localStorage.getItem("theme");

    if (savedFontSize) setFontSize(Number(savedFontSize));
    if (savedContrast) setContrast(savedContrast);
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    // Aplicar tamanho da fonte
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  useEffect(() => {
    // Remover classes anteriores de contraste
    document.body.classList.remove("contrast-normal", "contrast-high");
    // Adicionar classe atual de contraste
    document.body.classList.add(`contrast-${contrast}`);
    localStorage.setItem("contrast", contrast);
  }, [contrast]);

  useEffect(() => {
    // Remover classes anteriores de tema
    document.body.classList.remove("theme-light", "theme-dark");
    // Adicionar classe atual de tema
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const increaseFontSize = () => {
    if (fontSize < 150) setFontSize(fontSize + 10);
  };

  const decreaseFontSize = () => {
    if (fontSize > 70) setFontSize(fontSize - 10);
  };

  const resetFontSize = () => {
    setFontSize(100);
  };

  const toggleContrast = () => {
    setContrast(contrast === "normal" ? "high" : "normal");
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const resetAll = () => {
    setFontSize(100);
    setContrast("normal");
    setTheme("light");
    localStorage.removeItem("fontSize");
    localStorage.removeItem("contrast");
    localStorage.removeItem("theme");
  };

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        (closeButtonRef.current || menuRef.current)?.focus();
      });
    } else {
      triggerButtonRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const accessibilityMenuId = "painel-acessibilidade";

  return (
    <>
      {/* Botão Flutuante */}
      <button
        ref={triggerButtonRef}
        className="accessibility-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu de Acessibilidade"
        title="Abrir menu de acessibilidade"
        aria-expanded={isOpen}
        aria-controls={accessibilityMenuId}
      >
        <FaUniversalAccess />
      </button>

      {/* Menu de Acessibilidade */}
      {isOpen && (
        <div
          ref={menuRef}
          className="accessibility-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby="acessibilidade-titulo"
          aria-describedby="acessibilidade-descricao"
          id={accessibilityMenuId}
          tabIndex={-1}
        >
          <div className="accessibility-header">
            <h3 className="accessibility-title" id="acessibilidade-titulo">
              <FaUniversalAccess />
              Acessibilidade
            </h3>
            <button
              ref={closeButtonRef}
              className="accessibility-close"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar menu"
              title="Fechar"
            >
              <FaTimes />
            </button>
          </div>

          <div className="accessibility-content" id="acessibilidade-descricao">
            {/* Controle de Tamanho da Fonte */}
            <div className="accessibility-section">
              <label className="accessibility-label">
                <FaTextHeight />
                Tamanho da Fonte
              </label>
              <div className="accessibility-controls">
                <button
                  className="control-btn"
                  onClick={decreaseFontSize}
                  aria-label="Diminuir fonte"
                  title="Diminuir fonte"
                  disabled={fontSize <= 70}
                >
                  <FaMinus />
                </button>
                <span className="control-value">{fontSize}%</span>
                <button
                  className="control-btn"
                  onClick={increaseFontSize}
                  aria-label="Aumentar fonte"
                  title="Aumentar fonte"
                  disabled={fontSize >= 150}
                >
                  <FaPlus />
                </button>
                <button
                  className="control-btn reset-btn"
                  onClick={resetFontSize}
                  aria-label="Resetar fonte"
                  title="Resetar fonte"
                >
                  <FaFont />
                </button>
              </div>
            </div>

            {/* Controle de Contraste */}
            <div className="accessibility-section">
              <label className="accessibility-label">
                <FaAdjust />
                Contraste
              </label>
              <button
                className={`accessibility-btn ${
                  contrast === "high" ? "active" : ""
                }`}
                onClick={toggleContrast}
                aria-label="Alternar contraste"
                title={
                  contrast === "normal"
                    ? "Ativar alto contraste"
                    : "Desativar alto contraste"
                }
              >
                {contrast === "normal" ? "Normal" : "Alto Contraste"}
              </button>
            </div>

            {/* Controle de Tema */}
            <div className="accessibility-section">
              <label className="accessibility-label">
                {theme === "light" ? <FaSun /> : <FaMoon />}
                Tema
              </label>
              <button
                className={`accessibility-btn ${
                  theme === "dark" ? "active" : ""
                }`}
                onClick={toggleTheme}
                aria-label="Alternar tema"
                title={
                  theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"
                }
              >
                {theme === "light" ? "Claro" : "Escuro"}
              </button>
            </div>

            {/* Botão Resetar Tudo */}
            <button
              className="accessibility-reset"
              onClick={resetAll}
              aria-label="Resetar todas configurações"
              title="Resetar todas as configurações"
            >
              Resetar Tudo
            </button>
          </div>
        </div>
      )}

      {/* Overlay quando menu aberto */}
      {isOpen && (
        <div
          className="accessibility-overlay"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
