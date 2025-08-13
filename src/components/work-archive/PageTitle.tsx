"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PageTitle = () => {
  const workArchiveTitleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(".archive-text", {
      keyframes: {
        color: [
          "oklch(63.7% 0.237 25.331)",
          "oklch(70% 0.2 200)",
          "oklch(80% 0.25 120)",
          "oklch(60% 0.3 300)",
          "oklch(75% 0.2 40)",
          "oklch(85% 0.15 360)",
          "oklch(65% 0.25 150)",
        ],
        ease: "none",
      },
      duration: 3,
      ease: "none",
      repeatDelay: 0.2,
      repeat: -1,
      yoyo: true,
    });

    const marqueeTitles = gsap.utils.toArray(".work-title-marquee");

    marqueeTitles.forEach((_, i) => {
      gsap.to(`.work-title-marquee-${i}`, {
        xPercent: i % 2 === 0 ? -50 : 0,
        ease: "none",
        scrollTrigger: {
          trigger: workArchiveTitleRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
        },
      });
    });
  });

  return (
    <div
      ref={workArchiveTitleRef}
      className="relative flex h-screen w-full items-end overflow-hidden bg-[#fff6db]"
    >
      <div
        className={`absolute mt-32 flex h-[calc(100vh-80px)] w-full flex-col justify-start gap-8 overflow-hidden text-center font-bold text-blue-400 uppercase xl:mt-0 xl:justify-end xl:gap-10`}
      >
        {Array.from({ length: 7 }, (_, i) => (
          <div
            key={i}
            className={`work-title-marquee work-title-marquee-${i} ${i % 2 !== 0 && "-translate-x-[50%]"} mb-6 flex w-max text-5xl tracking-widest text-nowrap opacity-30 lg:text-[4rem] xl:text-[5rem] 2xl:text-[7.5rem]`}
          >
            <div className={"w-full md:w-screen"}>
              <p className="outline-text scale-y-150 text-transparent">
                Welcome to Animesh&apos;s
              </p>
            </div>
            <div className={"w-full md:w-screen"}>
              <p className="outline-text scale-y-150 text-transparent">
                Welcome to Animesh&apos;s
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="archive-text absolute top-1/2 right-1/2 mb-20 translate-x-1/2 -translate-y-1/2 scale-y-250 text-6xl uppercase lg:text-7xl 2xl:top-auto 2xl:right-8 2xl:bottom-8 2xl:translate-0 2xl:text-[11rem]">
        archive
      </p>
    </div>
  );
};

export default PageTitle;
