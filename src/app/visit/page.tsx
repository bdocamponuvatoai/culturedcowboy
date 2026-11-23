import { PageIntro } from "@/components/sections/page-intro";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon, Sparkle } from "@/components/ui/icon";
import { ButtonLink, TextLink } from "@/components/ui/links";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

const lead =
  "Stop by, give us a call, or send a note. There’s a real person at the other end.";

export const metadata = pageMetadata({
  title: "Visit & contact",
  path: "/visit/",
  description: lead,
});

export default function VisitPage() {
  return (
    <>
      <PageIntro
        eyebrow="GREENWOOD, SOUTH CAROLINA"
        title={
          <>
            Good to <em>have you here.</em>
          </>
        }
        lead={lead}
      />
      <section className="section visit">
        <div className="container visit__grid">
          <div className="visit-place on-night">
            <div className="visit-place__map" aria-hidden="true">
              <Sparkle size={56} className="visit-place__star" />
              <span className="visit-place__town">GREENWOOD</span>
              <span className="micro">SOUTH CAROLINA</span>
              <span className="visit-place__motto micro">
                WESTERN ROOTS · OPEN ROAD SPIRIT
              </span>
            </div>
            <div className="visit-place__body">
              <Eyebrow>CULTURED COWBOY WESTERN &amp; BIKER</Eyebrow>
              <h2>
                {site.address.street}
                <br />
                {site.address.cityLine}
              </h2>
              <p>
                Call ahead for current store hours, directions, or help with a
                particular item.
              </p>
              <ButtonLink
                variant="light"
                href={site.directionsUrl}
                target="_blank"
                rel="noreferrer"
                arrow
              >
                Open in Google Maps
              </ButtonLink>
            </div>
          </div>
          <div className="contact-list">
            <article className="contact-item">
              <Icon name="phone" size={22} />
              <div>
                <Eyebrow>LET’S TALK</Eyebrow>
                <h2 className="contact-item__value">
                  <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>
                </h2>
                <p>
                  Questions about fit, a current style, or an order? Call the
                  store and talk it through.
                </p>
              </div>
            </article>
            <article className="contact-item">
              <Icon name="mail" size={22} />
              <div>
                <Eyebrow>DROP US A LINE</Eyebrow>
                <a
                  className="contact-item__value contact-item__email"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
                <p>
                  Include the brand, style, and size you’re interested in.
                  Please leave payment details out of your email.
                </p>
              </div>
            </article>
            <article className="contact-item">
              <Icon name="shopping-bag" size={22} />
              <div>
                <Eyebrow>BRING A FEW IDEAS</Eyebrow>
                <h3 className="contact-item__title">
                  Your next favorite starts here.
                </h3>
                <p>
                  Save products to your picks and prepare a ready-to-send
                  inquiry before you get in touch.
                </p>
                <TextLink href="/shop/">Browse the collection</TextLink>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
