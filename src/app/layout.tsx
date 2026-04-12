import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReactLenis from "lenis/react";
import IntroOverlay from "@/components/IntroOverlay";
import { MediaLoadingProvider } from "@/context/MediaLoadingContext";
import ScrollToTop from "@/components/ScrollToTop";

export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Animesh Sharma",
  description: "Animesh Sharma | Digital and visual designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MediaLoadingProvider>
        <ReactLenis root>
          <body className={`${interTight.className} antialiased`}>
            <IntroOverlay />
            <div
              className="fixed top-0 left-0 z-[999] h-screen w-screen"
              style={{
                backgroundImage: "url('/grainy-effect.webp')",
                mixBlendMode: "hard-light",
                opacity: 0.06,
                pointerEvents: "none",
              }}
            ></div>
            <div className="relative z-[99]">
              <Header />
              {children}
              <ScrollToTop />
            </div>
            <div className="-z-10 h-screen"></div>
            <Footer />
          </body>
        </ReactLenis>
      </MediaLoadingProvider>
    </html>
  );
}
