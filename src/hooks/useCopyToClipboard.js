import { useCallback, useRef, useState } from "react";

export const useCopyToClipboard = (timeout = 1800) => {
  const [copiedText, setCopiedText] = useState("");
  const [error, setError] = useState("");
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const copy = useCallback(
    async (text) => {
      clearTimer();
      setError("");

      if (!text) {
        setError("empty");
        return false;
      }

      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.style.position = "fixed";
          textarea.style.left = "-9999px";
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand("copy");
          document.body.removeChild(textarea);
        }

        setCopiedText(text);
        timerRef.current = setTimeout(() => {
          setCopiedText("");
        }, timeout);

        return true;
      } catch (copyError) {
        console.error("Copy failed", copyError);
        setError("copy-failed");
        return false;
      }
    },
    [timeout],
  );

  const reset = useCallback(() => {
    clearTimer();
    setCopiedText("");
    setError("");
  }, []);

  return {
    copy,
    copiedText,
    error,
    reset,
    hasCopied: Boolean(copiedText),
  };
};

export default useCopyToClipboard;
