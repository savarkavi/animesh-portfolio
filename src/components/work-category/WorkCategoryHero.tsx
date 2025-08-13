import React from "react";
import { FaArrowDown } from "react-icons/fa";
import PreloadImage from "../PreloadImage";

const WorkCategoryHero = ({ category }: { category: string }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-red-500">
      <div
        className={`relative flex h-full w-full items-center justify-center text-3xl uppercase sm:text-5xl xl:flex-[60%] 2xl:text-[12rem]`}
      >
        <div className="flex w-full flex-col gap-2 px-4 uppercase">
          <p className={`text-center leading-50 text-white uppercase`}>
            {category.split("-").join(" ")}
          </p>
        </div>
        <div className="flex h-full w-[60px] flex-col items-center justify-between bg-white pt-8 pb-20 text-xl text-black 2xl:w-[100px] 2xl:text-3xl">
          <FaArrowDown />
          <p className="-rotate-90">Scroll</p>
        </div>
      </div>
      <div className="hidden h-full flex-[40%] shrink-0 items-center justify-center xl:flex">
        <div className="relative h-screen w-full">
          <PreloadImage
            src="/featured-work-img8.heic"
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
