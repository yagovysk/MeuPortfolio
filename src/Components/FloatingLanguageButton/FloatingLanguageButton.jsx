import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import "./FloatingLanguageButton.css";

const FloatingLanguageButton = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = (newLang) => {
    setLanguage(newLang);
    setIsOpen(false);
  };

  const languages = [
    { code: "pt", flag: "🇧🇷", name: "Português" },
    { code: "en", flag: "🇺🇸", name: "English" },
  ];

  // Adicionar verificação de segurança
  const currentLanguageObj =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  // Se não houver currentLanguage definido, não renderizar ainda
  if (!currentLanguage) {
    return null;
  }

  return (
    <div className="floating-language-container">
      <motion.button
        className="floating-language-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          rotate: isOpen ? 180 : 0,
          backgroundColor: isOpen ? "#00d4ff" : "#1a1a1a",
        }}
        transition={{ duration: 0.3 }}
      >
        <span className="language-flag">{currentLanguageObj.flag}</span>
        <motion.span
          className="language-arrow"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
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
          >
            {languages.map((lang) => (
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
              >
                <span className="option-flag">{lang.flag}</span>
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
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingLanguageButton;
