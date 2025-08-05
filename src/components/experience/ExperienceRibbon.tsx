"use client";

import { electroharmonix } from "@/app/page";
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
    <div className="z-10 w-screen -rotate-4 overflow-x-hidden border-y border-black bg-white p-1">
      <div
        ref={ribbonContainerRef}
        className="flex w-max rounded-xl bg-red-500 py-4 text-nowrap"
      >
        <div className="flex w-full items-center justify-between gap-50 pr-[150px] pl-6">
          {Array.from({ length: 5 }, (_, i) => (
            <p
              key={i}
              className={`${electroharmonix.className} text-lg font-black tracking-wider lg:text-3xl`}
            >
              Experience
            </p>
          ))}
        </div>
        <div className="flex w-full items-center justify-between gap-50 pr-[150px] pl-6">
          {Array.from({ length: 5 }, (_, i) => (
            <p
              key={i}
              className={`${electroharmonix.className} font-black tracking-wider lg:text-3xl`}
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
