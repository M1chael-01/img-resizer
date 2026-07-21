import React from "react";
import { Upload } from "lucide-react";
import { ACCEPTED_FORMATS_LABEL } from "../../constants";
import useFileDropzone from "../../hooks/useFileDropzone";
import FileInput from "./FileInput";
import Button from "../Button";

type Props = {
  onFileSelected: (file: File) => void;
};

const Dropzone = ({ onFileSelected }: Props) => {
  const {
    isDragging,
    inputRef,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileInput,
    openFileDialog,
  } = useFileDropzone(onFileSelected);

  return (
    <div
      className={`ir-dropzone ${isDragging ? "is-dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={openFileDialog}
      role="button"
      tabIndex={0}
    >
      <FileInput
        inputRef={inputRef}
        onFileInput={handleFileInput}
        accept="image/*"
      />

      <div className="ir-icon">
        <Upload size={26} strokeWidth={1.8} />
      </div>

      <p className="ir-hint">
        Drag and drop an image here or{" "}
        <span className="ir-browse">choose a file</span>
      </p>

      <Button
        variant="primary"
        onClick={(e) => {
          e.stopPropagation();
          openFileDialog();
        }}
      >
        Select image
      </Button>

      <p className="ir-formats">{ACCEPTED_FORMATS_LABEL}</p>
    </div>
  );
};

export default Dropzone;
