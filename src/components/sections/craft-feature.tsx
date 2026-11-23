import type { ReactNode } from "react";
import { EditorialImage, ImageLabel } from "@/components/ui/editorial-image";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { EditorialName } from "@/content/editorial";

type EditorialSplitProps = {
  image?: EditorialName;
  alt: string;
  eyebrow: string;
  heading: ReactNode;
  children: ReactNode;
  reverse?: boolean;
};

/** Full-bleed split: an editorial photograph beside copy and calls to action. */
export function CraftFeature({
  image = "craft",
  alt,
  eyebrow,
  heading,
  children,
  reverse,
}: EditorialSplitProps) {
  return (
    <section
      className={`editorial-split${reverse ? " editorial-split--reverse" : ""}`}
    >
      <div className="editorial-split__media">
        <EditorialImage
          name={image}
          alt={alt}
          sizes="(max-width: 900px) 100vw, 50vw"
        />
        <ImageLabel />
      </div>
      <div className="editorial-split__copy reveal">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{heading}</h2>
        <div className="editorial-split__body">{children}</div>
      </div>
    </section>
  );
}
