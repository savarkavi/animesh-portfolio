"use client";

import { workExperienceData } from "@/utils/constants";
import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { AnimateSvg } from "../AnimateSvg";
import { GiPolarStar } from "react-icons/gi";
import { useMediaQuery } from "usehooks-ts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const WorkExperienceContainer = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [isSvgVisible, setIsSvgVisible] = useState<{ [key: number]: boolean }>(
    {},
  );

  useGSAP(() => {
    if (!isMobile) {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".work-experience-container",
          start: "3.5% top",
          end: "bottom bottom",
          pin: ".brands-container",
          scrub: 1,
        },
      });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".work-experience-container",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        })
        .to(".scroll-progress .star", { visibility: "visible", duration: 0.1 })
        .to(".scroll-progress", { height: "100%", ease: "none" }, "<");
    }

    const experienceTitles = gsap.utils.toArray(".experience-title");

    experienceTitles.forEach((_, i) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: `.experience-title-${i}`,
          start: "top 80%",
          once: true,
          onEnter: () =>
            setIsSvgVisible((prev) => ({
              ...prev,
              [i]: true,
            })),
        },
      });
    });
  });

  return (
    <div className="work-experience-container relative flex h-full w-full items-center justify-center px-8 py-16 text-black xl:w-[50%]">
      <div className="scroll-progress absolute top-0 left-0 h-0 w-[2px] -translate-x-1/2 bg-black">
        <GiPolarStar className="star invisible absolute bottom-0 left-0 size-8 -translate-x-1/2 translate-y-1/2" />
      </div>
      <div className="relative mt-8 flex flex-col gap-16 xl:mt-16">
        {workExperienceData.map((item, i) => (
          <div key={item.company} className="flex gap-16">
            <p className="hidden text-xl font-bold text-[#3b82f6] md:block xl:text-3xl">{`${i + 1})`}</p>
            <div
              className={`relative flex flex-1 flex-col items-center gap-8 experienceItem-${i + 1} rounded-xl bg-white bg-[linear-gradient(to_right,#0000001a_1px,transparent_1px),linear-gradient(to_bottom,#0000001a_1px,transparent_1px)] bg-[size:20px_20px] px-2 py-16 shadow-[-10px_10px_0px_0px_#6D28D9,-20px_20px_0px_0px_#ffd166] lg:px-8 xl:py-10 2xl:py-16`}
            >
              <div
                className={`experience-title experience-title-${i} relative`}
              >
                <p className="text-center text-3xl text-[#3b82f6] uppercase 2xl:text-5xl">
                  {item.company}
                </p>
                {isSvgVisible[i] && (
                  <AnimateSvg
                    width="100%"
                    height="100%"
                    viewBox="0 0 240 100"
                    className="my-svg-animation absolute -bottom-4 h-[200px] w-full translate-y-1/2"
                    path="M0 50 C 20 40, 40 60, 60 50 C 80 40, 100 60, 120 50 C 140 40, 160 60, 180 50 C 200 40, 220 60, 240 50"
                    strokeColor="#3b82f6"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    animationDuration={1.5}
                    animationDelay={0}
                    animationBounce={0.3}
                    reverseAnimation={false}
                    enableHoverAnimation={false}
                    hoverAnimationType="redraw"
                  />
                )}
              </div>
              <p className="mt-4 text-lg text-red-500">{item.role}</p>
              <p className="max-w-[520px] text-center text-xl font-semibold">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperienceContainer;
