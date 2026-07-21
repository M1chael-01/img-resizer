import React from "react";
import { type Dimensions } from "../../lib/image";

type Props = {
  fileName: string;
  original: Dimensions;
};

export const FileInfo = ({ fileName, original }: Props) => (
  <div className="ir-file-info">
    <span className="ir-file-name">{fileName}</span>
    <span className="ir-file-meta">
      Původní rozměr: {original.width} × {original.height}&nbsp;px
    </span>
  </div>
);
