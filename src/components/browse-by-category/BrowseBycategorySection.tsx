import React from "react";
import TextAnimationWrapper from "../TextAnimationWrapper";
import CategoriesContainer from "./CategoriesContainer";
import Link from "next/link";

const BrowseBycategorySection = () => {
  return (
    <div className="flex w-full flex-col justify-between gap-16 bg-[#0099ff] pt-40">
      <div className="flex flex-col items-center justify-between gap-2 overflow-hidden px-12 md:flex-row">
        <TextAnimationWrapper
          text="Browse categories"
          className={`text-center text-5xl font-bold uppercase lg:text-6xl 2xl:text-7xl`}
        />
        <Link
          href="/work-archive"
          className="rounded-full bg-white px-4 py-2 text-sm text-black sm:text-base"
        >
          Explore More →
        </Link>
      </div>
      <CategoriesContainer />
    </div>
  );
};

export default BrowseBycategorySection;
