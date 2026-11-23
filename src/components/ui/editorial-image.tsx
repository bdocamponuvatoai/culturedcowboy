import { getImageProps } from "next/image";
import { editorialImages, type EditorialName } from "@/content/editorial";

type EditorialImageProps = {
  name: EditorialName;
  alt: string;
  priority?: boolean;
  /** Rendered width hint for the srcset choice (half-width split layouts pass a smaller value). */
  sizes?: string;
};

/** Full-bleed editorial photo with 720w/1800w variants, so phones download the small file. */
export function EditorialImage({
  name,
  alt,
  priority = false,
  sizes = "100vw",
}: EditorialImageProps) {
  const { full, small } = editorialImages[name];
  // next/image skips srcset for unoptimized (static export) images, so build it from both variants.
  const { props } = getImageProps({
    src: full,
    alt,
    loading: priority ? "eager" : "lazy",
    fetchPriority: priority ? "high" : "auto",
  });
  return (
    // eslint-disable-next-line @next/next/no-img-element -- needs a hand-built srcset (see above)
    <img
      {...props}
      srcSet={`${small.src} 720w, ${full.src} 1800w`}
      sizes={sizes}
      alt={alt}
    />
  );
}

/** Disclosure shown on every AI-generated editorial image. */
export function ImageLabel() {
  return <span className="image-label">AI-generated editorial imagery</span>;
}
