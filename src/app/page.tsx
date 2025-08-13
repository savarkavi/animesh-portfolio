import localFont from "next/font/local";
import Hero from "@/components/Hero";
import FeaturedWorkSection from "@/components/featured-work-section/FeaturedWorkSection";
import ExperienceContainer from "@/components/experience/ExperienceContainer";

export const electroharmonix = localFont({
  src: "../app/fonts/Electroharmonix.otf",
});

export const nuku = localFont({
  src: "../app/fonts/nuku1.ttf",
});

const Home = () => {
  return (
    <div className="z-10 min-h-screen overflow-hidden">
      <Hero />
      <ExperienceContainer />
      <FeaturedWorkSection />
      <div className="h-screen"></div>
    </div>
  );
};

export default Home;
