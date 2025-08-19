"use client";

import { adeDisplay } from "@/app/fonts/fonts";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP);

const ExperienceRibbon = () => {
  const ribbonContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(ribbonContainerRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 10,
      repeat: -1,
    });
  });

  return (
    <div className="z-10 -ml-1 w-[105%] -rotate-4 border-y border-black bg-white p-1 xl:-rotate-2">
      <div
        ref={ribbonContainerRef}
        className="flex w-max rounded-xl bg-[#6D28D9] py-4 text-nowrap"
      >
        <div className="flex w-screen items-center justify-between pr-[200px] uppercase">
          {Array.from({ length: 5 }, (_, i) => (
            <p
              key={i}
              className={`${adeDisplay.className} text-lg font-black tracking-wider lg:text-2xl`}
            >
              Experience
            </p>
          ))}
        </div>
        <div className="flex w-screen items-center justify-between pr-[200px] uppercase">
          {Array.from({ length: 5 }, (_, i) => (
            <p
              key={i}
              className={`${adeDisplay.className} font-black tracking-wider lg:text-2xl`}
            >
              Experience
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceRibbon;
