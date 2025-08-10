"use client";

import { electroharmonix, nuku } from "@/app/page";
import Image from "next/image";
import React from "react";
import { GiPolarStar } from "react-icons/gi";
import TextAnimationWrapper from "./TextAnimationWrapper";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Hero = () => {
  useGSAP(() => {
    gsap.to(".hero-sub-text", { opacity: 1, x: 0, duration: 1 });
    gsap.to(".hero-about-text", { opacity: 1, y: 0, duration: 1 });
    gsap.to(".animesh-logo", {
      rotateZ: 360,
      repeat: -1,
      ease: "none",
      duration: 4,
    });
  });

  return (
    <div className="relative min-h-screen w-full bg-[#fff6db] bg-gradient-to-b from-[#3b82f6] from-20% via-[#fff6db] via-80% xl:flex">
      <div className="mt-16 flex flex-col items-center gap-6 p-8 md:mt-30 lg:mt-36 xl:mt-20 2xl:mt-36 2xl:gap-12">
        <div className={`flex flex-col items-center gap-4 xl:items-start`}>
          <div className="flex flex-col items-center justify-start overflow-hidden xl:items-start 2xl:flex-row 2xl:gap-12">
            <TextAnimationWrapper
              text="Animesh Sharma"
              className={`${nuku.className} text-8xl uppercase lg:text-9xl 2xl:text-[10rem] 2xl:leading-40`}
            />
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
            piece—whether it's character design, concept art, or surreal
            landscapes. Inspired by both the natural world and futuristic
            aesthetics, I aim to create visuals that connect, inspire, and
            provoke thought.
          </p>
          <div className="animesh-logo absolute -top-8 -right-4 h-[70px] w-[70px] rounded-full">
            <Image
              src="/animesh-logo.jpg"
              alt="logo"
              fill
              className="onject-cover rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 hidden h-full w-[680px] xl:block">
        <Image
          src="/animesh-portrait.png"
          alt="image"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
