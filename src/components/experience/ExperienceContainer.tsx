"use client";

import React from "react";
import ExperienceRibbon from "./ExperienceRibbon";
import BrandsContainer from "./BrandsContainer";
import WorkExperienceContainer from "./WorkExperienceContainer";

const ExperienceContainer = () => {
  return (
    <div className="min-h-screen bg-[#fff6db] pb-10">
      <ExperienceRibbon />
      <div className="experience-columns-wrapper flex h-full flex-col xl:flex-row">
        <BrandsContainer />
        <WorkExperienceContainer />
      </div>
    </div>
  );
};

export default ExperienceContainer;
