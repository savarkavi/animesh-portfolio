import { experienceData } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import gsap from "gsap";
import Image from "next/image";
import React from "react";

gsap.registerPlugin(useGSAP);

const ImageContainer = ({ currExpItem }: { currExpItem: number }) => {
  useGSAP(() => {
    const imageContainers = gsap.utils.toArray(".image-container");

    imageContainers.forEach((item, i) => {
      if (currExpItem === i + 1) {
        gsap.to(`.image-container-${currExpItem}`, {
          opacity: 1,
          y: 0,
        });
      } else {
        gsap.to(`.image-container-${i + 1}`, { opacity: 0, y: 100 });
      }
    });
  }, [currExpItem]);

  return (
    <div className="relative flex flex-1 items-center justify-center">
      {experienceData.map((item, i) => (
        <div
          key={item.title}
          className={`image-container absolute top-1/2 left-0 w-full translate-y-[100px] opacity-0 image-container-${i + 1}`}
        >
          <div
            className={
              "absolute top-[55%] left-[35%] h-[500px] w-[400px] -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-lg border border-black shadow-2xl"
            }
          >
            <DotLottieReact
              src="/lightning.lottie"
              loop
              autoplay
              className="absolute top-0 left-0 z-10 h-[200px] w-[200px] -translate-1/2"
            />
            <Image
              src={item.imgOneSrc}
              alt="image"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div
            className={
              "absolute top-[50%] left-[65%] h-[500px] w-[400px] -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-lg border border-black shadow-2xl"
            }
          >
            <Image
              src={item.imgTwoSrc}
              alt="image"
              fill
              className="rounded-lg object-cover"
            />
            <DotLottieReact />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageContainer;
