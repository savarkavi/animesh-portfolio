import React from "react";
import { FaArrowDown } from "react-icons/fa";
import PreloadImage from "../PreloadImage";
import TextAnimationWrapper from "../TextAnimationWrapper";

interface WorkCategoryHeroProps {
  category: {
    label: string;
    coverImg: string;
    media: {
      label: string;
      src: string;
    }[];
  };
}

const WorkCategoryHero = ({ category }: WorkCategoryHeroProps) => {
  return (
    <div className="flex h-dvh overflow-hidden bg-red-500">
      <div
        className={`relative flex h-full w-full flex-[60%] items-center justify-between uppercase`}
      >
        <div className="relative w-full px-4 text-3xl uppercase sm:text-6xl 2xl:text-9xl">
          <TextAnimationWrapper
            text={category.label.split("-").join(" ")}
            className="w-full text-center leading-16 text-white uppercase sm:leading-20 xl:leading-36"
          />
        </div>
        <div className="flex h-full w-[60px] flex-col items-center justify-between bg-white pt-20 pb-20 text-xl text-black md:pt-8 2xl:w-[90px] 2xl:text-3xl">
          <FaArrowDown />
          <p className="-rotate-90">Scroll</p>
        </div>
      </div>
      <div className="hidden h-full flex-[40%] shrink-0 items-center justify-center xl:flex">
        <div className="relative h-screen w-full">
          <PreloadImage
            src={category.coverImg}
            alt="img"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default WorkCategoryHero;
