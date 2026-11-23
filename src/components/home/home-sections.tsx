import Image from "next/image";
import Link from "next/link";
import cinchLogo from "@/assets/images/brands/cinch.gif";
import schottLogo from "@/assets/images/brands/schott.gif";
import stetsonLogo from "@/assets/images/brands/stetson.jpg";
import { EditorialImage, ImageLabel } from "@/components/ui/editorial-image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon, Sparkle, type IconName } from "@/components/ui/icon";
import { ButtonLink, TextLink } from "@/components/ui/links";
import { ProductCard } from "@/components/ui/product-card";
import { site } from "@/config/site";
import { collections, products } from "@/content/catalog";

// Every line below is drawn from copy already on the site (home, about, how to order).
const VALUES: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "shopping-bag",
    title: "Western & biker, under one roof",
    body: "Western boots and felt hats. Motorcycle leather and everyday shirts.",
  },
  {
    icon: "ruler",
    title: "Personal fit guidance",
    body: "Hat shaping and help finding the shape, size, and style that feel right.",
  },
  {
    icon: "message-circle",
    title: "A real person to talk to",
    body: "Email your selections or give us a call. We’ll confirm fit, current pricing, and availability.",
  },
  {
    icon: "map-pin",
    title: "Greenwood, South Carolina",
    body: `Visit us at ${site.address.street}. Call ahead for current hours.`,
  },
];

export function ValueStrip() {
  return (
    <section className="values" aria-label="Why shop with Cultured Cowboy">
      <h2 className="visually-hidden">Why shop with Cultured Cowboy</h2>
      <div className="container values__grid">
        {VALUES.map((v) => (
          <div key={v.title} className="value">
            <Icon name={v.icon} size={22} />
            <div>
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CollectionsSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <Eyebrow>FIND YOUR KIND OF CLASSIC</Eyebrow>
            <h2>
              Worn <em>your way.</em>
            </h2>
            <p>
              Boots, hats, leather, and a little character. Find the pieces
              you’ll reach for every day.
            </p>
          </div>
          <TextLink href="/shop/">Shop all</TextLink>
        </div>
        <div className="category-grid">
          {collections.map((c, i) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}/`}
              className={`category-tile category-tile--${c.slug}`}
            >
              <span className="category-tile__stage">
                <Image src={c.image} alt="" />
              </span>
              <span className="category-tile__label">
                <span className="category-tile__index micro">{`0${i + 1}`}</span>
                <span className="category-tile__name">{c.name}</span>
                <span className="category-tile__line">{c.line}</span>
              </span>
              <span className="category-tile__arrow">
                <Icon name="arrow-up-right" size={20} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const LOGOS = [
  {
    key: "stetson",
    node: <Image src={stetsonLogo} alt="Stetson" width={200} height={75} />,
  },
  { key: "watson", node: <span className="marquee__wordmark">R. WATSON</span> },
  {
    key: "schott",
    node: <Image src={schottLogo} alt="Schott NYC" width={200} height={75} />,
  },
  {
    key: "cinch",
    node: <Image src={cinchLogo} alt="Cinch" width={200} height={75} />,
  },
];

export function BrandBand() {
  return (
    <section className="brands" aria-label="Selected brands in the catalogue">
      <div className="container brands__inner">
        <p className="brands__intro">
          Names we know. <em>Details you’ll appreciate.</em>
        </p>
        <div className="marquee">
          <div className="marquee__track">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="marquee__group"
                aria-hidden={copy === 1 ? "true" : undefined}
              >
                {LOGOS.map((l) => (
                  <span key={l.key} className="marquee__item">
                    {l.node}
                    <Sparkle size={10} className="marquee__dot" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  return (
    <section className="section section--tint">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <Eyebrow>FROM THE CULTURED COWBOY CATALOGUE</Eyebrow>
            <h2>
              Meet the <em>mainstays.</em>
            </h2>
          </div>
          <TextLink href="/shop/">Shop the collection</TextLink>
        </div>
        <div className="product-grid">
          {products
            .filter((p) => p.featured)
            .map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
        </div>
        <p className="catalogue-note">
          A selection from our original catalogue. Ask us for current pricing,
          sizes, and availability.
        </p>
      </div>
    </section>
  );
}

const STEPS = [
  {
    title: "Make a few picks.",
    body: "Explore the collection and save your favorites to your bag. Add your size and color preferences.",
  },
  {
    title: "Let’s talk details.",
    body: "Email your selections or give us a call. We’ll confirm fit, current pricing, and availability.",
  },
  {
    title: "Choose with confidence.",
    body: "Agree on the order and fulfillment details with the store before making a purchase.",
  },
];

export function ShoppingGuide() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <Eyebrow>A BETTER WAY TO GET IT RIGHT</Eyebrow>
            <h2>
              Find it here. <em>Make it yours.</em>
            </h2>
            <p>
              All the ease of browsing online. All the care of talking to a real
              person.
            </p>
          </div>
          <TextLink href="/how-to-order/">How ordering works</TextLink>
        </div>
        <ol className="steps" role="list">
          {STEPS.map((step, i) => (
            <li key={step.title} className="step reveal">
              <span className="step__num">{`0${i + 1}`}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function RoadFeature() {
  return (
    <section className="road on-night">
      <EditorialImage
        name="biker"
        alt="Illustrative rider and motorcycle on a tree-lined South Carolina road"
      />
      <div className="road__shade" />
      <div className="container road__copy reveal">
        <Eyebrow>CC RIDER · THE BIKER SIDE OF CULTURED COWBOY</Eyebrow>
        <h2>
          Some things get better <em>with miles.</em>
        </h2>
        <ButtonLink variant="light" href="/collections/leather/" arrow>
          Discover the leather collection
        </ButtonLink>
      </div>
      <ImageLabel />
    </section>
  );
}

export function VisitTeaser() {
  return (
    <section className="section">
      <div className="container split visit-teaser">
        <div className="reveal">
          <Eyebrow>A REAL STORE. A WARM WELCOME.</Eyebrow>
          <h2>
            A South Carolina <em>state of mind.</em>
          </h2>
        </div>
        <div className="visit-card reveal">
          <p>
            Come for a pair of boots. Stay for a conversation. From Western wear
            to motorcycle leather, there’s more to discover in our Greenwood
            store.
          </p>
          <address className="visit-card__address">
            <Icon name="map-pin" size={20} />
            <span>
              {site.address.street}
              <br />
              {site.address.cityLine}
            </span>
          </address>
          <p className="visit-card__note">Call ahead for current hours.</p>
          <div className="visit-card__actions">
            <ButtonLink href="/visit/" arrow>
              Plan your visit
            </ButtonLink>
            <ButtonLink
              variant="outline"
              href={site.directionsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Get directions
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
