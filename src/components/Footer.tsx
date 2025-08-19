"use client";

import { socialLinks } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React, { useRef } from "react";
import LinkHoverUnderline from "./LinkHoverUnderline";
import { adeDisplay } from "@/app/fonts/fonts";

gsap.registerPlugin(useGSAP);

const Footer = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Heartbeat animation (your original code)
    gsap
      .timeline({ repeat: -1, defaults: { duration: 0.8 } })
      .to(".heart-svg", { y: 20 })
      .to(".heart-svg", { y: 0 });

    // --- NEW: Mouse move rotation logic ---

    const maxRotate = 15; // Maximum rotation in degrees

    // Function to handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      // Calculate rotation values based on mouse position relative to the center of the screen
      // The result is a value from -1 to 1, which we multiply by maxRotate
      const rotateY =
        ((clientX - innerWidth / 2) / (innerWidth / 2)) * maxRotate;
      // We invert rotateX for a more natural feel (mouse up -> image tilts down)
      const rotateX =
        -((clientY - innerHeight / 2) / (innerHeight / 2)) * maxRotate;

      // Animate the imageRef element with GSAP for a smooth effect
      gsap.to(imageRef.current, {
        rotateX: rotateX,
        rotateY: rotateY,
        ease: "power1.out",
        duration: 0.5,
        transformPerspective: 500, // Adds depth to the 3D effect
      });
    };

    // Function to handle mouse leaving the window
    const handleMouseLeave = () => {
      gsap.to(imageRef.current, {
        rotateX: 0,
        rotateY: 0,
        ease: "power1.out",
        duration: 1,
      });
    };

    // Add the event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup function to remove listeners when the component unmounts
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="fixed top-0 left-0 z-[90] flex h-screen w-full items-center justify-center bg-black bg-[linear-gradient(135deg,_rgba(70,69,73,0.7),_rgba(0,0,0,1)_64%)] p-2 text-white xl:justify-between">
      <div className="relative mx-auto">
        <div className="relative flex max-w-fit flex-1 flex-col items-center">
          <div className="flex h-full w-full flex-col items-center justify-between lg:flex-row">
            <p
              className={`${adeDisplay.className} text-center text-7xl uppercase md:text-8xl xl:text-[12rem]`}
            >
              Animesh
            </p>
            {/* Added a transform-style property to the parent for better 3D rendering */}
            <div
              ref={imageRef}
              className="relative -mt-2 h-[100px] w-[100px] lg:h-[200px] lg:w-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src="/footer-logo.png"
                alt="logo"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-between gap-4">
            {"Thank you for visiting".split(" ").map((item, i) => (
              <p
                key={i}
                className="text-xl leading-10 uppercase md:text-2xl xl:text-8xl"
              >
                {item}
              </p>
            ))}
            <div className="heart-svg relative h-[30px] w-[30px] md:h-[60px] md:w-[60px]">
              <Image
                src="/heart-svgrepo-com (2).svg"
                alt="heart svg"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="mt-12 flex w-full justify-between gap-8 text-sm uppercase xl:mt-16">
          <div className="flex flex-col items-center gap-8 text-[12px] tracking-wide">
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
          <div className="flex flex-col items-center gap-8 text-[12px] tracking-wide">
            <p className="md:text-base">Mail: animesh_sesnsie@gmail.com</p>
            <p className="md:text-base">Phone: 9840771756</p>
          </div>
        </div>
      </div>
      <p className="absolute bottom-4 left-4 z-10 uppercase 2xl:left-12">
        © Copyright Animesh
      </p>
    </div>
  );
};

export default Footer;
