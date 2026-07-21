import React, { useEffect, useState } from "react";
import { Lock, Unlock } from "lucide-react";
import { type Dimensions } from "../../lib/image";

type Props = {
  dimensions: Dimensions;
  lockAspect: boolean;
  onWidthChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  onToggleLock: () => void;
};

const useNumberFieldState = (
  value: number,
  onChange: (value: number) => void,
) => {
  const [text, setText] = useState(String(value));

  useEffect(() => {
    setText(String(value));
  }, [value]);

  const handleChange = (raw: string) => {
    if (raw !== "" && !/^\d+$/.test(raw)) return;

    setText(raw);

    if (raw === "") return;

    const parsed = Number(raw);
    if (!Number.isNaN(parsed) && parsed > 0) {
      onChange(parsed);
    }
  };

  const handleBlur = () => {
    if (text === "" || Number(text) <= 0) {
      setText(String(value));
    }
  };

  return { text, handleChange, handleBlur };
};

const DimensionFields = ({
  dimensions,
  lockAspect,
  onWidthChange,
  onHeightChange,
  onToggleLock,
}: Props) => {
  const width = useNumberFieldState(dimensions.width, onWidthChange);
  const height = useNumberFieldState(dimensions.height, onHeightChange);

  return (
    <div className="ir-field-row">
      <label className="ir-field">
        <span className="ir-field-label">Šířka</span>
        <div className="ir-field-input">
          <input
            type="text"
            inputMode="numeric"
            value={width.text}
            onChange={(e) => width.handleChange(e.target.value)}
            onBlur={width.handleBlur}
          />
          <span className="ir-unit">px</span>
        </div>
      </label>

      <button
        type="button"
        aria-label={
          lockAspect ? "Odemknout poměr stran" : "Zamknout poměr stran"
        }
        onClick={onToggleLock}
        className={`ir-lock-btn ${lockAspect ? "is-locked" : ""}`}
      >
        {lockAspect ? (
          <Lock size={16} strokeWidth={1.8} />
        ) : (
          <Unlock size={16} strokeWidth={1.8} />
        )}
      </button>

      <label className="ir-field">
        <span className="ir-field-label">Výška</span>
        <div className="ir-field-input">
          <input
            type="text"
            inputMode="numeric"
            value={height.text}
            onChange={(e) => height.handleChange(e.target.value)}
            onBlur={height.handleBlur}
          />
          <span className="ir-unit">px</span>
        </div>
      </label>
    </div>
  );
};

export default DimensionFields;
