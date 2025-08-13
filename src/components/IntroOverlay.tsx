"use client";

import { useMediaLoading } from "@/context/MediaLoadingContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const IntroOverlay = () => {
  const overlayContainerRef = useRef<HTMLDivElement>(null);
  const { progress, allLoaded, setOverlayAnimComplete } = useMediaLoading();
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

      if (allLoaded) {
        const tl = gsap.timeline({
          onComplete: () => {
            setIsAnimationComplete(true);
            setOverlayAnimComplete();
          },
        });

        tl.to(".animesh-intro-logo, .loading-text", {
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
      }
    },

    { scope: overlayContainerRef, dependencies: [allLoaded] },
  );

  if (isAnimationComplete) {
    return null;
  }

  return (
    <div
      ref={overlayContainerRef}
      className="fixed top-0 left-0 z-[99] flex h-screen w-full items-center justify-center bg-[#396edd]"
    >
      <div className="animesh-intro-logo relative h-[150px] w-[150px]">
        <Image
          src="/animesh-logo.jpg"
          alt="logo"
          fill
          className="object-cover"
        />
      </div>
      <p className="absolute bottom-0 left-8 text-[12rem] text-white">
        {Math.floor(progress)}
      </p>
    </div>
  );
};

export default IntroOverlay;
