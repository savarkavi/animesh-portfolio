"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface LinkHoverUnderlineProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const LinkHoverUnderline: React.FC<LinkHoverUnderlineProps> = ({
  href,
  children,
  className = "",
}) => {
  const underlineRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    if (!linkRef.current || !underlineRef.current) return;

    const underline = underlineRef.current;

    const handleEnter = () => {
      gsap.to(underline, {
        width: "100%",
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const handleLeave = () => {
      gsap.to(underline, {
        width: "0%",
        duration: 0.3,
        ease: "power3.in",
      });
    };

    linkRef.current.addEventListener("mouseenter", handleEnter);
    linkRef.current.addEventListener("mouseleave", handleLeave);

    return () => {
      linkRef.current?.removeEventListener("mouseenter", handleEnter);
      linkRef.current?.removeEventListener("mouseleave", handleLeave);
    };
  });

  return (
    <Link
      href={href}
      ref={linkRef}
      className={`relative inline-block ${className}`}
    >
      {children}
      <div
        ref={underlineRef}
        className="absolute bottom-0 left-0 h-[2px] w-0 bg-white"
      />
    </Link>
  );
};

export default LinkHoverUnderline;
