import localFont from "next/font/local";
import Hero from "@/components/Hero";
import ExperienceSection from "@/components/experience-section/ExperienceSection";

export const electroharmonix = localFont({
  src: "../app/fonts/Electroharmonix.otf",
});

export const nuku = localFont({
  src: "../app/fonts/nuku1.ttf",
});

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      <Hero />
      <ExperienceSection />
      <div className="h-screen"></div>
    </div>
  );
}
