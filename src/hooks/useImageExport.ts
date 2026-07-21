import { useCallback, useState } from "react";
import {
  type Dimensions,
  downloadBlob,
  exportResizedImage,
} from "../lib/image";

const useImageExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const download = useCallback(
    async (previewUrl: string | null, dimensions: Dimensions) => {
      if (!previewUrl || !dimensions.width || !dimensions.height) return;

      setIsExporting(true);
      try {
        const blob = await exportResizedImage(previewUrl, dimensions);
        downloadBlob(
          blob,
          `resized-${dimensions.width}x${dimensions.height}.png`,
        );
      } catch {
      } finally {
        setIsExporting(false);
      }
    },
    [],
  );

  return { isExporting, download };
};

export default useImageExport;