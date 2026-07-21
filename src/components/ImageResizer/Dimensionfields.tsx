import React from "react";
import { Lock, Unlock } from "lucide-react";
import { type Dimensions } from "../../lib/image";
import useNumberFieldState from "../../hooks/Usenumberfieldstate";
import Button from "../Button";

type Props = {
  dimensions: Dimensions;
  lockAspect: boolean;
  onWidthChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  onToggleLock: () => void;
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

      <Button
        variant="lock"
        onClick={onToggleLock}
        ariaLabel={
          lockAspect ? "Odemknout poměr stran" : "Zamknout poměr stran"
        }
        icon={
          lockAspect ? (
            <Lock size={16} strokeWidth={1.8} />
          ) : (
            <Unlock size={16} strokeWidth={1.8} />
          )
        }
        className={lockAspect ? "is-locked" : ""}
        children={undefined}
      />

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
