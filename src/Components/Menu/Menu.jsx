import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { RiApps2Line } from "react-icons/ri";
import { useTranslation } from "../../hooks/useTranslation";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import "./Menu.css";

export function Menu() {
  const [showMenu, setShowMenu] = useState(false);
  const { t } = useTranslation();
  const isCompactNavigation = useMediaQuery("(max-width: 1150px)");
  const toggleButtonRef = useRef(null);
  const firstLinkRef = useRef(null);
  const wasMenuOpen = useRef(false);
  const menuId = "menu-principal";

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const closeMenu = () => {
    if (!isCompactNavigation) return;
    setShowMenu(false);
  };

  useEffect(() => {
    if (!isCompactNavigation) {
      setShowMenu(false);
      return;
    }

    if (showMenu) {
      requestAnimationFrame(() => {
        firstLinkRef.current?.focus();
      });
    } else if (wasMenuOpen.current) {
      toggleButtonRef.current?.focus();
    }

    wasMenuOpen.current = showMenu;
  }, [showMenu, isCompactNavigation]);

  useEffect(() => {
    if (!isCompactNavigation || !showMenu) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowMenu(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showMenu, isCompactNavigation]);

  const isMenuOpen = isCompactNavigation ? showMenu : true;

  const linkTabIndex = !isCompactNavigation || showMenu ? 0 : -1;

  return (
    <header className="nav-container">
      <Link to="/" className="logo">
        Yago
      </Link>
      <div className="nav-actions">
        <button
          ref={toggleButtonRef}
          className="nav-toggle"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isCompactNavigation ? showMenu : undefined}
          aria-controls={menuId}
          aria-label={
            showMenu
              ? t("nav.closeMenu", "Fechar menu de navegação")
              : t("nav.openMenu", "Abrir menu de navegação")
          }
          hidden={!isCompactNavigation}
        >
          <RiApps2Line className="ri-apps" aria-hidden="true" />
        </button>
      </div>
      <nav
        className={`nav-menu ${isMenuOpen ? "show-menu" : ""}`}
        aria-label="Menu de Navegação"
        id={menuId}
        aria-hidden={isCompactNavigation ? !showMenu : undefined}
      >
        <ul className="container-list">
          <li className="item-list">
            <Link
              to="/"
              className="link"
              ref={firstLinkRef}
              onClick={closeMenu}
              tabIndex={linkTabIndex}
            >
              {t("nav.home", "Home")}
            </Link>
          </li>
          <li className="item-list">
            <Link
              to="/About"
              className="link"
              onClick={closeMenu}
              tabIndex={linkTabIndex}
            >
              {t("nav.about", "Sobre mim")}
            </Link>
          </li>
          <li className="item-list">
            <Link
              to="/Portfolio"
              className="link"
              onClick={closeMenu}
              tabIndex={linkTabIndex}
            >
              {t("nav.portfolio", "Portfolio")}
            </Link>
          </li>
          <li className="item-list">
            <Link
              to="/Contato"
              className="button-list"
              onClick={closeMenu}
              tabIndex={linkTabIndex}
            >
              {t("nav.contact", "Entre em contato")}
            </Link>
          </li>
        </ul>
        {isCompactNavigation && showMenu && (
          <button
            className="menu-close"
            type="button"
            onClick={closeMenu}
            aria-label={t("nav.closeMenu", "Fechar menu de navegação")}
          >
            <FaTimes className="close-icon" aria-hidden="true" />
          </button>
        )}
      </nav>
    </header>
  );
}
