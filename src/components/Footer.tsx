"use client";

import { socialLinks } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React, { useRef } from "react";
import LinkHoverUnderline from "./LinkHoverUnderline";
import { instrumentSerif } from "@/app/fonts/fonts";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

const Footer = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap
      .timeline({ repeat: -1, defaults: { duration: 0.8 } })
      .to(".heart-svg", { y: 20 })
      .to(".heart-svg", { y: 0 });

    const maxRotate = 15;

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      const rotateY =
        ((clientX - innerWidth / 2) / (innerWidth / 2)) * maxRotate;
      const rotateX =
        -((clientY - innerHeight / 2) / (innerHeight / 2)) * maxRotate;

      gsap.to(imageRef.current, {
        rotateX: rotateX,
        rotateY: rotateY,
        ease: "power1.out",
        duration: 0.5,
        transformPerspective: 500,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(imageRef.current, {
        rotateX: 0,
        rotateY: 0,
        ease: "power1.out",
        duration: 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[90] flex h-screen w-full items-center justify-center bg-[#0099ff] px-4 text-white xl:justify-between">
      <div className="relative mx-auto flex h-full w-full max-w-[1024px] flex-col justify-center">
        <div className="w-full">
          <div className="relative flex w-full flex-1 flex-col items-center">
            <div className="flex h-full w-fit flex-col items-center justify-between leading-24 sm:leading-normal lg:flex-row">
              <p
                className={`${instrumentSerif.className} text-[5rem] text-nowrap uppercase sm:text-9xl xl:text-[15rem]`}
              >
                Thank You
              </p>
            </div>

            <div className="flex w-full items-center justify-center gap-2 xl:justify-between xl:gap-3">
              {"for visiting !".split(" ").map((item, i) => (
                <p
                  key={i}
                  className="ml-3 text-[2.5rem] leading-10 sm:text-[5rem] xl:text-[9rem]"
                >
                  {item}
                </p>
              ))}
              <div
                ref={imageRef}
                className="relative -mt-2 h-[50px] w-[100px] lg:h-[130px] lg:w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src="/logo.png"
                  alt="logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          <div className="mt-12 flex w-full justify-between gap-8 text-sm xl:mt-16">
            <div className="flex flex-col items-start gap-6 text-[12px] tracking-wide">
              <p className="text-xl font-bold uppercase">Socials</p>
              {socialLinks.map((item, i) => (
                <LinkHoverUnderline
                  href={item.link}
                  key={i}
                  className="w-fit md:text-base"
                >
                  {item.name}
                </LinkHoverUnderline>
              ))}
            </div>
            <div className="flex flex-col items-start gap-6 text-[12px] tracking-wide">
              <p className="text-xl font-bold uppercase">Contact</p>

              <Link
                href="mailto:animesh.sharma.art@gmail.com"
                className="md:text-base"
              >
                animesh.sharma.art@gmail.com
              </Link>
            </div>
          </div>
        </div>
        <p className="absolute bottom-4 z-10 uppercase">
          © Copyright Animesh 2026
        </p>
      </div>
    </div>
  );
};

export default Footer;
