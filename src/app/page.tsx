import { Hero } from "@/components/home/hero";
import {
  BrandBand,
  CollectionsSection,
  FeaturedProducts,
  RoadFeature,
  ShoppingGuide,
  ValueStrip,
  VisitTeaser,
} from "@/components/home/home-sections";
import { ContactCta } from "@/components/sections/contact-cta";
import { CraftFeature } from "@/components/sections/craft-feature";
import { FaqSection } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink, TextLink } from "@/components/ui/links";
import { siteUrl } from "@/config/deployment";
import { site } from "@/config/site";
import { faqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ path: "/" });

const storeJsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: site.name,
  url: `${siteUrl}/`,
  telephone: site.phone.tel,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <CollectionsSection />
      <BrandBand />
      <FeaturedProducts />
      <CraftFeature
        alt="Illustrative close-up of a hat fitter shaping a chocolate felt Western hat"
        eyebrow="THE RIGHT FIT IS PERSONAL"
        heading={
          <>
            A little shaping. <em>A lot of character.</em>
          </>
        }
      >
        <p>
          A hat should feel like yours from the moment you put it on. We offer
          hat shaping and personal fit guidance to help you find the shape,
          size, and style that feel right.
        </p>
        <p>Tell us what you have in mind. We’ll take it from there.</p>
        <div className="actions">
          <ButtonLink href="/fit-guide/" arrow>
            Find your fit
          </ButtonLink>
          <TextLink href="/visit/">Visit the store</TextLink>
        </div>
      </CraftFeature>
      <ShoppingGuide />
      <RoadFeature />
      <VisitTeaser />
      <FaqSection
        eyebrow="BEFORE YOU SADDLE UP"
        heading={
          <>
            A few good <em>questions.</em>
          </>
        }
        items={faqs}
      >
        <TextLink href="/how-to-order/">More about ordering</TextLink>
      </FaqSection>
      <ContactCta />
      <JsonLd data={storeJsonLd} />
    </>
  );
}
