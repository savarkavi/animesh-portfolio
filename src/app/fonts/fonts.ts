import { Zen_Old_Mincho, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";

export const electroharmonix = localFont({
  src: "./Electroharmonix.otf",
  variable: "--font-electroharmonix",
});

export const nuku = localFont({
  src: "./nuku1.ttf",
  variable: "--font-nuku",
});

export const zenOldMincho = Zen_Old_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const adeDisplay = localFont({
  src: "./Ade-Display.otf",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
});
