import React from "react";

type Props = {
  src: string;
  alt: string;
};

export const ImagePreview = ({ src, alt }: Props) => (
  <div className="ir-preview">
    <img src={src} alt={alt} className="ir-preview-img" />
  </div>
);
