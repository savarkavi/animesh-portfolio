"use client";

import React from "react";
import RibbonMarquee from "./RibbonMarquee";
import BrandsContainer from "./BrandsContainer";
import WorkExperienceContainer from "./WorkExperienceContainer";

const ExperienceContainer = () => {
  return (
    <div className="min-h-screen bg-[#fff6db] pb-10">
      <RibbonMarquee text="Experience" />
      <div className="experience-columns-wrapper flex h-full flex-col xl:flex-row">
        <WorkExperienceContainer />
        <BrandsContainer />
      </div>
    </div>
  );
};

export default ExperienceContainer;
