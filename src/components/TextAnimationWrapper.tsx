"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaLoading } from "@/context/MediaLoadingContext";

interface AnimatedTextProps {
  text: string;
  className?: string;
  onComplete?: () => void;
}

const TextAnimationWrapper: React.FC<AnimatedTextProps> = ({
  text,
  className,
  onComplete,
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const { isOverlayAnimComplete } = useMediaLoading();

  useGSAP(
    () => {
      if (isOverlayAnimComplete) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 95%",
            },
            onComplete: onComplete,
          })
          .to(".text-letter", {
            y: 0,
            duration: 0.5,
            stagger: 0.1,
          });
      }
    },
    { scope: textRef, dependencies: [isOverlayAnimComplete] },
  );

  return (
    <p ref={textRef} className={className}>
      {text.split(" ").map((word, wi) => (
        <React.Fragment key={wi}>
          <span className="relative inline-block overflow-hidden">
            {word.split("").map((l, i) => (
              <span
                key={`${wi}-${i}`}
                className="text-letter relative inline-block translate-y-50"
              >
                {l}
              </span>
            ))}
          </span>
          {wi < text.split(" ").length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </React.Fragment>
      ))}
    </p>
  );
};

export default TextAnimationWrapper;
