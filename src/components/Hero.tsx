"use client";

import { adeDisplay } from "@/app/fonts/fonts";
import React from "react";
import { GiPolarStar } from "react-icons/gi";
import TextAnimationWrapper from "./TextAnimationWrapper";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaLoading } from "@/context/MediaLoadingContext";
import PreloadImage from "./PreloadImage";

gsap.registerPlugin(useGSAP);

const Hero = () => {
  const { isOverlayAnimComplete } = useMediaLoading();

  useGSAP(() => {
    if (isOverlayAnimComplete) {
      gsap.to(".hero-sub-text", { opacity: 1, x: 0, duration: 1 });
      gsap.to(".hero-about-text", { opacity: 1, y: 0, duration: 1 });
      gsap.to(".animesh-logo", {
        rotateZ: 360,
        repeat: -1,
        ease: "none",
        duration: 4,
      });
      gsap.to(".animesh-portrait", { opacity: 1, y: 0, duration: 1 });
    }
  }, [isOverlayAnimComplete]);

  return (
    <div className="relative min-h-screen w-full bg-[#fff6db] bg-gradient-to-b from-[#3b82f6] from-20% via-[#fff6db] via-80% xl:flex">
      <div className="flex flex-col items-center gap-6 p-4 xl:mt-20 xl:items-start xl:p-8 2xl:mt-24 2xl:items-center 2xl:gap-12">
        <div
          className={`mt-20 flex flex-col items-center gap-4 text-white md:mt-30 xl:mt-20 xl:items-start 2xl:items-center`}
        >
          <div className="flex flex-col items-center justify-start overflow-hidden text-center text-wrap xl:items-start 2xl:flex-row 2xl:gap-12">
            <div className="overflow-hidden">
              <TextAnimationWrapper
                text="Animesh"
                className={`${adeDisplay.className} mt-8 text-5xl uppercase lg:text-9xl xl:mt-0`}
              />
            </div>
            <div className="overflow-hidden">
              <TextAnimationWrapper
                text="Sharma"
                className={`${adeDisplay.className} text-5xl uppercase lg:text-9xl xl:mt-0`}
              />
            </div>
          </div>
          <p className="hero-sub-text -translate-x-50 font-black uppercase opacity-0 2xl:text-4xl">
            Digital Artist / illustrator
          </p>
        </div>
        <div className="flex w-full items-center gap-1">
          <div className="h-[1px] w-full bg-white" />
          <GiPolarStar className="size-16" />
          <div className="h-[1px] w-full bg-white" />
        </div>
        <div className="hero-about-text relative w-full max-w-[700px] translate-y-50 rounded-2xl bg-white bg-[linear-gradient(to_right,#0000001a_1px,transparent_1px),linear-gradient(to_bottom,#0000001a_1px,transparent_1px)] bg-[size:20px_20px] p-8 opacity-0 shadow-[-10px_10px_0px_0px_#6D28D9] md:p-10 xl:w-[500px] 2xl:w-full">
          <p
            className={`text-justify font-extrabold text-blue-600 md:text-xl xl:text-base 2xl:text-xl`}
          >
            Hi! I’m a digital artist passionate about bringing imagination to
            life through pixels and color. My work blends creativity with
            storytelling, capturing emotion and atmosphere in every
            piece—whether it&apos;s character design, concept art, or surreal
            landscapes. Inspired by both the natural world and futuristic
            aesthetics, I aim to create visuals that connect, inspire, and
            provoke thought.
          </p>
          <div className="animesh-logo absolute -top-8 -right-4 h-[70px] w-[70px] rounded-full">
            <PreloadImage
              src="/animesh-logo.jpg"
              alt="logo"
              fill
              className="onject-cover rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 hidden h-full w-[680px] xl:block">
        <PreloadImage
          src="/ani-portrait.png"
          alt="image"
          fill
          className="animesh-portrait translate-y-30 object-cover opacity-0"
        />
      </div>
    </div>
  );
};

export default Hero;
