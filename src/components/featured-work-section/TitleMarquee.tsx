"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const TitleMarquee = () => {
  const featuredTitleLeftContainerRef = useRef<HTMLDivElement>(null);
  const featuredTitleRightContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(featuredTitleLeftContainerRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 10,
      repeat: -1,
    });
    gsap.to(featuredTitleRightContainerRef.current, {
      xPercent: 0,
      ease: "none",
      duration: 10,
      repeat: -1,
    });
  });

  return (
    <div className="mt-20 w-full 2xl:mt-40">
      <div
        ref={featuredTitleLeftContainerRef}
        className="flex w-max text-[2.4rem] font-extrabold tracking-wider text-nowrap text-blue-500 uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.8rem] 2xl:text-[11.7rem]"
      >
        <div className="w-screen">
          <p className="sm:leading-20 lg:leading-28 xl:leading-32 2xl:leading-48">
            Featured Work
          </p>
        </div>
        <div className="w-screen">
          <p className="sm:leading-20 lg:leading-28 xl:leading-32 2xl:leading-48">
            Featured Work
          </p>
        </div>
      </div>
      <div
        ref={featuredTitleRightContainerRef}
        className="outline-text flex w-max -translate-x-[50%] text-[2.4rem] font-bold tracking-wider text-nowrap text-transparent uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.8rem] 2xl:text-[11.7rem]"
      >
        <div className="w-screen">
          <p className="sm:leading-20 lg:leading-28 xl:leading-32 2xl:leading-48">
            Featured work
          </p>
        </div>
        <div className="w-screen">
          <p className="sm:leading-20 lg:leading-28 xl:leading-32 2xl:leading-48">
            Featured work
          </p>
        </div>
      </div>
    </div>
  );
};

export default TitleMarquee;
