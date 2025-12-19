import FloatingLanguageButton from "../FloatingLanguageButton/FloatingLanguageButton";

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
    </>
  );
};

export default Layout;
