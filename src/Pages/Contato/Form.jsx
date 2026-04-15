import { Menu } from "../../Components/Menu/Menu";
import React, { useMemo, useState } from "react";
import "./Form.css";
import { AnimatedSection } from "../../Components/AnimatedSection/AnimatedSection";
import { useTranslation } from "../../hooks/useTranslation";

export function Form() {
  const { t } = useTranslation();
  const MessageModal = ({ message, onClose }) => (
    <div
      className="message-modal"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <p className="paragraph-message">{message}</p>
      <button type="button" onClick={onClose} className="form-close-alert">
        {t("contact.closeMessage", "Fechar mensagem")}
      </button>
    </div>
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  const ids = useMemo(
    () => ({
      name: "contato-nome",
      email: "contato-email",
      tel: "contato-telefone",
      message: "contato-mensagem",
    }),
    [],
  );

  function sendToWhatsApp(e) {
    e.preventDefault();

    // Validações
    const telRegex = /^[0-9]*$/;
    if (tel && !telRegex.test(tel)) {
      setShowMessage(true);
      setMessageContent(
        t("contact.phoneValidationMessage", "Telefone deve conter apenas números."),
      );
      return;
    }

    if (name === "" || email === "" || message === "") {
      setShowMessage(true);
      setMessageContent(
        t(
          "contact.requiredFieldsMessage",
          "Por favor, preencha os campos obrigatórios: Nome, E-mail e Mensagem.",
        ),
      );
      return;
    }

    // Montar mensagem do WhatsApp
    const whatsappMessage = `
*Nova mensagem do Portfólio*

*Nome:* ${name}
*Email:* ${email}
${tel ? `*Telefone:* ${tel}` : ""}

*Mensagem:*
${message}
    `.trim();

    // Seu número do WhatsApp (mesmo do botão)
    const phoneNumber = "5561981774548";

    // Criar URL do WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;

    // Abrir WhatsApp
    window.open(whatsappURL, "_blank");

    // Limpar formulário e mostrar mensagem de sucesso
    setName("");
    setEmail("");
    setTel("");
    setMessage("");
    setShowMessage(true);
    setMessageContent(
      t("contact.redirectMessage", "Perfeito! Redirecionando para o WhatsApp..."),
    );

    // Fechar modal automaticamente após 2 segundos
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  }

  const closeMessage = () => {
    setShowMessage(false);
    setMessageContent("");
  };
  return (
    <>
      <Menu />
      <AnimatedSection
        className="container-form"
        variant="fadeUp"
        id="contact-section"
      >
        <AnimatedSection
          className="container-article-form"
          variant="fadeDown"
          delay={0.2}
        >
          <h1 id="contato-titulo">
            {t("contact.title", "Vamos Construir Seu Próximo Projeto")}
          </h1>
          <p>{t("contact.subtitle", "Vamos conversar sobre seu próximo projeto")}</p>
        </AnimatedSection>
        <AnimatedSection
          as="form"
          onSubmit={sendToWhatsApp}
          variant="fadeUp"
          delay={0.3}
          aria-labelledby="contato-titulo"
        >
          {showMessage && (
            <MessageModal message={messageContent} onClose={closeMessage} />
          )}
          <div className="container-inputs">
            <div className="input-1">
              <label className="sr-only" htmlFor={ids.name}>
                {t("contact.name", "Nome")}
              </label>
              <input
                type="text"
                name="nome"
                id={ids.name}
                placeholder={t("contact.namePlaceholder", "Digite seu nome")}
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoComplete="name"
                aria-required="true"
                required
              />

              <label className="sr-only" htmlFor={ids.email}>
                {t("contact.email", "E-mail")}
              </label>
              <input
                type="email"
                name="email"
                id={ids.email}
                placeholder={t("contact.emailPlaceholder", "Digite seu e-mail")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                aria-required="true"
                required
              />
            </div>
            <div className="input-2">
              <label className="sr-only" htmlFor={ids.tel}>
                {t("contact.phone", "Telefone")} ({t("common.optional", "opcional")})
              </label>
              <input
                className="input-tel"
                type="tel"
                name="telefone"
                id={ids.tel}
                placeholder={t(
                  "contact.phonePlaceholder",
                  "Digite seu telefone (opcional)",
                )}
                value={tel}
                onChange={(e) => setTel(e.target.value.replace(/\D/g, ""))}
                inputMode="tel"
                autoComplete="tel"
                aria-describedby="contato-telefone-ajuda"
              />
              <span id="contato-telefone-ajuda" className="sr-only">
                {t("contact.phoneHint", "Informe apenas números com DDD.")}
              </span>
            </div>
          </div>
          <label className="sr-only" htmlFor={ids.message}>
            {t("contact.message", "Mensagem")}
          </label>
          <textarea
            name="mensagem"
            placeholder={t(
              "contact.messagePlaceholder",
              "Descreva seu projeto, objetivo ou desafio",
            )}
            id={ids.message}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-required="true"
            required
          ></textarea>
          <div id="contacts" className="container-form-button">
            <button className="form-button" type="submit">
              {t("contact.button", "Enviar via WhatsApp")}
            </button>
          </div>
        </AnimatedSection>
      </AnimatedSection>
    </>
  );
}
