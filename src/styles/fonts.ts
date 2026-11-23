import { Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";

// Both faces are SIL Open Font License and self-hosted: next/font downloads Instrument Serif
// at build time and serves it from this site, so no request goes to Google at runtime.

/** Text face: DM Sans variable (see src/assets/fonts/OFL.txt). */
export const dmSans = localFont({
  src: "../assets/fonts/dm-sans-variable.ttf",
  weight: "400 700",
  style: "normal",
  display: "swap",
  variable: "--font-dm-sans",
});

/** Display face for headlines; the italic carries the brass accent lines. */
export const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});
