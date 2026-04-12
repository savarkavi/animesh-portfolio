"use client";

import { useMediaLoading } from "@/context/MediaLoadingContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const IntroOverlay = () => {
  const overlayContainerRef = useRef<HTMLDivElement>(null);
  const { setOverlayAnimComplete } = useMediaLoading();
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useGSAP(
    () => {
      gsap.to(".animesh-intro-logo", {
        y: -30,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "easeInOut",
      });

      const tl = gsap.timeline({
        delay: 3,
        onComplete: () => {
          setIsAnimationComplete(true);
          setOverlayAnimComplete();
        },
      });

      tl.to(".animesh-intro-logo", {
        duration: 0.5,
        opacity: 0,
        ease: "power2.in",
      }).to(
        overlayContainerRef.current,
        {
          duration: 0.8,
          yPercent: -100,
          ease: "power2.inOut",
        },
        "-=0.2",
      );
    },
    { scope: overlayContainerRef, dependencies: [] },
  );

  if (isAnimationComplete) {
    return null;
  }

  return (
    <div
      ref={overlayContainerRef}
      className="fixed top-0 left-0 z-[999] flex h-dvh w-full items-center justify-center bg-[#0099ff]"
    >
      <div className="animesh-intro-logo relative h-[150px] w-[150px]">
        <Image src="/logo.png" alt="logo" fill className="object-contain" />
      </div>
    </div>
  );
};

export default IntroOverlay;
