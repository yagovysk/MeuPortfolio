import React from "react";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import { useTranslation } from "../../hooks/useTranslation";

export function CopyCodeButton({ code, className = "" }) {
  const { t } = useTranslation();
  const { copy, hasCopied } = useCopyToClipboard();

  const handleCopy = async () => {
    await copy(code);
  };

  return (
    <div className="copy-wrapper">
      <button
        type="button"
        onClick={handleCopy}
        className={`copy-button ${className}`.trim()}
        aria-label={t("devlab.copyCodeAria", "Copiar codigo")}
      >
        {hasCopied
          ? t("devlab.copied", "Copiado")
          : t("devlab.copyCode", "Copiar codigo")}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {hasCopied ? t("devlab.copiedMessage", "Codigo copiado") : ""}
      </span>
    </div>
  );
}

export default CopyCodeButton;
