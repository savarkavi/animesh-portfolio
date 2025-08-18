import { featuredWorkData } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState } from "react";
import PreloadImage from "../PreloadImage";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FeaturedWorkSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const activeIndexRef = useRef<number | null>(null);

  // State to hold the image source URL, or null if no image should be shown
  const [activeBgImage, setActiveBgImage] = useState<string | null>(null);

  const radius = 1000;
  const itemAngle = 360 / featuredWorkData.length;

  useGSAP(
    () => {
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

          // --- NEW CALLBACKS TO MANAGE BACKGROUND STATE ---

          // When the container first pins
          onEnter: () => {
            activeIndexRef.current = 0;
            setActiveBgImage(featuredWorkData[0].imgSrc);
          },
          // When the scroll leaves the trigger area going down
          onLeave: () => {
            setActiveBgImage(null);
          },
          // When the scroll leaves the trigger area going up
          onLeaveBack: () => {
            setActiveBgImage(null);
          },

          onUpdate: () => {
            let closestIndex = -1;
            let minDistance = 360;

            imagesRef.current.forEach((el, i) => {
              const currentRotation = gsap.getProperty(
                el,
                "rotationY",
              ) as number;
              const normalizedAngle = Math.abs(currentRotation % 360);
              const distanceFromFront = Math.min(
                normalizedAngle,
                360 - normalizedAngle,
              );

              const newOpacity = gsap.utils.mapRange(
                0,
                180,
                1,
                0.3,
              )(distanceFromFront);
              gsap.set(el, { opacity: newOpacity });

              if (distanceFromFront < minDistance) {
                minDistance = distanceFromFront;
                closestIndex = i;
              }
            });

            if (
              closestIndex !== -1 &&
              closestIndex !== activeIndexRef.current
            ) {
              activeIndexRef.current = closestIndex;
              setActiveBgImage(featuredWorkData[closestIndex].imgSrc);
            }
          },
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={`featured-work-slider-container relative -mt-1 flex h-screen w-full items-center justify-center overflow-hidden ${activeBgImage ? "bg-black" : "bg-[#0099ff]"}`}
    >
      <div
        style={{
          backgroundImage: activeBgImage ? `url('${activeBgImage}')` : "none",
        }}
        className={`absolute top-0 left-0 h-screen w-full bg-contain bg-center bg-no-repeat transition-opacity duration-700 ease-in-out ${
          activeBgImage ? "opacity-15" : "opacity-0"
        }`}
      ></div>
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
            className="absolute flex h-full items-start"
          >
            <PreloadImage
              src={item.imgSrc}
              alt={item.label}
              height={550}
              width={550}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedWorkSlider;
