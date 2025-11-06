import React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Init } from "./Pages/Init/Init";
import { About } from "./Pages/About/About";
import { Portfolio } from "./Pages/Portfolio/Portfolio";
import { Form } from "./Pages/Contato/Form";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./Components/LayoutTemp/Layout";
import "./index.css";

// PWA Registration
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("Nova versão disponível. Atualizar agora?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App pronto para funcionar offline!");
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LanguageProvider>
        <Layout>
          <Init />
        </Layout>
      </LanguageProvider>
    ),
  },

  {
    path: "/About",
    element: (
      <LanguageProvider>
        <Layout>
          <About />
        </Layout>
      </LanguageProvider>
    ),
  },

  {
    path: "/Portfolio",
    element: (
      <LanguageProvider>
        <Layout>
          <Portfolio />
        </Layout>
      </LanguageProvider>
    ),
  },

  {
    path: "/contato",
    element: (
      <LanguageProvider>
        <Layout>
          <Form />
        </Layout>
      </LanguageProvider>
    ),
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
