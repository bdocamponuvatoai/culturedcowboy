import { ContactCta } from "@/components/sections/contact-cta";
import { CraftFeature } from "@/components/sections/craft-feature";
import { PageIntro } from "@/components/sections/page-intro";
import { EditorialImage, ImageLabel } from "@/components/ui/editorial-image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink, TextLink } from "@/components/ui/links";
import { pageMetadata } from "@/lib/metadata";

const lead =
  "A place for people who know what they like—and people still finding their own kind of style.";

export const metadata = pageMetadata({
  title: "Our story",
  path: "/about/",
  description: lead,
});

export default function AboutPage() {
  return (
    <>
      <PageIntro
        align="center"
        eyebrow="CULTURED COWBOY · GREENWOOD, SOUTH CAROLINA"
        title={
          <>
            Western roots. <em>No fences.</em>
          </>
        }
        lead={lead}
      />
      <div className="banner-image">
        <EditorialImage
          name="western"
          alt="AI-generated editorial image of a Western rider with her horse"
        />
        <ImageLabel />
      </div>
      <section className="section">
        <div className="container split story">
          <div className="reveal">
            <Eyebrow>OUR STORY</Eyebrow>
            <h2>
              A store with <em>a point of view.</em>
            </h2>
          </div>
          <div className="story__body reveal">
            <p className="story__lede">
              Western boots and felt hats. Motorcycle leather and everyday
              shirts. At Cultured Cowboy, these things belong together. They’re
              made for people with an independent spirit.
            </p>
            <p>
              Our Greenwood store brings Western and biker wear under one roof.
              The CC Rider side of the business speaks to life on two wheels;
              our Western collection stays close to the boots, hats, and
              clothing that started the story.
            </p>
            <p>
              There’s a reason personal service is still at the heart of how we
              work. Two boots with the same size on the box can feel different.
              A hat’s shape can change everything. A conversation helps us get
              closer to what’s right for you.
            </p>
            <TextLink href="/visit/">Come meet us in Greenwood</TextLink>
          </div>
        </div>
      </section>
      <CraftFeature
        alt="Illustrative close-up of Western hat shaping"
        eyebrow="THE DETAILS MAKE IT PERSONAL"
        heading={
          <>
            More than <em>what’s on the shelf.</em>
          </>
        }
      >
        <p>
          Personal fit guidance. Hat shaping. Help finding a particular style.
          Bring your questions and tell us what you’re looking for.
        </p>
        <p>
          This online selection is just an introduction. For other brands,
          specialty items, or something a little harder to find, call the store.
        </p>
        <div className="actions">
          <ButtonLink href="/shop/" arrow>
            Discover the collection
          </ButtonLink>
        </div>
      </CraftFeature>
      <ContactCta />
    </>
  );
}
