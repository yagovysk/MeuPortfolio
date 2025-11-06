import { useCallback } from "react";
import { useLanguage } from "../contexts/LanguageContext";

// Importar as traduções
import ptTranslations from "../locales/pt.json";
import enTranslations from "../locales/en.json";

// Objeto com todas as traduções
const translations = {
  pt: ptTranslations,
  en: enTranslations,
};

// Hook personalizado para traduções
export const useTranslation = () => {
  const { currentLanguage } = useLanguage();

  // Função para obter tradução por chave
  const t = useCallback(
    (key, fallback = "") => {
      if (!key) return fallback;

      // Separar chaves aninhadas (ex: "hero.title")
      const keys = key.split(".");
      let translation = translations[currentLanguage];

      // Navegar pelas chaves aninhadas
      for (const k of keys) {
        if (
          translation &&
          typeof translation === "object" &&
          translation[k] !== undefined
        ) {
          translation = translation[k];
        } else {
          // Se não encontrar, tentar no idioma de fallback (português)
          let fallbackTranslation = translations.pt;
          for (const fallbackKey of keys) {
            if (
              fallbackTranslation &&
              typeof fallbackTranslation === "object" &&
              fallbackTranslation[fallbackKey] !== undefined
            ) {
              fallbackTranslation = fallbackTranslation[fallbackKey];
            } else {
              return fallback || key;
            }
          }
          return fallbackTranslation;
        }
      }

      return translation || fallback || key;
    },
    [currentLanguage]
  );

  // Função para obter tradução com interpolação de variáveis
  const tWithVars = useCallback(
    (key, variables = {}, fallback = "") => {
      let translation = t(key, fallback);

      // Substituir variáveis na string (ex: "Hello {{name}}")
      if (
        typeof translation === "string" &&
        Object.keys(variables).length > 0
      ) {
        Object.entries(variables).forEach(([varKey, varValue]) => {
          const regex = new RegExp(`{{\\s*${varKey}\\s*}}`, "g");
          translation = translation.replace(regex, varValue);
        });
      }

      return translation;
    },
    [t]
  );

  // Função para verificar se uma chave existe
  const hasTranslation = useCallback(
    (key) => {
      const keys = key.split(".");
      let translation = translations[currentLanguage];

      for (const k of keys) {
        if (
          translation &&
          typeof translation === "object" &&
          translation[k] !== undefined
        ) {
          translation = translation[k];
        } else {
          return false;
        }
      }

      return translation !== undefined;
    },
    [currentLanguage]
  );

  // Função para obter todas as traduções de uma seção
  const getSection = useCallback(
    (sectionKey) => {
      return t(sectionKey, {});
    },
    [t]
  );

  // Função para obter idioma atual formatado
  const getCurrentLanguageInfo = useCallback(() => {
    return {
      code: currentLanguage,
      name: currentLanguage === "pt" ? "Português" : "English",
      flag: currentLanguage === "pt" ? "🇧🇷" : "🇺🇸",
      direction: "ltr", // Ambos idiomas são left-to-right
    };
  }, [currentLanguage]);

  return {
    t,
    tWithVars,
    hasTranslation,
    getSection,
    getCurrentLanguageInfo,
    currentLanguage,
    isPortuguese: currentLanguage === "pt",
    isEnglish: currentLanguage === "en",
  };
};

export default useTranslation;
