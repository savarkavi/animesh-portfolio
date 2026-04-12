"use client";

import Image, { ImageProps } from "next/image";
import React from "react";

const PreloadImage = (props: ImageProps) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} />;
};

export default PreloadImage;
