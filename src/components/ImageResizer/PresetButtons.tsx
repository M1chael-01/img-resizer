import React from "react";
import { RESIZE_PRESETS } from "../../constants";
import Button from "../Button";

type Props = {
  activePreset: number | undefined;
  onSelect: (percent: number) => void;
};

const PresetButtons = ({ activePreset, onSelect }: Props) => (
  <div className="ir-presets">
    {RESIZE_PRESETS.map((p) => (
      <Button
        key={p}
        variant="secondary"
        onClick={() => onSelect(p)}
        className={activePreset === p ? "is-active" : ""}
      >
        {p}%
      </Button>
    ))}
  </div>
);

export default PresetButtons;
