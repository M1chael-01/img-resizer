import { useCallback, useState } from "react";
import { type Dimensions, loadImageFromFile } from "../lib/image";

const useImageFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [original, setOriginal] = useState<Dimensions | null>(null);

  const loadFile = useCallback(async (f: File) => {
    if (!f.type.startsWith("image/")) return;

    try {
      const { url, dimensions } = await loadImageFromFile(f);
      setFile(f);
      setPreviewUrl(url);
      setOriginal(dimensions);
    } catch {}
  }, []);

  const reset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setOriginal(null);
  }, [previewUrl]);

  return { file, previewUrl, original, loadFile, reset };
};

export default useImageFile;
