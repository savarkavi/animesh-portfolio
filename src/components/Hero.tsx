import { electroharmonix, nuku } from "@/app/page";
import Image from "next/image";
import React from "react";
import { GiPolarStar } from "react-icons/gi";

const Hero = () => {
  return (
    <div className="relative flex h-screen w-full">
      <div className="mt-36 flex flex-col items-center gap-12 p-8">
        <div className={`flex flex-col gap-4`}>
          <div className="flex justify-start gap-12">
            <p
              className={`${nuku.className} text-[10rem] leading-40 uppercase`}
            >
              Animesh
            </p>
            <p
              className={`${nuku.className} text-[10rem] leading-40 uppercase`}
            >
              Sharma
            </p>
          </div>
          <p className="text-4xl font-black uppercase">
            Digital Artist / illustrator
          </p>
        </div>
        <div className="flex w-full items-center gap-1">
          <div className="h-[1px] w-full bg-white" />
          <GiPolarStar className="size-16" />
          <div className="h-[1px] w-full bg-white" />
        </div>
        <div className="relative max-w-[700px] rounded-2xl bg-white bg-[linear-gradient(to_right,#0000001a_1px,transparent_1px),linear-gradient(to_bottom,#0000001a_1px,transparent_1px)] bg-[size:20px_20px] p-10 shadow-[-10px_10px_0px_0px_#6D28D9]">
          <p className={`text-justify text-xl font-extrabold text-blue-600`}>
            Hi! I’m a digital artist passionate about bringing imagination to
            life through pixels and color. My work blends creativity with
            storytelling, capturing emotion and atmosphere in every
            piece—whether it's character design, concept art, or surreal
            landscapes. Inspired by both the natural world and futuristic
            aesthetics, I aim to create visuals that connect, inspire, and
            provoke thought.
          </p>
          <div className="absolute -top-8 -right-8 h-[80px] w-[80px] rounded-full">
            <Image
              src="/animesh-logo.jpg"
              alt="logo"
              fill
              className="onject-cover rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 right-0 h-screen w-[800px] -translate-y-1/2">
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
