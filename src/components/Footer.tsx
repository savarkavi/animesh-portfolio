"use client";

import { socialLinks } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React from "react";
import LinkHoverUnderline from "./LinkHoverUnderline";

gsap.registerPlugin(useGSAP);

const Footer = () => {
  useGSAP(() => {
    gsap
      .timeline({ repeat: -1, defaults: { duration: 0.8 } })
      .to(".heart-svg", { y: 20 })
      .to(".heart-svg", { y: 0 });
  });

  return (
    <div className="fixed top-0 left-0 z-[90] flex h-screen w-full justify-center bg-black bg-[linear-gradient(135deg,_rgba(70,69,73,0.7),_rgba(0,0,0,1)_64%)] text-white xl:justify-between">
      <div className="absolute mt-24 flex flex-1 flex-col p-4 xl:mt-0 xl:pl-12 2xl:py-16">
        <p className="text-7xl uppercase md:text-8xl xl:text-[12rem]">
          Animesh
        </p>
        <div className="flex w-full items-center justify-between gap-4">
          {"Thank you for visiting".split(" ").map((item, i) => (
            <p
              key={i}
              className="text-xl leading-10 uppercase md:text-2xl xl:text-6xl"
            >
              {item}
            </p>
          ))}
          <div className="heart-svg relative h-[40px] w-[40px] md:h-[70px] md:w-[70px]">
            <Image
              src="/heart.svg"
              alt="heart svg"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="mt-16 flex justify-between text-sm uppercase">
          <div className="flex flex-col gap-8 tracking-wide">
            <p className="text-2xl text-gray-400">Socials</p>
            {socialLinks.map((item, i) => (
              <LinkHoverUnderline href={item.link} key={i} className="w-fit">
                {item.name}
              </LinkHoverUnderline>
            ))}
          </div>
          <div className="flex flex-col gap-8 tracking-wide">
            <p className="text-2xl text-gray-400">Contact</p>
            <p>Mail: animesh_sesnsie@gmail.com</p>
            <p>Phone: 9840771756</p>
          </div>
        </div>
      </div>
      <p className="absolute bottom-6 left-4 z-10 uppercase 2xl:left-12">
        © Copyright Animesh
      </p>
      <div className="absolute right-0 bottom-0 h-[500px] w-full sm:h-[600px] sm:w-[500px] xl:w-[600px] 2xl:h-[800px] 2xl:w-[800px]">
        <Image
          src="/footer-img(1).png"
          alt="footer-img"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Footer;
