import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import "./FloatingLanguageButton.css";

const FloatingLanguageButton = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const optionRefs = useRef([]);
  const toggleButtonRef = useRef(null);
  const wasOpenRef = useRef(false);
  const dropdownId = "seletor-idioma-menu";

  const toggleLanguage = (newLang) => {
    setLanguage(newLang);
    setIsOpen(false);
  };

  const languages = [
    { code: "pt", flag: "🇧🇷", name: "Português", fallback: "BR" },
    { code: "en", flag: "🇺🇸", name: "English", fallback: "EN" },
  ];

  // Adicionar verificação de segurança
  const currentLanguageObj =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  // Se não houver currentLanguage definido, não renderizar ainda
  if (!currentLanguage) {
    return null;
  }

  // Componente para renderizar bandeira com fallback
  const FlagIcon = ({ flag, fallback }) => {
    return (
      <span className="language-flag">
        <span className="emoji-flag">{flag}</span>
        <span className="text-flag">{fallback}</span>
      </span>
    );
  };

  useEffect(() => {
    if (!isOpen) {
      optionRefs.current = [];
      return undefined;
    }

    const focusFirst = () => {
      optionRefs.current[0]?.focus();
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
      }

      if (
        (event.key === "ArrowDown" || event.key === "ArrowUp") &&
        optionRefs.current.length > 0
      ) {
        event.preventDefault();
        const currentIndex = optionRefs.current.findIndex(
          (ref) => ref === document.activeElement
        );
        const nextIndex =
          event.key === "ArrowDown"
            ? (currentIndex + 1) % optionRefs.current.length
            : (currentIndex - 1 + optionRefs.current.length) %
              optionRefs.current.length;
        optionRefs.current[nextIndex]?.focus();
      }
    };

    focusFirst();
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      toggleButtonRef.current?.focus();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  return (
    <div className="floating-language-container">
      <motion.button
        className="floating-language-btn"
        ref={toggleButtonRef}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          rotate: isOpen ? 180 : 0,
          backgroundColor: isOpen ? "#00d4ff" : "#1a1a1a",
        }}
        transition={{ duration: 0.3 }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
        aria-label="Selecionar idioma"
        type="button"
      >
        <FlagIcon
          flag={currentLanguageObj.flag}
          fallback={currentLanguageObj.fallback}
        />
        <motion.span
          className="language-arrow"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        >
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="language-dropdown"
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="listbox"
            aria-label="Idiomas disponíveis"
            id={dropdownId}
          >
            {languages.map((lang, index) => (
              <motion.button
                key={lang.code}
                className={`language-option ${
                  currentLanguage === lang.code ? "active" : ""
                }`}
                onClick={() => toggleLanguage(lang.code)}
                whileHover={{
                  backgroundColor: "#00d4ff",
                  x: 5,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                role="option"
                aria-selected={currentLanguage === lang.code}
                type="button"
                ref={(ref) => {
                  optionRefs.current[index] = ref;
                }}
              >
                <span className="option-flag">
                  <span className="emoji-flag">{lang.flag}</span>
                  <span className="text-flag">{lang.fallback}</span>
                </span>
                <span className="option-name">{lang.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop para fechar quando clicar fora */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="language-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingLanguageButton;
