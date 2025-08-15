import CategoryMedia from "@/components/work-category/CategoryMedia";
import WorkCategoryHero from "@/components/work-category/WorkCategoryHero";
import { workCategoriesData } from "@/utils/constants";
import React from "react";

const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;

  const currentCategory = workCategoriesData.find(
    (item) => item.label.toLowerCase().split(" ").join("-") === category,
  );

  if (!currentCategory) return null;

  return (
    <div className="min-h-screen">
      <WorkCategoryHero category={currentCategory} />
      <CategoryMedia media={currentCategory.media} />
    </div>
  );
};

export default Page;
