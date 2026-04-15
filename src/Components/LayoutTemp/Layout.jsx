import FloatingLanguageButton from "../FloatingLanguageButton/FloatingLanguageButton";
import VirtualAssistant from "../VirtualAssistant/VirtualAssistant";

const Layout = ({ children }) => {
  return (
    <>
      <a href="#conteudo-principal" className="skip-link">
        Ir para o conteúdo principal
      </a>
      <div
        id="conteudo-principal"
        className="layout-main"
        role="main"
        tabIndex={-1}
      >
        {children}
      </div>
      <FloatingLanguageButton />
      <VirtualAssistant />
    </>
  );
};

export default Layout;
