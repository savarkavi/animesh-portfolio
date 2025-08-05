import { brandsData } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BrandsContainer = () => {
  const brandsContainerRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP();

  const handleHover = contextSafe((idx: number) => {
    gsap
      .timeline()
      .to(`.brand-image-overlay-${idx}`, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.2,
      })
      .to(`.brand-image-overlay-${idx}`, {
        clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        duration: 0.2,
      })
      .set(`.brand-image-overlay-${idx}`, {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      });
  });

  return (
    <div
      ref={brandsContainerRef}
      className="brands-container flex h-full w-full flex-col items-center border-dashed border-black p-8 xl:w-[50%] xl:border-r xl:p-16"
    >
      <div className="mt-20 grid w-full grid-cols-2 border border-black">
        {brandsData.map((item, i) => (
          <div
            onMouseEnter={() => handleHover(i + 1)}
            key={item.label}
            className={`relative border border-gray-500 ${i === brandsData.length - 1 ? "col-span-2 h-[250px] xl:h-[200px] 2xl:h-[250px]" : "h-[200px] xl:h-[150px] 2xl:h-[200px]"}`}
          >
            <Image
              src={item.src}
              alt="brand-image"
              fill
              className="object-contain"
            />
            <div
              className={`brand-image-overlay-${i + 1} absolute top-0 left-0 h-full w-full bg-blue-500`}
              style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsContainer;
