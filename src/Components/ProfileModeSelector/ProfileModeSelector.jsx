import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { profileModes } from "../../data/profileModesData";
import "./ProfileModeSelector.css";

export function ProfileModeSelector() {
  const { t } = useTranslation();
  const [selectedMode, setSelectedMode] = useLocalStorage(
    "portfolio-profile-mode",
    "recruiter",
  );

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      className="profile-mode-section"
      aria-labelledby="profile-mode-title"
    >
      <div className="profile-mode-container">
        <h2 id="profile-mode-title">
          {t("profileMode.title", "Como voce quer conhecer meu trabalho?")}
        </h2>
        <p>
          {t(
            "profileMode.subtitle",
            "Selecione um perfil para destacar os conteudos mais relevantes.",
          )}
        </p>

        <div
          className="profile-mode-buttons"
          role="radiogroup"
          aria-label={t("profileMode.title", "Modo de visualizacao")}
        >
          {profileModes.map((mode) => (
            <button
              key={mode}
              type="button"
              role="radio"
              aria-checked={selectedMode === mode}
              className={`profile-mode-button ${selectedMode === mode ? "is-active" : ""}`.trim()}
              onClick={() => setSelectedMode(mode)}
            >
              {t(`profileMode.options.${mode}`, mode)}
            </button>
          ))}
        </div>

        <ul className="profile-mode-focus" aria-live="polite">
          {(t(`profileMode.focus.${selectedMode}`, []) || []).map(
            (focusItem) => (
              <li key={focusItem}>{focusItem}</li>
            ),
          )}
        </ul>

        <div className="profile-mode-quick-actions">
          {(t(`profileMode.quickLinks.${selectedMode}`, []) || []).map(
            (item) => (
              <button
                type="button"
                key={item.section}
                className="profile-mode-link"
                onClick={() => scrollToSection(item.section)}
              >
                {item.label}
              </button>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export default ProfileModeSelector;
