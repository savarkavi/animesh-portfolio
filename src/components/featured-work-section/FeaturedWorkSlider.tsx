"use client";

import { featuredWorkData } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import PreloadImage from "../PreloadImage";
import { ScrollTrigger } from "gsap/all";
import { GiPolarStar } from "react-icons/gi";
import { useMediaQuery } from "usehooks-ts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FeaturedWorkSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const activeIndexRef = useRef<number | null>(null);
  const numberRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const radius = 1000;
  const itemAngle = 360 / featuredWorkData.length;

  const isMobile = useMediaQuery("(max-width: 1024px)");

  useGSAP(
    () => {
      if (!containerRef.current || !imagesRef.current) return;

      imagesRef.current.forEach((el, i) => {
        gsap.set(el, {
          rotationY: -i * itemAngle,
          transformOrigin: `50% 50% ${-radius}px`,
          transformPerspective: 2000,
        });
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${(featuredWorkData.length - 1) * 500}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,

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
                if (numberRef.current) {
                  const displayIndex = closestIndex + 1;
                  numberRef.current.innerText =
                    displayIndex < 10 ? `0${displayIndex}` : `${displayIndex}`;
                }
              }
            },
          },
        })
        .to(
          imagesRef.current,
          {
            rotationY: `+=${360 - itemAngle}`,
            ease: "none",
          },
          0,
        )

        .to(
          lineRef.current,
          {
            width: () =>
              isMobile
                ? window.innerWidth - (numberRef.current?.offsetWidth || 0) - 24
                : window.innerWidth -
                  (numberRef.current?.offsetWidth || 0) -
                  64 -
                  24,
            ease: "none",
          },
          0,
        );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={`featured-work-slider-container relative -mt-1 flex h-screen w-full items-center justify-center overflow-hidden bg-[#0099ff]`}
    >
      <div className="pointer-events-none absolute top-0 left-1/2 z-10 flex w-full -translate-x-1/2 items-center gap-4 px-2 py-4 lg:p-8">
        <div ref={lineRef} className="relative h-[1px] w-14 bg-current">
          <GiPolarStar className="line-star absolute top-1/2 -right-1 size-8 -translate-y-1/2" />
        </div>
        <p
          ref={numberRef}
          className="w-fit shrink-0 text-2xl tabular-nums lg:text-6xl 2xl:text-8xl"
        >
          01
        </p>
      </div>
      <div
        className="featured-work-images-container relative mt-16 flex h-[600px] w-full items-center justify-center 2xl:h-[700px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {featuredWorkData.map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) imagesRef.current[i] = el;
            }}
            className="absolute flex h-[500px] w-[400px] items-center md:h-[600px] md:w-[500px]"
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
