"use client";

import React, { useState, useEffect, useRef, MouseEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import Image from "next/image";

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
    [key: number]: { x: number; y: number };
  }>({});

  useEffect(() => {
    const SPREAD = 40;
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
  }, [media]);

  const { contextSafe } = useGSAP(
    () => {
      if (!boundsContainerRef.current || positionedMedia.length === 0) return;

      const allItems = gsap.utils.toArray<HTMLImageElement>(".draggable-item");

      gsap.set(allItems, { scale: 0.8 });

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
    { scope: boundsContainerRef, dependencies: [positionedMedia] },
  );

  const handleFocus = contextSafe((idx: number) => {
    setFocusedIndex(idx);

    const allItems = gsap.utils.toArray<HTMLImageElement>(".draggable-item");
    const targetItem = allItems[idx];
    const otherItems = allItems.filter((_, i) => i !== idx);

    originalPositionsRef.current[idx] = {
      x: gsap.getProperty(targetItem, "x") as number,
      y: gsap.getProperty(targetItem, "y") as number,
    };

    if (draggablesRef.current[idx]) {
      draggablesRef.current[idx].disable();
    }

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
      gsap.to(targetItem, {
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
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-red-600"
    >
      <div className="relative h-[600px] w-[600px]">
        {positionedMedia.map((item, i) =>
          item.type === "image" ? (
            <Image
              key={i}
              style={item.style}
              src={item.src}
              alt="image"
              width={600}
              height={600}
              className={`draggable-item media-${i} absolute cursor-grab rounded-md object-contain active:cursor-grabbing`}
              priority={true}
              onClick={() => handleFocus(i)}
            />
          ) : (
            <video
              key={i}
              // ref={el => videoRefs.current[i] = el}
              style={item.style}
              src={item.src}
              onClick={() => handleFocus(i)}
              width={600}
              height={600}
              className={`draggable-item media-${i} absolute cursor-grab rounded-md object-contain active:cursor-grabbing`}
              loop
              muted // Muted is crucial for programmatic play() to work reliably in browsers
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
