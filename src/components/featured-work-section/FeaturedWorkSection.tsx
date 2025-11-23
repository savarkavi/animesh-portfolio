"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import React, { useRef } from "react";
import TitleMarquee from "./TitleMarquee";
import FeaturedWorkSlider from "./FeaturedWorkSlider";
import RibbonMarquee from "../experience/RibbonMarquee";

gsap.registerPlugin(useGSAP, ScrollTrigger, MorphSVGPlugin);

const FeaturedWorkSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavePathRef = useRef<SVGPathElement>(null);

  const endPath =
    "M0,96L48,106.7C96,117,192,139,288,133.3C384,128,480,96,576,85.3C672,75,768,85,864,106.7C960,128,1056,160,1152,154.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z";
  const startPath =
    "M0,128L48,112C96,96,192,64,288,90.7C384,117,480,203,576,229.3C672,256,768,224,864,224C960,224,1056,256,1152,250.7C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z";

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".featured-work-content",
            start: "top 90%",
            end: "top top",
            scrub: true,
          },
        })
        .to(wavePathRef.current, {
          attr: { d: endPath },
          ease: "none",
        });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center bg-[#fff6db]"
    >
      {/* <TitleMarquee /> */}
      <RibbonMarquee text="Featured Work" />
      <div className="featured-work-content h-full w-full">
        <div className="wavy-svg relative h-[200px] w-full xl:h-[320px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="absolute bottom-0 left-0 w-full"
            preserveAspectRatio="none"
          >
            <path
              ref={wavePathRef}
              fill="#0099ff"
              fillOpacity="1"
              d={startPath}
            ></path>
          </svg>
        </div>
        <FeaturedWorkSlider />
      </div>
    </div>
  );
};

export default FeaturedWorkSection;
