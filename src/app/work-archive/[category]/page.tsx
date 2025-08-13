import CategoryMedia from "@/components/work-category/CategoryMedia";
import WorkCategoryHero from "@/components/work-category/WorkCategoryHero";
import React from "react";

const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;

  return (
    <div className="min-h-screen">
      <WorkCategoryHero category={category} />
      <CategoryMedia />
      <div className="h-screen"></div>
    </div>
  );
};

export default Page;
