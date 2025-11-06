import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { RiApps2Line } from "react-icons/ri";
import { useTranslation } from "../../hooks/useTranslation";
import "./Menu.css";

export function Menu() {
  const [showMenu, setShowMenu] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <nav className="nav-container">
      <Link to="/" href="" className="logo">
        Yago
      </Link>
      <div className="nav-actions">
        <div className="nav-toggle" onClick={toggleMenu}>
          <RiApps2Line className="ri-apps" />
        </div>
      </div>
      <nav
        className={`nav-menu ${showMenu ? "show-menu" : ""}`}
        aria-label="Menu de Navegação"
      >
        <ul className="container-list">
          <li className="item-list">
            <Link to="/" href="" className="link">
              {t("nav.home", "Home")}
            </Link>
          </li>
          <li className="item-list">
            <Link to="/About" href="" className="link">
              {t("nav.about", "Sobre mim")}
            </Link>
          </li>
          <li className="item-list">
            <Link to="/Portfolio" href="" className="link">
              {t("nav.portfolio", "Portfolio")}
            </Link>
          </li>
          <li className="item-list">
            <Link to="/Contato" href="" className="button-list">
              {t("nav.contact", "Entre em contato")}
            </Link>
          </li>
        </ul>
        <div className="menu-close" onClick={toggleMenu}>
          <FaTimes className="close-icon" />
        </div>
      </nav>
    </nav>
  );
}
