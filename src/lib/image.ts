export type Dimensions = { width: number; height: number };

export function loadImageFromFile(
  file: File,
): Promise<{ url: string; dimensions: Dimensions }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();

    img.onload = () => {
      resolve({
        url,
        dimensions: { width: img.naturalWidth, height: img.naturalHeight },
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Obrázek se nepodařilo načíst."));
    };

    img.src = url;
  });
}

export function heightFromWidth(original: Dimensions, width: number): number {
  return Math.round(width * (original.height / original.width));
}

export function widthFromHeight(original: Dimensions, height: number): number {
  return Math.round(height * (original.width / original.height));
}

export function dimensionsForPreset(
  original: Dimensions,
  percent: number,
): Dimensions {
  return {
    width: Math.round((original.width * percent) / 100),
    height: Math.round((original.height * percent) / 100),
  };
}

export function findActivePreset(
  original: Dimensions,
  dimensions: Dimensions,
  presets: readonly number[],
): number | undefined {
  return presets.find(
    (p) => Math.round((original.width * p) / 100) === dimensions.width,
  );
}

export function exportResizedImage(
  sourceUrl: string,
  dimensions: Dimensions,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = dimensions.width;
      canvas.height = dimensions.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas kontext není dostupný."));
        return;
      }

      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Export obrázku selhal."));
          return;
        }
        resolve(blob);
      }, "image/png");
    };

    img.onerror = () =>
      reject(new Error("Obrázek se nepodařilo načíst pro export."));
    img.src = sourceUrl;
  });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}
