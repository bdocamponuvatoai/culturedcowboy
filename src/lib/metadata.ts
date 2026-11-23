import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import heroImage from "@/assets/images/editorial/western.webp";
import { site } from "@/config/site";

type PageMetadataInput = {
  /** Page title without the site suffix; omit for the home page. */
  title?: string;
  /** Route path with trailing slash, e.g. "/about/". */
  path: string;
  description?: string;
  image?: { src: StaticImageData; alt: string };
};

const defaultImage = {
  src: heroImage,
  alt: "Illustrative Western lifestyle: a rider and her horse in a sunlit pasture",
};

/** Title, description, canonical URL and Open Graph for one page. URLs resolve against metadataBase. */
export function pageMetadata({
  title,
  path,
  description = site.description,
  image = defaultImage,
}: PageMetadataInput): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : site.defaultTitle;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
      images: [
        {
          url: image.src.src,
          width: image.src.width,
          height: image.src.height,
          alt: image.alt,
        },
      ],
    },
  };
}
