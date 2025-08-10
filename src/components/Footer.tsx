"use client";

import { footerLinks, headerItems } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React from "react";

gsap.registerPlugin(useGSAP);

const Footer = () => {
  useGSAP(() => {
    gsap
      .timeline({ repeat: -1, defaults: { duration: 0.8 } })
      .to(".heart-svg", { y: 20 })
      .to(".heart-svg", { y: 0 });
  });

  return (
    <div className="fixed top-0 left-0 flex h-screen w-full justify-between bg-black">
      <div className="absolute flex flex-1 flex-col py-16 pl-12">
        <p className="text-[12rem] uppercase">Animesh</p>
        <div className="flex w-full items-center justify-between gap-4">
          {"Thank you for visiting".split(" ").map((item, i) => (
            <p key={i} className="text-6xl leading-10 uppercase">
              {item}
            </p>
          ))}
          <div className="heart-svg relative h-[70px] w-[70px]">
            <Image
              src="/heart.svg"
              alt="heart svg"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="mt-16 flex justify-between uppercase">
          {footerLinks.map((item) => (
            <div key={item.label} className="flex items-center gap-8">
              {item.items.map((item, i) => (
                <p key={i}>{item.name}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="absolute bottom-8 left-16 uppercase">
        © Copyright Animesh
      </p>
      <div className="absolute right-0 bottom-0 h-screen w-[800px]">
        <Image
          src="/footer-img(1).png"
          alt="footer-img"
          fill
          className="bg-cover"
        />
      </div>
    </div>
  );
};

export default Footer;
