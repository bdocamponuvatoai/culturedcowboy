import { ContactCta } from "@/components/sections/contact-cta";
import { CraftFeature } from "@/components/sections/craft-feature";
import { PageIntro } from "@/components/sections/page-intro";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { ButtonLink, TextLink } from "@/components/ui/links";
import { pageMetadata } from "@/lib/metadata";

const lead =
  "A little information helps us give you better guidance. Start with what you wear now, and we’ll talk through the rest.";

export const metadata = pageMetadata({
  title: "Finding your fit",
  path: "/fit-guide/",
  description: lead,
});

export default function FitGuidePage() {
  return (
    <>
      <PageIntro
        eyebrow="FINDING YOUR FIT"
        title={
          <>
            Looks like you. <em>Feels right, too.</em>
          </>
        }
        lead={lead}
      />
      <CraftFeature
        alt="AI-generated illustrative image of a hat being shaped"
        eyebrow="HATS & PERSONAL SHAPING"
        heading={
          <>
            A shape <em>of your own.</em>
          </>
        }
      >
        <p>
          Bring a hat that already fits, or tell us the size printed inside it.
          Share the crown and brim shapes you like. Our team can talk you
          through sizing and shaping options.
        </p>
        <p>
          Styles and materials differ, so confirm the details before ordering a
          particular hat.
        </p>
        <div className="actions">
          <ButtonLink href="/collections/hats/" arrow>
            Explore felt hats
          </ButtonLink>
        </div>
      </CraftFeature>
      <section className="section">
        <div className="container guide-grid">
          <article className="guide-card reveal">
            <Icon name="ruler" size={26} />
            <Eyebrow>WESTERN BOOTS</Eyebrow>
            <h2>More than a number.</h2>
            <p>
              Tell us your usual shoe or boot size, width if known, and a brand
              that fits you comfortably. Mention anything you tend to look
              for—extra room, a particular toe shape, or a different heel.
            </p>
            <p>
              Size and fit can vary by maker and style. Your preference is a
              starting point for a conversation, not a guaranteed fit.
            </p>
            <TextLink href="/collections/boots/">Find your next pair</TextLink>
          </article>
          <article className="guide-card reveal">
            <Icon name="users" size={26} />
            <Eyebrow>LEATHER &amp; WESTERN WEAR</Eyebrow>
            <h2>Room to be yourself.</h2>
            <p>
              Share your usual jacket or shirt size and how you like to wear it.
              If you plan to layer underneath a jacket, let the store know.
              Mention a regular or long fit preference if you have one.
            </p>
            <p>
              The store can help you check the details for the specific style
              you’re considering.
            </p>
            <TextLink href="/collections/leather/">
              Explore the leather collection
            </TextLink>
          </article>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
