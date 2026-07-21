import React from "react";
import Dropzone from "./DropZone";

type Props = {
  onFileSelected: (file: File) => void;
};

const EmptyState = ({ onFileSelected }: Props) => {
  return (
    <div className="ir-wrap">
      <h1 className="ir-title">Resize Image</h1>
      <p className="ir-subtitle">
        Upload an image and adjust its dimensions exactly as needed.
      </p>
      <Dropzone onFileSelected={onFileSelected} />
    </div>
  );
};

export default EmptyState;