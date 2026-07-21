import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import Header from "./layout/Header";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <div>
      <Header />
    </div>
  </StrictMode>,
);
