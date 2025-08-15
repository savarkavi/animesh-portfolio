import React from "react";
import TextAnimationWrapper from "../TextAnimationWrapper";
import CategoriesContainer from "./CategoriesContainer";
import Link from "next/link";

const BrowseBycategorySection = () => {
  return (
    <div className="flex w-full flex-col justify-between gap-16 bg-[#0099ff] pt-40">
      <div className="flex flex-col items-center justify-between overflow-hidden px-12 md:flex-row">
        <TextAnimationWrapper
          text="Browse categories"
          className="text-center text-4xl uppercase xl:text-7xl"
        />
        <Link href="/work-archive" className="text-base uppercase md:text-xl">
          Explore All
        </Link>
      </div>
      <CategoriesContainer />
    </div>
  );
};

export default BrowseBycategorySection;
