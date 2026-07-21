import React from "react";
import Dropzone from "./DropZone";

type Props = {
  onFileSelected: (file: File) => void;
};

const EmptyState = ({ onFileSelected }: Props) => {
  return (
    <div className="ir-wrap">
      <h1 className="ir-title">Změnit velikost obrázku</h1>
      <p className="ir-subtitle">
        Nahraj obrázek a uprav jeho rozměry přesně podle potřeby.
      </p>
      <Dropzone onFileSelected={onFileSelected} />
    </div>
  );
};

export default EmptyState;
