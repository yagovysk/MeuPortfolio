import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./TVNoiseEffect.css";

const TVNoiseEffect = ({
  isActive = false,
  onTransitionComplete,
  isTuning = false,
}) => {
  const [showEffect, setShowEffect] = useState(!isActive);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [signalStrength, setSignalStrength] = useState(0);
  const [tuningPhase, setTuningPhase] = useState("searching"); // 'searching', 'connecting', 'signal-found', 'clear'

  useEffect(() => {
    if (isActive && showEffect && !isTuning) {
      // Lógica original para slides que saem do centro
      setIsTransitioning(true);
      setTuningPhase("searching");

      const searchTimer = setTimeout(() => {
        setTuningPhase("connecting");

        let strength = 0;
        const strengthInterval = setInterval(() => {
          strength += Math.random() * 12 + 8;
          setSignalStrength(Math.min(strength, 100));

          if (strength >= 100) {
            clearInterval(strengthInterval);
            setTuningPhase("signal-found");

            setTimeout(() => {
              setTuningPhase("clear");
              setTimeout(() => {
                setShowEffect(false);
                setIsTransitioning(false);
                if (onTransitionComplete) onTransitionComplete();
              }, 600);
            }, 800);
          }
        }, 120);
      }, 600);

      return () => clearTimeout(searchTimer);
    } else if (!isActive && !showEffect) {
      // Transição para esconder a imagem
      setShowEffect(true);
      setSignalStrength(0);
      setTuningPhase("searching");
    }
  }, [isActive, showEffect, onTransitionComplete, isTuning]);

  // Nova lógica: Animação de sintonização quando slide se torna ativo
  useEffect(() => {
    if (isActive && isTuning) {
      console.log("Starting tuning animation for active slide");
      setShowEffect(true);
      setIsTransitioning(true);
      setTuningPhase("connecting");
      setSignalStrength(0);

      // Animação de sintonização rápida
      let strength = 0;
      const quickTuning = setInterval(() => {
        strength += Math.random() * 20 + 15;
        setSignalStrength(Math.min(strength, 100));

        if (strength >= 100) {
          clearInterval(quickTuning);
          setTuningPhase("signal-found");

          setTimeout(() => {
            setTuningPhase("clear");
            setTimeout(() => {
              setShowEffect(false);
              setIsTransitioning(false);
              if (onTransitionComplete) onTransitionComplete();
            }, 800);
          }, 1000);
        }
      }, 100);

      return () => clearInterval(quickTuning);
    }
  }, [isActive, isTuning, onTransitionComplete]);

  if (!showEffect && !isTransitioning) return null;

  return (
    <AnimatePresence>
      {(showEffect || isTransitioning) && (
        <motion.div
          className={`tv-effect-overlay ${
            isTransitioning ? "tuning" : "static"
          } ${tuningPhase}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background Pattern */}
          <div className="tv-background" />

          {/* Noise Layer */}
          <div className="tv-noise-layer">
            <motion.div
              className="noise-pattern noise-1"
              animate={{
                opacity: tuningPhase === "connecting" ? [0.4, 0.8, 0.4] : 0.4,
                scale: tuningPhase === "connecting" ? [1, 1.05, 1] : 1,
              }}
              transition={{
                duration: 0.2,
                repeat: tuningPhase === "connecting" ? Infinity : 0,
              }}
            />
            <motion.div
              className="noise-pattern noise-2"
              animate={{
                opacity: tuningPhase === "connecting" ? [0.3, 0.6, 0.3] : 0.3,
              }}
              transition={{
                duration: 0.15,
                repeat: tuningPhase === "connecting" ? Infinity : 0,
              }}
            />
            <motion.div
              className="noise-pattern noise-3"
              animate={{
                opacity: tuningPhase === "connecting" ? [0.2, 0.5, 0.2] : 0.2,
              }}
              transition={{
                duration: 0.25,
                repeat: tuningPhase === "connecting" ? Infinity : 0,
              }}
            />
          </div>

          {/* Scanlines */}
          <div className="tv-scanlines" />

          {/* Interference Bands */}
          <div className="interference-bands">
            <div className="band band-1" />
            <div className="band band-2" />
            <div className="band band-3" />
          </div>

          {/* Static Overlay */}
          <div className="static-overlay" />

          {/* Signal Bars (when tuning) */}
          {(isTransitioning || tuningPhase === "connecting") && (
            <motion.div
              className="signal-strength"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="signal-bars">
                {[1, 2, 3, 4, 5].map((bar) => (
                  <motion.div
                    key={bar}
                    className={`signal-bar bar-${bar}`}
                    initial={{ height: 0 }}
                    animate={{
                      height: signalStrength >= bar * 20 ? `${bar * 20}%` : 0,
                      backgroundColor:
                        signalStrength >= bar * 20
                          ? bar <= 2
                            ? "#ff4444"
                            : bar <= 4
                            ? "#ffff44"
                            : "#44ff44"
                          : "#333",
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
              <motion.div
                className="signal-text"
                animate={{
                  opacity: tuningPhase === "signal-found" ? [1, 0.5, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  repeat: tuningPhase === "signal-found" ? 3 : 0,
                }}
              >
                {tuningPhase === "searching" && "PROCURANDO SINAL..."}
                {tuningPhase === "connecting" && "SINTONIZANDO..."}
                {tuningPhase === "signal-found" && "SINAL ENCONTRADO!"}
                {tuningPhase === "clear" && "SINAL ESTÁVEL"}
              </motion.div>
              <motion.div
                className="signal-percentage"
                initial={{ opacity: 0 }}
                animate={{ opacity: tuningPhase === "connecting" ? 1 : 0 }}
              >
                {Math.round(signalStrength)}%
              </motion.div>
            </motion.div>
          )}

          {/* No Signal Message */}
          {!isTransitioning && (
            <motion.div
              className="no-signal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="signal-icon">📺</div>
              <div className="signal-message">SEM SINAL</div>
              <div className="channel-info">CANAL DESCONECTADO</div>
            </motion.div>
          )}

          {/* VHS Effects */}
          <div className="vhs-effects">
            <div className="vhs-line vhs-line-1" />
            <div className="vhs-line vhs-line-2" />
          </div>

          {/* RGB Distortion */}
          <div className="rgb-distortion" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TVNoiseEffect;
