"use client";

import { useMediaLoading } from "@/context/MediaLoadingContext";
import { headerItems } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import React from "react";

gsap.registerPlugin(useGSAP);

const Header = () => {
  const { isOverlayAnimComplete } = useMediaLoading();

  useGSAP(() => {
    if (isOverlayAnimComplete) {
      gsap
        .timeline()
        .to(".header-btn", { y: 30, stagger: 0.1 })
        .to(".header-btn", { y: 0, stagger: 0.1 }, "-=0.3");
    }
  }, [isOverlayAnimComplete]);

  return (
    <div className="absolute top-0 z-10 flex h-[80px] w-full justify-between p-6">
      <div className="flex w-full items-center justify-center gap-10 xl:justify-start">
        {headerItems.map((item) => (
          <button
            key={item.id}
            className="header-btn -translate-y-50 cursor-pointer border bg-white px-4 py-1 text-sm font-extrabold text-black uppercase shadow-[-5px_5px_0px_0px_#f54a00]"
          >
            <Link href={item.link}>{item.label}</Link>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
