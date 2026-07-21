import React from "react";
import { RESIZE_PRESETS } from "../../constants";

type Props = {
  activePreset: number | undefined;
  onSelect: (percent: number) => void;
};

export const PresetButtons = ({ activePreset, onSelect }: Props) => (
  <div className="ir-presets">
    {RESIZE_PRESETS.map((p) => (
      <button
        key={p}
        type="button"
        onClick={() => onSelect(p)}
        className={`ir-preset-btn ${activePreset === p ? "is-active" : ""}`}
      >
        {p}%
      </button>
    ))}
  </div>
);
