import Hero from "@/components/Hero";
import FeaturedWorkSection from "@/components/featured-work-section/FeaturedWorkSection";
import ExperienceContainer from "@/components/experience/ExperienceContainer";
import BrowseBycategorySection from "@/components/browse-by-category/BrowseBycategorySection";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden text-white">
      <Hero />
      <ExperienceContainer />
      <FeaturedWorkSection />
      <BrowseBycategorySection />
    </div>
  );
}
