import { useCallback, useEffect, useState } from "react";
import {
  type Dimensions,
  dimensionsForPreset,
  findActivePreset,
  heightFromWidth,
  widthFromHeight,
} from "../lib/image";
import { RESIZE_PRESETS } from "../constants";

const useDimensions = (original: Dimensions | null) => {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });
  const [lockAspect, setLockAspect] = useState(true);

  useEffect(() => {
    if (original) setDimensions(original);
  }, [original]);

  const handleWidthChange = useCallback(
    (value: number) => {
      if (!original || Number.isNaN(value)) return;
      setDimensions((prev) => ({
        width: value,
        height: lockAspect ? heightFromWidth(original, value) : prev.height,
      }));
    },
    [original, lockAspect],
  );

  const handleHeightChange = useCallback(
    (value: number) => {
      if (!original || Number.isNaN(value)) return;
      setDimensions((prev) => ({
        height: value,
        width: lockAspect ? widthFromHeight(original, value) : prev.width,
      }));
    },
    [original, lockAspect],
  );

  const applyPreset = useCallback(
    (percent: number) => {
      if (!original) return;
      setDimensions(dimensionsForPreset(original, percent));
    },
    [original],
  );

  const toggleLockAspect = useCallback(() => setLockAspect((v) => !v), []);

  const activePreset = original
    ? findActivePreset(original, dimensions, RESIZE_PRESETS)
    : undefined;

  return {
    dimensions,
    lockAspect,
    toggleLockAspect,
    handleWidthChange,
    handleHeightChange,
    applyPreset,
    activePreset,
  };
};

export default useDimensions;
