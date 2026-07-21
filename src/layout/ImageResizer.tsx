import React from "react";
import "../styles/ImageResizer.css";

import useImageFile from "../hooks/useImageFile";
import useDimensions from "../hooks/useDimensions";
import useImageExport from "../hooks/useImageExport";

import Dropzone from "../components/ImageResizer/DropZone";
import { EditorHeader } from "../components/EditorHeader";
import { ImagePreview } from "../components/ImageResizer/Imagepreview";
import { FileInfo } from "../components/ImageResizer/FileInfo";
import DimensionFields from "../components/ImageResizer/Dimensionfields";
import { PresetButtons } from "../components/ImageResizer/PresetButtons";

export const ImageResizer = () => {
  const { file, previewUrl, original, loadFile, reset } = useImageFile();

  const {
    dimensions,
    lockAspect,
    toggleLockAspect,
    handleWidthChange,
    handleHeightChange,
    applyPreset,
    activePreset,
  } = useDimensions(original);

  const { isExporting, download } = useImageExport();

  if (!file || !previewUrl || !original) {
    return (
      <div className="ir-wrap">
        <h1 className="ir-title">Změnit velikost obrázku</h1>
        <p className="ir-subtitle">
          Nahraj obrázek a uprav jeho rozměry přesně podle potřeby.
        </p>
        <Dropzone onFileSelected={loadFile} />
      </div>
    );
  }

  return (
    <div className="ir-wrap">
      <EditorHeader onReset={reset} />

      <div className="ir-editor">
        <ImagePreview src={previewUrl} alt={file.name} />

        <div className="ir-controls">
          <FileInfo fileName={file.name} original={original} />

          <DimensionFields
            dimensions={dimensions}
            lockAspect={lockAspect}
            onWidthChange={handleWidthChange}
            onHeightChange={handleHeightChange}
            onToggleLock={toggleLockAspect}
          />

          <PresetButtons activePreset={activePreset} onSelect={applyPreset} />

          <button
            type="button"
            className="ir-download-btn"
            onClick={() => download(previewUrl, dimensions)}
            disabled={isExporting}
          >
            {isExporting ? "Zpracovávám…" : "Stáhnout upravený obrázek"}
          </button>
        </div>
      </div>
    </div>
  );
};
