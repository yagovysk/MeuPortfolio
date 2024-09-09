import { Menu } from "../../Components/Menu/Menu";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Form.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function Form() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

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

  function sendEmail(e) {
    e.preventDefault();
    const telRegex = /^[0-9]*$/;
    if (!telRegex.test(tel)) {
      alert("Telefone deve conter apenas números");
      return;
    }
    if (name === "" || email === "" || tel === "" || message === "") {
      setShowMessage(true);
      setMessageContent("Por favor, preencha todos os campos.");
      return;
    }

    const templateParams = {
      from_name: name,
      email: email,
      tel: tel,
      message: message,
    };

    emailjs
      .send(
        "service_k6lnqtk",
        "template_2g8t0zw",
        templateParams,
        "Ah8GFwcxJ5iWDpoot"
      )
      .then(
        (response) => {
          console.log("EMAIL ENVIADO", response.status, response.text);
          setName("");
          setEmail("");
          setTel("");
          setMessage("");
          setShowMessage(true);
          setMessageContent("Mensagem enviada com sucesso!");
        },
        (err) => {
          console.log("ERRO", err);
          setShowMessage(true);
          setMessageContent(
            "Erro ao enviar mensagem. Por favor, tente novamente."
          );
        }
      );
  }
  const closeMessage = () => {
    setShowMessage(false);
    setMessageContent("");
  };
  return (
    <>
      <Menu />
      <div className="container-form" data-aos="fade-up">
        <article className="container-article-form" data-aos="fade-up">
          <h1>
            Vamos Conversar <br /> Sobre seu Projeto
          </h1>
        </article>
        <form onSubmit={sendEmail} data-aos="fade-up">
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
              Enviar Mensagem
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
