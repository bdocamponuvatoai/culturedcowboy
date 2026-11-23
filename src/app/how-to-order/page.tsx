import { ContactCta } from "@/components/sections/contact-cta";
import { FaqSection } from "@/components/sections/faq-section";
import { PageIntro } from "@/components/sections/page-intro";
import { Eyebrow } from "@/components/ui/eyebrow";
import { TextLink } from "@/components/ui/links";
import { site } from "@/config/site";
import { faqs } from "@/content/faqs";
import { pageMetadata } from "@/lib/metadata";

const lead =
  "Find something you love, then let’s make sure the details work for you.";

export const metadata = pageMetadata({
  title: "How to order",
  path: "/how-to-order/",
  description: lead,
});

export default function HowToOrderPage() {
  return (
    <>
      <PageIntro
        eyebrow="BROWSE ONLINE. GET IT RIGHT TOGETHER."
        title={
          <>
            A little personal <em>goes a long way.</em>
          </>
        }
        lead={lead}
      />
      <section className="section section--tint">
        <div className="container">
          <ol className="steps steps--cards" role="list">
            <li className="step reveal">
              <span className="step__num">01</span>
              <Eyebrow>EXPLORE</Eyebrow>
              <h2 className="step__title">Find your favorites.</h2>
              <p>
                Browse boots, hats, leather, and Western wear. Open a product to
                see its details, add your preferred color and size, and save it
                to your picks.
              </p>
              <TextLink href="/shop/">Explore the collection</TextLink>
            </li>
            <li className="step reveal">
              <span className="step__num">02</span>
              <Eyebrow>GET IN TOUCH</Eyebrow>
              <h2 className="step__title">Talk it through.</h2>
              <p>
                From your picks, prepare an email with all your selections. Your
                email app opens so you can review and send it. You can also copy
                or download your inquiry, or simply call us.
              </p>
              <TextLink href={`tel:${site.phone.tel}`}>
                {site.phone.display}
              </TextLink>
            </li>
            <li className="step reveal">
              <span className="step__num">03</span>
              <Eyebrow>CONFIRM</Eyebrow>
              <h2 className="step__title">Make a good choice.</h2>
              <p>
                The store confirms price, availability, sizing, and fulfillment
                options. Discuss payment, any shipping costs, and the applicable
                return or exchange terms before agreeing to an order.
              </p>
              <TextLink href="/visit/">Contact the store</TextLink>
            </li>
          </ol>
        </div>
      </section>
      <section className="section">
        <div className="container note-panel reveal">
          <h2>
            A bag of <em>possibilities.</em>
          </h2>
          <p>
            Your picks are a saved inquiry list. Adding an item does not
            purchase or reserve it. This preview does not accept payment or
            place orders, and it does not show live stock. Send inquiries
            through your own email app or contact the store directly.
          </p>
        </div>
      </section>
      <FaqSection
        eyebrow="GOOD TO KNOW"
        heading="Before you order."
        items={faqs}
      />
      <ContactCta />
    </>
  );
}
