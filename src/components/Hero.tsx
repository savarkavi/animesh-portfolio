import { electroharmonix, nuku } from "@/app/page";
import Image from "next/image";
import React from "react";
import { GiPolarStar } from "react-icons/gi";

const Hero = () => {
  return (
    <div className="relative min-h-screen w-full xl:flex">
      <div className="mt-16 flex flex-col items-center gap-6 p-8 md:mt-30 lg:mt-36 xl:mt-20 xl:items-start 2xl:mt-36 2xl:gap-12">
        <div className={`flex flex-col items-center gap-4 xl:items-start`}>
          <div className="flex flex-col items-center justify-start xl:items-start 2xl:flex-row 2xl:gap-12">
            <p
              className={`${nuku.className} text-8xl uppercase lg:text-9xl 2xl:text-[10rem] 2xl:leading-40`}
            >
              Animesh
            </p>
            <p
              className={`${nuku.className} text-8xl uppercase lg:text-9xl 2xl:text-[10rem] 2xl:leading-40`}
            >
              Sharma
            </p>
          </div>
          <p className="font-black uppercase 2xl:text-4xl">
            Digital Artist / illustrator
          </p>
        </div>
        <div className="flex w-full items-center gap-1">
          <div className="h-[1px] w-full bg-white" />
          <GiPolarStar className="size-16" />
          <div className="h-[1px] w-full bg-white" />
        </div>
        <div className="relative w-full max-w-[700px] rounded-2xl bg-white bg-[linear-gradient(to_right,#0000001a_1px,transparent_1px),linear-gradient(to_bottom,#0000001a_1px,transparent_1px)] bg-[size:20px_20px] p-8 shadow-[-10px_10px_0px_0px_#6D28D9] md:p-10 xl:w-[500px] 2xl:w-full">
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
          <div className="absolute -top-8 -right-4 h-[70px] w-[70px] rounded-full">
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
