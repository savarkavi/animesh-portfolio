import Header from "@/components/Header";
import Image from "next/image";
import localFont from "next/font/local";
import Hero from "@/components/Hero";

export const electroharmonix = localFont({
  src: "../app/fonts/Electroharmonix.otf",
});

export const nuku = localFont({
  src: "../app/fonts/nuku1.ttf",
});

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
    </div>
  );
}
