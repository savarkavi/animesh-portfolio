"use client";

import { electroharmonix, nuku } from "@/app/page";
import { headerItems } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

gsap.registerPlugin(useGSAP);

const Header = () => {
  useGSAP(() => {
    gsap
      .timeline()
      .to(".header-btn", { y: 30, stagger: 0.1 })
      .to(".header-btn", { y: 0, stagger: 0.1 }, "-=0.3");
  });

  return (
    <div className="absolute top-0 z-10 hidden w-full justify-between p-6 md:flex">
      <div className="flex w-full items-center justify-center gap-10 xl:justify-start">
        {headerItems.map((item) => (
          <button
            key={item.id}
            className="header-btn -translate-y-50 cursor-pointer bg-white px-4 py-1 text-sm font-extrabold text-black uppercase shadow-[-5px_5px_0px_0px_#6D28D9]"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
