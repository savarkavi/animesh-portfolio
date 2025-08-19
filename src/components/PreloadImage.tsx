"use client";

import { useMediaLoading } from "@/context/MediaLoadingContext";
import Image, { ImageProps } from "next/image";
import React, { useEffect } from "react";

const useImageLoader = (src: string | undefined) => {
  const { registerMedia, mediaLoaded } = useMediaLoading();

  useEffect(() => {
    if (!src) return;

    registerMedia();

    const img = new window.Image();
    img.src = src;

    const handleLoad = () => {
      mediaLoaded();
    };

    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleLoad);

    return () => {
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleLoad);
    };
  }, [src, registerMedia, mediaLoaded]);
  console.log(src);
};

const PreloadImage = (props: ImageProps) => {
  const imageSrc = typeof props.src === "string" ? props.src : undefined;

  useImageLoader(imageSrc);

  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} />;
};

export default PreloadImage;
