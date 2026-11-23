import type { StaticImageData } from "next/image";
import biker from "@/assets/images/editorial/biker.webp";
import biker720 from "@/assets/images/editorial/biker-720.webp";
import craft from "@/assets/images/editorial/craft.webp";
import craft720 from "@/assets/images/editorial/craft-720.webp";
import western from "@/assets/images/editorial/western.webp";
import western720 from "@/assets/images/editorial/western-720.webp";

// AI-generated editorial scenes (not the store, its staff or its stock), each with
// a 720px and an 1800px variant for the responsive srcset.
export type EditorialName = "western" | "biker" | "craft";

export const editorialImages: Record<
  EditorialName,
  { full: StaticImageData; small: StaticImageData }
> = {
  western: { full: western, small: western720 },
  biker: { full: biker, small: biker720 },
  craft: { full: craft, small: craft720 },
};
