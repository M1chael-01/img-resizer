import React, { type ChangeEvent, type RefObject } from "react";

type Props = {
  inputRef: RefObject<HTMLInputElement | null>;
  onFileInput: (e: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
};

const FileInput = ({ inputRef, onFileInput, accept = "image/*" }: Props) => {
  return (
    <input
      ref={inputRef}
      type="file"
      accept={accept}
      hidden
      onChange={onFileInput}
    />
  );
};

export default FileInput;
