import { experienceData } from "@/utils/constants";
import { useGSAP } from "@gsap/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import gsap from "gsap";
import Image from "next/image";
import React from "react";
import { useMediaQuery } from "usehooks-ts";
import ExperienceImages from "./ExperienceImages";

gsap.registerPlugin(useGSAP);

const ImageContainer = ({ currExpItem }: { currExpItem?: number }) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  useGSAP(() => {
    if (isMobile) return;

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
    <div className="relative hidden flex-1 items-center justify-center xl:flex">
      {experienceData.map((item, i) => (
        <ExperienceImages item={item} key={item.title} idx={i} />
      ))}
    </div>
  );
};

export default ImageContainer;
