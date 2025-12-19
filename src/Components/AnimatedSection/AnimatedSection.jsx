import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  variant = "fadeUp",
  as = "div",
  ...props
}) {
  const prefersReducedMotion = useReducedMotion();
  const isSmallViewport = useMediaQuery("(max-width: 768px)");
  const shouldReduceMotion = prefersReducedMotion || isSmallViewport;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const MotionComponent = motion[as] || motion.div;

  if (shouldReduceMotion) {
    const StaticComponent = as;
    return (
      <StaticComponent className={className} {...props}>
        {children}
      </StaticComponent>
    );
  }

  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 75 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          delay: delay,
          ease: [0.25, 0.4, 0.25, 1],
        },
      },
    },
    fadeDown: {
      hidden: { opacity: 0, y: -75 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          delay: delay,
          ease: [0.25, 0.4, 0.25, 1],
        },
      },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: -75 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.8,
          delay: delay,
          ease: [0.25, 0.4, 0.25, 1],
        },
      },
    },
    fadeRight: {
      hidden: { opacity: 0, x: 75 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.8,
          delay: delay,
          ease: [0.25, 0.4, 0.25, 1],
        },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.6,
          delay: delay,
          ease: [0.25, 0.4, 0.25, 1],
        },
      },
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          duration: 0.8,
          delay: delay,
          ease: [0.25, 0.4, 0.25, 1],
        },
      },
    },
  };

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
