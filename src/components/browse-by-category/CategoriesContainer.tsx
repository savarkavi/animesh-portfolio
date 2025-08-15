"use client";

import { browseCategoriesData } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { useMediaQuery } from "usehooks-ts";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CategoriesContainer = () => {
  const categoriesImagesContainer = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  useGSAP(() => {
    if (isMobile) return;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: categoriesImagesContainer.current,
          start: "top bottom",
          end: "top 40%",
          scrub: 1,
        },
      })
      .to(".categories-image", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      });
  }, [isMobile]);

  return (
    <div
      ref={categoriesImagesContainer}
      className="flex h-full flex-col xl:flex-row"
    >
      {browseCategoriesData.map((item, i) => (
        <Link
          href={item.link}
          key={i}
          className="categories-image group relative h-[700px] overflow-hidden xl:flex-1"
        >
          <div className="relative h-full w-full bg-black">
            <Image
              src={item.img}
              alt={item.label}
              fill
              className="object-cover opacity-30 transition-all duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 w-full -translate-1/2 text-center uppercase">
            <p className="text-4xl">{item.label}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesContainer;
