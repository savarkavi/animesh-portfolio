import { useGSAP } from "@gsap/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

type ExperienceData = {
  type: string;
  title: string;
  description: string;
  time: string;
  imgOneSrc: string;
  imgTwoSrc: string;
};

type ExperienceImagesProps = {
  item: ExperienceData;
  idx: number;
};

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ExperienceImages = ({ item, idx }: ExperienceImagesProps) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  useGSAP(() => {
    if (!isMobile) return;

    const imageContainers =
      gsap.utils.toArray<HTMLDivElement[]>(".image-container");

    imageContainers.forEach((item, i) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 95%",
          },
        })
        .to(item, { opacity: 1, y: 50 });
    });
  });

  return (
    <div
      key={item.title}
      className={`image-container flex h-[500px] w-full translate-y-[100px] items-center justify-center opacity-0 xl:absolute xl:top-1/2 xl:left-0 xl:h-auto xl:-translate-y-0 image-container-${idx + 1}`}
    >
      <div
        className={
          "absolute top-[55%] left-[35%] hidden h-[400px] w-[300px] -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-lg border border-black shadow-2xl md:block 2xl:h-[500px] 2xl:w-[400px]"
        }
      >
        {/* <DotLottieReact
          src="/anime.lottie"
          loop
          autoplay
          className="absolute -top-12 left-8 h-[120px] w-[120px] -translate-1/2"
        /> */}
        <Image
          src={item.imgOneSrc}
          alt="image"
          fill
          className="rounded-lg object-cover"
          priority
        />
      </div>
      <div
        className={
          "relative h-[400px] w-[300px] rounded-lg border border-black shadow-2xl md:absolute md:top-[50%] md:left-[65%] md:-translate-1/2 md:rotate-12 2xl:h-[500px] 2xl:w-[400px]"
        }
      >
        <Image
          src={item.imgTwoSrc}
          alt="image"
          fill
          className="rounded-lg object-cover"
          priority
        />
        {/* <DotLottieReact
          src="/anime.lottie"
          loop
          autoplay
          className="absolute -top-8 left-6 -z-10 h-[100px] w-[100px] -translate-1/2 md:hidden md:h-[200px] md:w-[200px]"
        />
        <DotLottieReact
          src="/lightning.lottie"
          loop
          autoplay
          className="absolute right-0 bottom-0 z-10 h-[100px] w-[100px] translate-1/2 md:h-[200px] md:w-[200px]"
        /> */}
      </div>
    </div>
  );
};

export default ExperienceImages;
