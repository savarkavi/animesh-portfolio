"use client";

import { instrumentSerif } from "@/app/fonts/fonts";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const RibbonText = ({ text }: { text: string }) => {
  const repetitions = 15;

  return (
    <div className="flex w-max items-center gap-24 uppercase">
      {Array.from({ length: repetitions }, (_, i) => (
        <p
          key={i}
          className={`${instrumentSerif.className} text-xl font-black tracking-wider text-white lg:text-3xl`}
        >
          {text}
        </p>
      ))}
    </div>
  );
};

const RibbonMarquee = ({ text }: { text: string }) => {
  const ribbonContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ribbon = ribbonContainerRef.current;
      if (!ribbon) return;

      const setupMarqueeAnimation = () => {
        gsap.killTweensOf(ribbon);

        const pixelsPerSecond = 100;

        const travelDistance = ribbon.offsetWidth / 2;

        const newDuration = travelDistance / pixelsPerSecond;

        gsap.to(ribbon, {
          xPercent: -50,
          ease: "none",
          duration: newDuration,
          repeat: -1,
        });
      };

      setupMarqueeAnimation();

      window.addEventListener("resize", setupMarqueeAnimation);

      return () => {
        window.removeEventListener("resize", setupMarqueeAnimation);
      };
    },
    { scope: ribbonContainerRef },
  );

  return (
    <div className="z-10 -ml-1 w-[105%] overflow-hidden border-y border-black bg-white p-1 md:-rotate-2">
      <div
        ref={ribbonContainerRef}
        className="flex w-max gap-20 bg-[#f54a00] py-4 text-nowrap"
      >
        <RibbonText text={text} />
        <RibbonText text={text} />
      </div>
    </div>
  );
};

export default RibbonMarquee;

// #6D28D9
