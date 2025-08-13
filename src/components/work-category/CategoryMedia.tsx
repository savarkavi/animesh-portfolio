"use client";

import { posterDesignsImages } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
import PreloadImage from "../PreloadImage";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CategoryMedia = () => {
  const categoryMediaContainer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // const media: HTMLDivElement[] = gsap.utils.toArray(".category-media");
      // media.forEach((item, i) => {
      //   gsap.to(item, {
      //     y: -500,
      //     scrollTrigger: {
      //       trigger: item,
      //       start: "top bottom",
      //       scrub: 1,
      //     },
      //   });
      // });
    },
    { scope: categoryMediaContainer },
  );

  return (
    <div
      ref={categoryMediaContainer}
      className="min-h-screen bg-white px-4 py-16 xl:px-24"
    >
      <div className="mt-52 flex h-full w-full flex-wrap justify-between gap-24">
        {posterDesignsImages.map((img, i) => (
          <div
            key={i}
            className={`category-media category-media-${i} flex w-full flex-col items-center xl:w-auto xl:items-start`}
          >
            <p className="my-4 text-sm text-black uppercase">{`(${i + 1}) ${img.label}`}</p>
            <div className="relative h-[500px] w-full max-w-[500px] sm:h-[600px] xl:w-[500px]">
              <PreloadImage
                src={img.src}
                alt="image"
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryMedia;
