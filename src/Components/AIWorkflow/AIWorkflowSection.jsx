import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import "./AIWorkflowSection.css";

const steps = [
  "problem-understanding",
  "ai-support",
  "technical-review",
  "tests-validation",
  "real-delivery",
];

export function AIWorkflowSection() {
  const { t } = useTranslation();

  return (
    <section
      id="ai-workflow"
      className="ai-workflow-section"
      aria-labelledby="ai-workflow-title"
    >
      <div className="ai-workflow-container">
        <h2 id="ai-workflow-title">
          {t("aiWorkflow.title", "IA como ferramenta, nao como muleta")}
        </h2>
        <p>
          {t(
            "aiWorkflow.description",
            "Uso IA para acelerar desenvolvimento, mas com validacao tecnica humana em cada etapa.",
          )}
        </p>

        <div className="ai-workflow-grid">
          {steps.map((stepId) => (
            <article key={stepId} className="ai-step-card">
              <h3>{t(`aiWorkflow.steps.${stepId}.title`, stepId)}</h3>
              <p>{t(`aiWorkflow.steps.${stepId}.description`, "")}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AIWorkflowSection;
