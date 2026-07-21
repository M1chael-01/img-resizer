import { useRef, useState, type ChangeEvent, type DragEvent } from "react";

const useFileDropzone = (onFileSelected: (file: File) => void) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onFileSelected(f);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onFileSelected(f);
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return {
    isDragging,
    inputRef,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileInput,
    openFileDialog,
  };
};

export default useFileDropzone;
