import { Menu } from "../../Components/Menu/Menu";
import React, { useState } from "react";
import "./Form.css";
import { AnimatedSection } from "../../Components/AnimatedSection/AnimatedSection";

export function Form() {
  const MessageModal = ({ message, onClose }) => (
    <div className="message-modal">
      <p className="paragraph-message">{message}</p>
      <button onClick={onClose}>Fechar</button>
    </div>
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");

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
          <h1>
            Vamos Conversar <br /> Sobre seu Projeto
          </h1>
        </AnimatedSection>
        <AnimatedSection
          as="form"
          onSubmit={sendToWhatsApp}
          variant="fadeUp"
          delay={0.3}
        >
          {showMessage && (
            <MessageModal message={messageContent} onClose={closeMessage} />
          )}
          <div className="container-inputs">
            <div className="input-1">
              <input
                type="text"
                name="nome"
                placeholder="Digite seu Nome"
                onChange={(e) =>
                  setName(e.target.value.replace(/[^a-zA-Z\s]/gi, ""))
                }
                value={name}
              />

              <input
                type="email"
                name="email"
                placeholder="Digite seu Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-2">
              <input
                className="input-tel"
                type="tel"
                name="telefone"
                placeholder="Digite seu Telefone"
                value={tel}
                onChange={(e) => setTel(e.target.value.replace(/\D/g, ""))}
              />
            </div>
          </div>
          <textarea
            name="mensagem"
            placeholder="Digite sua Mensagem"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
