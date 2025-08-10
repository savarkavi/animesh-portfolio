import { featuredWorkData } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FeaturedWorkSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);

  const radius = 1000;
  const itemAngle = 360 / featuredWorkData.length;

  useGSAP(() => {
    imagesRef.current.forEach((el, i) => {
      gsap.set(el, {
        rotationY: i * itemAngle,
        transformOrigin: `50% 50% ${-radius}px`,
        transformPerspective: 2000,
      });
    });

    gsap.to(imagesRef.current, {
      rotationY: `+=${360}`,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${featuredWorkData.length * 500}`,
        scrub: true,
        pin: true,
      },
    });
  });

  return (
    <div
      ref={containerRef}
      className="featured-work-slider-container relative -mt-1 flex h-screen w-full items-center justify-center overflow-hidden bg-[#0099ff]"
    >
      <div
        className="featured-work-images-container relative flex h-[600px] w-full items-center justify-center 2xl:h-[700px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {featuredWorkData.map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) imagesRef.current[i] = el;
            }}
            className="absolute flex h-full items-center"
          >
            <Image
              src={item.imgSrc}
              alt={item.label}
              height={600}
              width={550}
              className="object-contain"
            />
            <p className="absolute -top-12 left-4 text-4xl">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedWorkSlider;
