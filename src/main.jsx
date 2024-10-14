import React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Init } from "./Pages/Init/Init";
import { About } from "./Pages/About/About";
import { Portfolio } from "./Pages/Portfolio/Portfolio";
import { Form } from "./Pages/Contato/Form";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Init />,
  },

  {
    path: "/About",
    element: <About />,
  },

  {
    path: "/Portfolio",
    element: <Portfolio />,
  },

  {
    path: "/contato",
    element: <Form />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
