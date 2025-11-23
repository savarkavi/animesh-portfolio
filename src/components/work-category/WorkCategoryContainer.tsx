"use client";

import React, { useState, useEffect, useRef, MouseEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";

gsap.registerPlugin(useGSAP, Draggable);

interface MediaItem {
  src: string;
  type: string;
}

interface PositionedMediaItem extends MediaItem {
  style: React.CSSProperties;
}

interface CategoryMediaProps {
  media: MediaItem[];
}

const WorkCategoryContainer = ({ media }: CategoryMediaProps) => {
  const boundsContainerRef = useRef<HTMLDivElement>(null);
  const [positionedMedia, setPositionedMedia] = useState<PositionedMediaItem[]>(
    [],
  );

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const draggablesRef = useRef<Draggable[]>([]);
  const originalPositionsRef = useRef<{
    [key: number]: { top: string; left: string; x: number; y: number };
  }>({});
  const isMobile = useMediaQuery("(max-width: 1024px)", {
    initializeWithValue: false,
  });

  useEffect(() => {
    if (isMobile) return;
    const SPREAD = 150;
    const calculatedPositions = media.map((item) => {
      const top = Math.random() * (2 * SPREAD) + (50 - SPREAD);
      const left = Math.random() * (2 * SPREAD) + (50 - SPREAD);
      return {
        ...item,
        style: {
          top: `${top}%`,
          left: `${left}%`,
          transform: `translate(-50%, -50%)`,
        },
      };
    });
    setPositionedMedia(calculatedPositions);
  }, [media, isMobile]);

  const { contextSafe } = useGSAP(
    () => {
      if (
        !boundsContainerRef.current ||
        positionedMedia.length === 0 ||
        isMobile
      )
        return;

      const allItems = gsap.utils.toArray<HTMLImageElement>(".draggable-item");

      // <-- IMPORTANT: initialize numeric transforms so getProperty("x"/"y") is reliable
      gsap.set(allItems, { scale: 0.8, x: 0, y: 0 });

      draggablesRef.current.forEach((d) => d.kill());
      draggablesRef.current = [];

      allItems.forEach((item, i) => {
        const d = Draggable.create(item, {
          bounds: boundsContainerRef.current,
          type: "x,y",

          onDragStart: function () {
            gsap.set(this.target, { scale: 1 });

            const otherItems = allItems.filter((el) => el !== this.target);

            gsap.to(otherItems, {
              scale: 0.7,
              filter: "blur(5px)",
              duration: 0.25,
              ease: "power2.out",
            });
          },

          onDragEnd: function () {
            gsap.to(this.target, { scale: 0.8 });
            const otherItems = allItems.filter((el) => el !== this.target);

            gsap.to(otherItems, {
              scale: 0.8,
              filter: "blur(0px)",
              opacity: 1,
              duration: 0.25,
              ease: "power2.out",
            });
          },
        });

        draggablesRef.current[i] = d[0];
      });
    },
    { scope: boundsContainerRef, dependencies: [positionedMedia, isMobile] },
  );

  // store top/left and numeric x/y so we can restore reliably
  const handleFocus = contextSafe((idx: number) => {
    setFocusedIndex(idx);

    const allItems = gsap.utils.toArray<HTMLImageElement>(".draggable-item");
    const targetItem = allItems[idx];
    const otherItems = allItems.filter((_, i) => i !== idx);

    // Get computed top/left (these are the values we set earlier as percentages)
    const computedStyle = window.getComputedStyle(targetItem);
    const originalTop =
      computedStyle.top || (targetItem as HTMLElement).style.top;
    const originalLeft =
      computedStyle.left || (targetItem as HTMLElement).style.left;

    // GSAP transform values might be NaN initially if not set; fallback to 0
    const originalX = Number(gsap.getProperty(targetItem, "x")) || 0;
    const originalY = Number(gsap.getProperty(targetItem, "y")) || 0;

    originalPositionsRef.current[idx] = {
      top: originalTop,
      left: originalLeft,
      x: originalX,
      y: originalY,
    };

    if (draggablesRef.current[idx]) {
      draggablesRef.current[idx].disable();
    }

    // Move the item visually to center - we set top/left to 50% and reset x/y
    gsap.to(targetItem, {
      top: "50%",
      left: "50%",
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.inOut",
    });

    gsap.to(otherItems, {
      scale: 0.6,
      filter: "blur(10px)",
      opacity: 0.5,
      duration: 0.5,
      ease: "power3.inOut",
      pointerEvents: "none",
    });
  });

  const handleUnfocus = contextSafe(() => {
    if (focusedIndex === null) return; // Nothing to unfocus

    const allItems = gsap.utils.toArray<HTMLElement>(".draggable-item");
    const targetItem = allItems[focusedIndex];
    const otherItems = allItems.filter((_, i) => i !== focusedIndex);
    const originalPosition = originalPositionsRef.current[focusedIndex];

    if (draggablesRef.current[focusedIndex]) {
      draggablesRef.current[focusedIndex].enable();
    }

    if (targetItem && originalPosition) {
      // Restore both top/left (percent values) and x/y (numeric GSAP transforms)
      gsap.to(targetItem, {
        top: originalPosition.top,
        left: originalPosition.left,
        x: originalPosition.x,
        y: originalPosition.y,
        scale: 0.8,
        duration: 0.5,
        ease: "power3.inOut",
      });
    }

    gsap.to(otherItems, {
      scale: 0.8,
      filter: "blur(0px)",
      opacity: 1,
      duration: 0.5,
      ease: "power3.inOut",
      pointerEvents: "auto",
    });

    setFocusedIndex(null);
  });

  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleUnfocus();
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      ref={boundsContainerRef}
      className="relative flex w-full items-center justify-center overflow-hidden bg-[#fff6db] bg-[linear-gradient(to_right,#0000001a_1px,transparent_1px),linear-gradient(to_bottom,#0000001a_1px,transparent_1px)] bg-[size:20px_20px] xl:h-screen"
    >
      <div className="relative flex flex-col gap-12 px-4 py-28 lg:block lg:h-[500px] lg:w-[500px] lg:p-0">
        {isMobile
          ? media.map((item, i) =>
              item.type === "image" ? (
                <Image
                  key={i}
                  src={item.src}
                  alt="image"
                  width={400}
                  height={400}
                  className="rounded-md object-contain"
                />
              ) : (
                <video
                  key={i}
                  src={item.src}
                  width={400}
                  height={400}
                  className="rounded-md object-contain"
                  loop
                  muted
                  autoPlay
                  controls
                />
              ),
            )
          : positionedMedia.map((item, i) =>
              item.type === "image" ? (
                <Image
                  key={i}
                  style={item.style}
                  src={item.src}
                  alt="image"
                  width={500}
                  height={500}
                  className={`draggable-item media-${i} absolute cursor-grab rounded-md object-contain active:cursor-grabbing`}
                  priority={true}
                  onClick={() => handleFocus(i)}
                />
              ) : (
                <video
                  key={i}
                  style={item.style}
                  src={item.src}
                  onClick={() => handleFocus(i)}
                  width={500}
                  height={500}
                  className={`draggable-item media-${i} absolute cursor-grab rounded-md object-contain active:cursor-grabbing`}
                  loop
                  muted
                  autoPlay
                  controls
                />
              ),
            )}
      </div>
    </div>
  );
};

export default WorkCategoryContainer;
