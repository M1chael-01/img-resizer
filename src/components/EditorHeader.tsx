import React from "react";

type Props = {
  onReset: () => void;
};

export const EditorHeader = ({ onReset }: Props) => (
  <div className="ir-editor-head">
    <div>
      <h1 className="ir-title">Změnit velikost obrázku</h1>
      <p className="ir-subtitle">Uprav rozměry a stáhni výsledek.</p>
    </div>
    <button type="button" className="ir-reset-btn" onClick={onReset}>
      Nahrát jiný obrázek
    </button>
  </div>
);
