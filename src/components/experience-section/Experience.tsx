import { experienceData } from "@/utils/constants";
import React from "react";
import { MdCircle } from "react-icons/md";
import { GiPolarStar } from "react-icons/gi";
import ImageContainer from "./ImageContainer";
import ExperienceImages from "./ExperienceImages";

const Experience = () => {
  return (
    <div className="relative flex-1 border-dashed border-black px-6 text-black xl:border-l xl:py-0 2xl:py-16">
      <div className="scroll-progress absolute top-0 left-0 h-0 w-[2px] -translate-x-1/2 bg-black">
        <GiPolarStar className="star invisible absolute bottom-0 left-0 size-8 -translate-x-1/2 translate-y-1/2" />
      </div>
      <div className="flex flex-col">
        {experienceData.map((item, i) => (
          <div
            key={item.title}
            className={`relative flex flex-col experienceItem-${i + 1} px-2 py-16 lg:px-8 xl:py-10 2xl:py-16 ${i !== 0 && "xl:opacity-50"} ${i !== experienceData.length - 1 && "border-b border-dashed border-black"}`}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-start gap-4 lg:justify-between 2xl:flex-row 2xl:gap-10">
                <p className="text-3xl capitalize lg:text-5xl xl:text-3xl 2xl:text-5xl">
                  {item.title}
                </p>
                <div className="flex shrink-0 items-center gap-3 text-sm text-gray-500 md:text-base">
                  <p>{item.type}</p>
                  <MdCircle className="size-2" />
                  <p>{item.time}</p>
                </div>
              </div>
              <p className="mt-6 w-full max-w-[500px] text-lg lg:mt-0">
                {item.description}
              </p>
            </div>
            <div className="xl:hidden">
              <ExperienceImages item={item} idx={i} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
