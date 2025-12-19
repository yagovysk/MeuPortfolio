import { useEffect, useState } from "react";

/**
 * Retorna true quando o media query informado corresponde ao viewport atual.
 * Usa matchMedia com fallback para navegadores que não suportam addEventListener.
 */
export function useMediaQuery(query) {
  const getMatches = () => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return false;
    }
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return undefined;
    }

    const mediaQueryList = window.matchMedia(query);
    const listener = (event) => setMatches(event.matches);

    if (typeof mediaQueryList.addEventListener === "function") {
      mediaQueryList.addEventListener("change", listener);
    } else if (typeof mediaQueryList.addListener === "function") {
      mediaQueryList.addListener(listener);
    }

    setMatches(mediaQueryList.matches);

    return () => {
      if (typeof mediaQueryList.removeEventListener === "function") {
        mediaQueryList.removeEventListener("change", listener);
      } else if (typeof mediaQueryList.removeListener === "function") {
        mediaQueryList.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
}
