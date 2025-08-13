import Hero from "@/components/Hero";
import FeaturedWorkSection from "@/components/featured-work-section/FeaturedWorkSection";
import ExperienceContainer from "@/components/experience/ExperienceContainer";

export default function Home() {
  return (
    <div className="z-10 min-h-screen overflow-hidden">
      <Hero />
      <ExperienceContainer />
      <FeaturedWorkSection />
      <div className="h-screen"></div>
    </div>
  );
}
