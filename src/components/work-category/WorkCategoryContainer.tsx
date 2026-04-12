"use client";

import React, { useState, MouseEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";

gsap.registerPlugin(useGSAP);

interface MediaItem {
  src: string;
  type: string;
}

interface CategoryMediaProps {
  media: MediaItem[];
}

const WorkCategoryContainer = ({ media }: CategoryMediaProps) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const isMobile = useMediaQuery("(max-width: 1024px)", {
    initializeWithValue: false,
  });

  const { contextSafe } = useGSAP();

  const handleFocus = contextSafe((idx: number) => {
    if (focusedIndex === idx) {
      handleUnfocus();
      return;
    }

    const allItems = gsap.utils.toArray<HTMLElement>(".focusable-item");
    const targetItem = allItems[idx];
    const otherItems = allItems.filter((_, i) => i !== idx);

    // If another item was focused, reset it visually
    if (focusedIndex !== null) {
      const oldItem = allItems[focusedIndex];
      gsap.to(oldItem, {
        x: 0,
        y: 0,
        scale: 1,
        zIndex: 1,
        duration: 0.5,
        ease: "power3.inOut",
      });
    }

    setFocusedIndex(idx);

    gsap.set(targetItem, { zIndex: 50 });

    const rect = targetItem.getBoundingClientRect();
    const currentX = Number(gsap.getProperty(targetItem, "x")) || 0;
    const currentY = Number(gsap.getProperty(targetItem, "y")) || 0;

    const baseCenterX = rect.left + rect.width / 2 - currentX;
    const baseCenterY = rect.top + rect.height / 2 - currentY;

    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    const dx = viewportCenterX - baseCenterX;
    const dy = viewportCenterY - baseCenterY;

    gsap.to(targetItem, {
      x: dx,
      y: dy,
      scale: isMobile ? 1.1 : 1.3,
      duration: 0.5,
      ease: "power3.inOut",
    });

    gsap.to(otherItems, {
      scale: 0.8,
      filter: "blur(5px)",
      opacity: 0.5,
      duration: 0.5,
      ease: "power3.inOut",
      pointerEvents: "none",
    });
  });

  const handleUnfocus = contextSafe(() => {
    if (focusedIndex === null) return;

    const allItems = gsap.utils.toArray<HTMLElement>(".focusable-item");
    const targetItem = allItems[focusedIndex];
    const otherItems = allItems.filter((_, i) => i !== focusedIndex);

    gsap.to(targetItem, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(targetItem, { zIndex: 1 });
      },
    });

    gsap.to(otherItems, {
      scale: 1,
      filter: "blur(0px)",
      opacity: 1,
      duration: 0.5,
      ease: "power3.inOut",
      pointerEvents: "auto",
    });

    setFocusedIndex(null);
  });

  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).classList.contains("background-layer")) {
      handleUnfocus();
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="background-layer relative flex min-h-screen w-full items-center justify-center bg-[#fff6db] bg-[linear-gradient(to_right,#0000001a_1px,transparent_1px),linear-gradient(to_bottom,#0000001a_1px,transparent_1px)] bg-[size:20px_20px]"
    >
      <div
        onClick={handleBackgroundClick}
        className="background-layer relative z-10 grid w-full max-w-7xl grid-cols-1 justify-items-center gap-20 px-4 py-28 lg:grid-cols-3"
      >
        {media.map((item, i) =>
          item.type === "image" ? (
            <Image
              key={i}
              src={item.src}
              alt="image"
              width={isMobile ? 300 : 400}
              height={isMobile ? 300 : 400}
              className={`focusable-item media-${i} relative cursor-pointer rounded-md object-contain shadow-lg`}
              priority={true}
              onClick={(e) => {
                e.stopPropagation();
                handleFocus(i);
              }}
            />
          ) : (
            <video
              key={i}
              src={item.src}
              onClick={(e) => {
                e.stopPropagation();
                handleFocus(i);
              }}
              width={isMobile ? 300 : 400}
              height={isMobile ? 300 : 400}
              className={`focusable-item media-${i} relative cursor-pointer rounded-md object-contain shadow-lg`}
              loop
              muted
              autoPlay
              controls={focusedIndex === i}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default WorkCategoryContainer;
