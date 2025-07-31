"use client";

import { electroharmonix } from "@/app/page";
import React, { useRef, useState } from "react";
import ImageContainer from "./ImageContainer";
import Experience from "./Experience";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useMediaQuery } from "usehooks-ts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ExperienceSection = () => {
  const [currExpItem, setCurrExpItem] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  useGSAP(() => {
    if (isMobile) return;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = parseFloat(self.progress.toFixed(2));

            if (progress < 0.33) {
              gsap.to(".experienceItem-2", { opacity: 0.5 });
              setCurrExpItem(1);
            }

            if (progress > 0.33 && progress < 0.66) {
              gsap.to(".experienceItem-2", { opacity: 1 });
              setCurrExpItem(2);
            }

            if (progress < 0.66) {
              gsap.to(".experienceItem-3", { opacity: 0.5 });
            }

            if (progress > 0.66) {
              gsap.to(".experienceItem-3", { opacity: 1 });
              setCurrExpItem(3);
            }
          },
        },
      })
      .to(".scroll-progress .star", { visibility: "visible", duration: 0.1 })
      .to(".scroll-progress", { height: "100%", ease: "none" }, "<");
  });

  return (
    <div className="min-h-screen">
      <div className="-rotate-4 border-y border-black bg-white p-1 lg:p-2">
        <div className="noise flex items-center justify-center rounded-xl px-6 py-4">
          <p
            className={`${electroharmonix.className} text-3xl font-black tracking-wider lg:text-7xl`}
          >
            Experience
          </p>
        </div>
      </div>
      <div ref={containerRef} className="flex min-h-screen">
        <ImageContainer currExpItem={currExpItem} />
        <Experience />
      </div>
    </div>
  );
};

export default ExperienceSection;
