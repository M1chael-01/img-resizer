import React, { useRef, useState, type DragEvent } from "react";
import { Upload } from "lucide-react";
import { ACCEPTED_FORMATS_LABEL } from "../../constants";

type Props = {
  onFileSelected: (file: File) => void;
};

const Dropzone = ({ onFileSelected }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onFileSelected(f);
  };

  return (
    <div
      className={`ir-dropzone ${isDragging ? "is-dragging" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFileSelected(f);
        }}
      />

      <div className="ir-icon">
        <Upload size={26} strokeWidth={1.8} />
      </div>

      <p className="ir-hint">
        Přetáhni obrázek sem nebo{" "}
        <span className="ir-browse">vyber soubor</span>
      </p>

      <button
        type="button"
        className="ir-select-btn"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.click();
        }}
      >
        Vybrat obrázek
      </button>

      <p className="ir-formats">{ACCEPTED_FORMATS_LABEL}</p>
    </div>
  );
};

export default Dropzone;
