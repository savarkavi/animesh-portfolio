"use client";

import { adeDisplay } from "@/app/fonts/fonts";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const RibbonText = () => {
  const repetitions = 15;

  return (
    <div className="flex w-max items-center gap-24 uppercase">
      {Array.from({ length: repetitions }, (_, i) => (
        <p
          key={i}
          className={`${adeDisplay.className} text-lg font-black tracking-wider text-white lg:text-2xl`}
        >
          Experience
        </p>
      ))}
    </div>
  );
};

const ExperienceRibbon = () => {
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
        <RibbonText />
        <RibbonText />
      </div>
    </div>
  );
};

export default ExperienceRibbon;

// #6D28D9
