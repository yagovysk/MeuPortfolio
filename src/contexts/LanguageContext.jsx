import React, { createContext, useContext, useReducer, useEffect } from "react";

// Tipos de ações para o reducer
const LANGUAGE_ACTIONS = {
  SET_LANGUAGE: "SET_LANGUAGE",
  TOGGLE_LANGUAGE: "TOGGLE_LANGUAGE",
};

// Estado inicial
const initialState = {
  currentLanguage: "pt",
  availableLanguages: ["pt", "en"],
  isLoading: false,
};

// Reducer para gerenciar mudanças de idioma
const languageReducer = (state, action) => {
  switch (action.type) {
    case LANGUAGE_ACTIONS.SET_LANGUAGE:
      return {
        ...state,
        currentLanguage: action.payload,
        isLoading: false,
      };
    case LANGUAGE_ACTIONS.TOGGLE_LANGUAGE:
      const newLanguage = state.currentLanguage === "pt" ? "en" : "pt";
      return {
        ...state,
        currentLanguage: newLanguage,
        isLoading: false,
      };
    default:
      return state;
  }
};

// Criando o contexto
const LanguageContext = createContext();

// Provider do contexto
export const LanguageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(languageReducer, initialState);

  // Carregar idioma salvo do localStorage na inicialização
  useEffect(() => {
    const savedLanguage = localStorage.getItem("portfolio-language");
    const browserLanguage = navigator.language.split("-")[0];

    if (savedLanguage && ["pt", "en"].includes(savedLanguage)) {
      dispatch({ type: LANGUAGE_ACTIONS.SET_LANGUAGE, payload: savedLanguage });
    } else if (["pt", "en"].includes(browserLanguage)) {
      dispatch({
        type: LANGUAGE_ACTIONS.SET_LANGUAGE,
        payload: browserLanguage,
      });
    } else {
      dispatch({ type: LANGUAGE_ACTIONS.SET_LANGUAGE, payload: "pt" });
    }
  }, []);

  // Salvar idioma no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("portfolio-language", state.currentLanguage);
    document.documentElement.lang = state.currentLanguage;
  }, [state.currentLanguage]);

  // Função para definir idioma específico
  const setLanguage = (language) => {
    if (["pt", "en"].includes(language)) {
      dispatch({ type: LANGUAGE_ACTIONS.SET_LANGUAGE, payload: language });
    }
  };

  // Função para alternar entre idiomas
  const toggleLanguage = () => {
    dispatch({ type: LANGUAGE_ACTIONS.TOGGLE_LANGUAGE });
  };

  // Função para obter o nome do idioma atual
  const getCurrentLanguageName = () => {
    return state.currentLanguage === "pt" ? "Português" : "English";
  };

  // Função para obter a flag do idioma atual
  const getCurrentLanguageFlag = () => {
    return state.currentLanguage === "pt" ? "🇧🇷" : "🇺🇸";
  };

  const value = {
    ...state,
    setLanguage,
    toggleLanguage,
    getCurrentLanguageName,
    getCurrentLanguageFlag,
    isPortuguese: state.currentLanguage === "pt",
    isEnglish: state.currentLanguage === "en",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage deve ser usado dentro de um LanguageProvider");
  }
  return context;
};

export default LanguageContext;
