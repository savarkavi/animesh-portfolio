import React from "react";
import { FaArrowDown } from "react-icons/fa";
import PreloadImage from "../PreloadImage";

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
    <div className="flex h-screen overflow-hidden bg-red-500">
      <div
        className={`relative flex h-full w-full items-center justify-center uppercase`}
      >
        <div className="flex items-center justify-center gap-2 px-4 text-3xl uppercase sm:text-5xl xl:flex-[60%] 2xl:text-[12rem]">
          <p
            className={`w-full max-w-[800px] text-center leading-50 break-all hyphens-auto text-white uppercase`}
          >
            {category.label.split("-").join(" ")}
          </p>
        </div>
        <div className="flex h-full w-[60px] flex-col items-center justify-between bg-white pt-8 pb-20 text-xl text-black 2xl:w-[90px] 2xl:text-3xl">
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
