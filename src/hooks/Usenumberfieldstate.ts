import { useEffect, useState } from "react";

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

export default useNumberFieldState;
