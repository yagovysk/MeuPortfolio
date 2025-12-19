import { Menu } from "../../Components/Menu/Menu";
import React, { useMemo, useState } from "react";
import "./Form.css";
import { AnimatedSection } from "../../Components/AnimatedSection/AnimatedSection";

export function Form() {
  const MessageModal = ({ message, onClose }) => (
    <div
      className="message-modal"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <p className="paragraph-message">{message}</p>
      <button type="button" onClick={onClose} className="form-close-alert">
        Fechar mensagem
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
    []
  );

  function sendToWhatsApp(e) {
    e.preventDefault();

    // Validações
    const telRegex = /^[0-9]*$/;
    if (tel && !telRegex.test(tel)) {
      setShowMessage(true);
      setMessageContent("Telefone deve conter apenas números");
      return;
    }

    if (name === "" || email === "" || message === "") {
      setShowMessage(true);
      setMessageContent(
        "Por favor, preencha todos os campos obrigatórios (Nome, Email e Mensagem)."
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
      whatsappMessage
    )}`;

    // Abrir WhatsApp
    window.open(whatsappURL, "_blank");

    // Limpar formulário e mostrar mensagem de sucesso
    setName("");
    setEmail("");
    setTel("");
    setMessage("");
    setShowMessage(true);
    setMessageContent("Redirecionando para o WhatsApp...");

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
      <AnimatedSection className="container-form" variant="fadeUp">
        <AnimatedSection
          className="container-article-form"
          variant="fadeDown"
          delay={0.2}
        >
          <h1 id="contato-titulo">
            Vamos Conversar <br /> Sobre seu Projeto
          </h1>
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
                Nome completo
              </label>
              <input
                type="text"
                name="nome"
                id={ids.name}
                placeholder="Digite seu Nome"
                onChange={(e) =>
                  setName(e.target.value.replace(/[^a-zA-Z\s]/gi, ""))
                }
                value={name}
                aria-required="true"
                required
              />

              <label className="sr-only" htmlFor={ids.email}>
                Endereço de e-mail
              </label>
              <input
                type="email"
                name="email"
                id={ids.email}
                placeholder="Digite seu Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-required="true"
                required
              />
            </div>
            <div className="input-2">
              <label className="sr-only" htmlFor={ids.tel}>
                Telefone com DDD (opcional)
              </label>
              <input
                className="input-tel"
                type="tel"
                name="telefone"
                id={ids.tel}
                placeholder="Digite seu Telefone"
                value={tel}
                onChange={(e) => setTel(e.target.value.replace(/\D/g, ""))}
                inputMode="tel"
                aria-describedby="contato-telefone-ajuda"
              />
              <span id="contato-telefone-ajuda" className="sr-only">
                Informe apenas números.
              </span>
            </div>
          </div>
          <label className="sr-only" htmlFor={ids.message}>
            Escreva sua mensagem
          </label>
          <textarea
            name="mensagem"
            placeholder="Digite sua Mensagem"
            id={ids.message}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-required="true"
            required
          ></textarea>
          <div id="contacts" className="container-form-button">
            <button className="form-button" type="submit">
              Enviar via WhatsApp
            </button>
          </div>
        </AnimatedSection>
      </AnimatedSection>
    </>
  );
}
