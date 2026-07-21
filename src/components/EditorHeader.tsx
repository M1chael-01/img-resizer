import React from "react";
import Button from "./Button";

type Props = {
  onReset: () => void;
};

const EditorHeader = ({ onReset }: Props) => (
  <div className="ir-editor-head">
    <div>
      <h1 className="ir-title">Změnit velikost obrázku</h1>
      <p className="ir-subtitle">Uprav rozměry a stáhni výsledek.</p>
    </div>
    <Button variant="reset" onClick={onReset}>
      Nahrát jiný obrázek
    </Button>
  </div>
);

export default EditorHeader;
