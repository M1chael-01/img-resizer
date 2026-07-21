import React from "react";
import "../styles/ImageResizer.css";

import useImageFile from "../hooks/useImageFile";
import useDimensions from "../hooks/useDimensions";
import useImageExport from "../hooks/useImageExport";

import EmptyState from "../components/ImageResizer/EmptyState";
import EditorHeader from "../components/EditorHeader";
import { ImagePreview } from "../components/ImageResizer/Imagepreview";
import { FileInfo } from "../components/ImageResizer/FileInfo";
import DimensionFields from "../components/ImageResizer/Dimensionfields";
import PresetButtons from "../components/ImageResizer/PresetButtons";
import Button from "../components/Button";

const ImageResizer = () => {
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
    return <EmptyState onFileSelected={loadFile} />;
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

          <Button
            variant="download"
            onClick={() => download(previewUrl, dimensions)}
            disabled={isExporting}
            fullWidth
          >
            {isExporting ? "Zpracovávám…" : "Stáhnout upravený obrázek"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageResizer;
