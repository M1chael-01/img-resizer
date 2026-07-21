import React from "react";
import Button from "./Button";

type Props = {
  onReset: () => void;
};

const EditorHeader = ({ onReset }: Props) => (
  <div className="ir-editor-head">
    <div>
      <h1 className="ir-title">Resize Image</h1>
      <p className="ir-subtitle">Adjust dimensions and download the result.</p>
    </div>
    <Button variant="reset" onClick={onReset}>
      Upload different image
    </Button>
  </div>
);

export default EditorHeader;
