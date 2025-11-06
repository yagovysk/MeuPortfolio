import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./PWAInstall.css";

const PWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showMobileBanner, setShowMobileBanner] = useState(false);

  useEffect(() => {
    // Verificar se já está instalado
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Listener para o evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);

      // Verificar se o usuário não dispensou o banner antes
      const dismissed = localStorage.getItem("pwa-install-dismissed");
      if (!dismissed) {
        setShowInstallBanner(true);
      }
    };

    // Listener para quando o app é instalado
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      setShowMobileBanner(false);
      localStorage.setItem("pwa-installed", "true");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Mostrar banner específico para mobile após 10 segundos
    const mobileTimer = setTimeout(() => {
      if (
        !isInstalled &&
        !localStorage.getItem("pwa-install-dismissed") &&
        window.innerWidth <= 768
      ) {
        setShowMobileBanner(true);
      }
    }, 10000);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
      clearTimeout(mobileTimer);
    };
  }, [isInstalled]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      const result = await deferredPrompt.prompt();
      console.log("Install prompt result:", result.outcome);

      if (result.outcome === "accepted") {
        setShowInstallBanner(false);
        setShowMobileBanner(false);
      }
    } catch (error) {
      console.error("Error installing PWA:", error);
    }

    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    setShowMobileBanner(false);
    localStorage.setItem("pwa-install-dismissed", "true");
  };

  const bannerVariants = {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      y: 100,
      scale: 0.8,
      transition: {
        duration: 0.3,
      },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  if (isInstalled) return null;

  return (
    <>
      {/* Banner principal de instalação */}
      <AnimatePresence>
        {showInstallBanner && (
          <motion.div
            className="pwa-install-banner"
            variants={bannerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="pwa-banner-content">
              <motion.div
                className="pwa-icon"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 14V6C19 5.44772 18.5523 5 18 5H6C5.44772 5 5 5.44772 5 6V14"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M7 19H17C18.1046 19 19 18.1046 19 17V14H5V17C5 18.1046 5.89543 19 7 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 9V13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 11L12 8L15 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              <div className="pwa-text">
                <h3>Instalar Portfolio</h3>
                <p>Acesse offline e tenha uma experiência mais rápida!</p>
              </div>
            </div>

            <div className="pwa-actions">
              <motion.button
                className="pwa-btn pwa-btn-install"
                onClick={handleInstallClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Instalar
              </motion.button>

              <motion.button
                className="pwa-btn pwa-btn-dismiss"
                onClick={handleDismiss}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ✕
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Banner específico para mobile */}
      <AnimatePresence>
        {showMobileBanner && (
          <motion.div
            className="pwa-mobile-banner"
            variants={bannerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="pwa-mobile-content">
              <div className="pwa-mobile-icon">📱</div>
              <div className="pwa-mobile-text">
                <strong>Adicionar à Tela Inicial</strong>
                <span>Para uma experiência completa!</span>
              </div>
            </div>

            <div className="pwa-mobile-actions">
              {deferredPrompt ? (
                <motion.button
                  className="pwa-mobile-btn install"
                  onClick={handleInstallClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Instalar
                </motion.button>
              ) : (
                <div className="pwa-manual-instructions">
                  <span>Toque em</span>
                  <div className="share-icon">⤴️</div>
                  <span>e depois "Adicionar à Tela Inicial"</span>
                </div>
              )}

              <motion.button
                className="pwa-mobile-btn dismiss"
                onClick={handleDismiss}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Não, obrigado
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PWAInstall;
