import { experienceData } from "@/utils/constants";
import React from "react";
import { MdCircle } from "react-icons/md";
import { GiPolarStar } from "react-icons/gi";

const Experience = () => {
  return (
    <div className="relative flex-1 border-l border-dashed border-black px-6 py-16 text-black">
      <div className="scroll-progress absolute top-0 left-0 h-0 w-[2px] -translate-x-1/2 bg-black">
        <GiPolarStar className="star invisible absolute bottom-0 left-0 size-8 -translate-x-1/2 translate-y-1/2" />
      </div>
      <div className="flex flex-col">
        {experienceData.map((item, i) => (
          <div
            key={item.title}
            className={`experienceItem-${i + 1} flex items-start justify-between gap-10 px-8 py-16 ${i !== 0 && "opacity-50"} ${i !== experienceData.length - 1 && "border-b border-dashed border-black"}`}
          >
            <div className="flex flex-col gap-6">
              <p className="text-5xl capitalize">{item.title}</p>
              <p className="max-w-[500px] text-lg">{item.description}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <p>{item.type}</p>
              <MdCircle className="size-2" />
              <p>{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
