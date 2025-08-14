import { featuredWorkData } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import PreloadImage from "../PreloadImage";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FeaturedWorkSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);

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
          onUpdate: () => {
            imagesRef.current.forEach((el) => {
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
            });
          },
        },
      });
    },
    { scope: containerRef },
  );

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
            className="absolute flex h-full items-start"
          >
            <PreloadImage
              src={item.imgSrc}
              alt={item.label}
              height={550}
              width={500}
              className="object-contain"
            />
            <p className="absolute -top-14 left-0 px-4 text-3xl md:text-4xl">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedWorkSlider;
