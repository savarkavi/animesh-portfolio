"use client";

import { zenOldMincho } from "@/app/fonts/fonts";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const MarqueeContent = ({ isOutlined = false }) => {
  const repetitions = 5;
  const textClasses = isOutlined
    ? "outline-text text-transparent opacity-50"
    : "text-orange-500";

  return (
    <div className="flex w-max items-center gap-x-12 uppercase lg:gap-x-16">
      {Array.from({ length: repetitions }, (_, i) => (
        <p
          key={i}
          className={`${textClasses} sm:leading-20 lg:leading-28 xl:leading-32 2xl:leading-48`}
        >
          Featured Work
        </p>
      ))}
    </div>
  );
};

const TitleMarquee = () => {
  const marqueeContainerRef = useRef<HTMLDivElement>(null);
  const leftMarqueeRef = useRef<HTMLDivElement>(null);
  const rightMarqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const leftMarquee = leftMarqueeRef.current;
      const rightMarquee = rightMarqueeRef.current;
      if (!leftMarquee || !rightMarquee) return;

      const setupAnimations = () => {
        gsap.killTweensOf([leftMarquee, rightMarquee]);

        const pixelsPerSecond = 80;

        const travelDistance = leftMarquee.offsetWidth / 2;

        const newDuration = travelDistance / pixelsPerSecond;

        gsap.to(leftMarquee, {
          xPercent: -50,
          ease: "none",
          duration: newDuration,
          repeat: -1,
        });

        gsap.to(rightMarquee, {
          xPercent: 0,
          ease: "none",
          duration: newDuration,
          repeat: -1,
        });
      };

      setupAnimations();

      window.addEventListener("resize", setupAnimations);

      return () => {
        window.removeEventListener("resize", setupAnimations);
      };
    },
    { scope: marqueeContainerRef },
  );

  return (
    <div
      ref={marqueeContainerRef}
      className={`${zenOldMincho.className} mt-20 w-full overflow-hidden 2xl:mt-40`}
    >
      <div
        ref={leftMarqueeRef}
        className="flex w-max gap-x-12 text-[2.4rem] font-extrabold tracking-wider text-nowrap text-black sm:text-6xl md:text-7xl lg:gap-x-16 lg:text-8xl xl:text-[7.8rem] 2xl:text-[11.7rem]"
      >
        <MarqueeContent />
        <MarqueeContent />
      </div>

      <div
        ref={rightMarqueeRef}
        className="flex w-max -translate-x-[50%] gap-x-12 text-[2.4rem] font-bold tracking-wider text-nowrap sm:text-6xl md:text-7xl lg:gap-x-16 lg:text-8xl xl:text-[7.8rem] 2xl:text-[11.7rem]"
      >
        <MarqueeContent isOutlined />
        <MarqueeContent isOutlined />
      </div>
    </div>
  );
};

export default TitleMarquee;
