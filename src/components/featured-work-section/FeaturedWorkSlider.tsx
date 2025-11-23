"use client";

import { featuredWorkData } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import PreloadImage from "../PreloadImage";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FeaturedWorkSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const activeIndexRef = useRef<number | null>(null);

  const radius = 1000;
  const itemAngle = 360 / featuredWorkData.length;

  useGSAP(
    () => {
      if (!containerRef.current || !imagesRef.current) return;

      imagesRef.current.forEach((el, i) => {
        gsap.set(el, {
          rotationY: i * itemAngle,
          transformOrigin: `50% 50% ${-radius}px`,
          transformPerspective: 2000,
        });
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${featuredWorkData.length * 500}`,
            scrub: 1,
            pin: true,

            onEnter: () => {
              activeIndexRef.current = 0;
            },

            onUpdate: () => {
              let closestIndex = -1;
              let minDistance = 360;

              imagesRef.current.forEach((el, i) => {
                const currentRotation = gsap.getProperty(
                  el,
                  "rotationY",
                ) as number;
                const normalizedAngle = Math.abs(currentRotation % 360);
                const distanceFromFront = Math.min(
                  normalizedAngle,
                  360 - normalizedAngle,
                );

                const newOpacity = gsap.utils.mapRange(
                  0,
                  180,
                  1,
                  0.3,
                )(distanceFromFront);
                gsap.set(el, { opacity: newOpacity });

                if (distanceFromFront < minDistance) {
                  minDistance = distanceFromFront;
                  closestIndex = i;
                }
              });

              if (
                closestIndex !== -1 &&
                closestIndex !== activeIndexRef.current
              ) {
                activeIndexRef.current = closestIndex;
              }
            },
          },
        })
        .to(imagesRef.current, {
          rotationY: `+=${360}`,
          ease: "none",
        });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={`featured-work-slider-container relative -mt-1 flex h-screen w-full items-center justify-center overflow-hidden bg-[#0099ff]`}
    >
      <div
        className="featured-work-images-container relative flex h-[600px] w-full items-center justify-center 2xl:h-[700px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {featuredWorkData.map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) imagesRef.current[i] = el;
            }}
            className="absolute flex h-[600px] w-[500px] items-center"
          >
            <PreloadImage
              src={item.imgSrc}
              alt={item.label}
              fill
              className="rounded-md object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedWorkSlider;
