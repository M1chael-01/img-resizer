import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import Header from "./layout/Header";
import ImageResizer from "./layout/ImageResizer";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <div>
      <Header />
      <ImageResizer />
    </div>
  </StrictMode>,
);
