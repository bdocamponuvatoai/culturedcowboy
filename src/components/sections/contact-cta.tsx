import { Eyebrow } from "@/components/ui/eyebrow";
import { Sparkle } from "@/components/ui/icon";
import { ButtonLink, TextLink } from "@/components/ui/links";
import { site } from "@/config/site";

export function ContactCta() {
  return (
    <section className="cta-band on-night">
      <div className="container cta-band__inner">
        <div>
          <Eyebrow>GOOD PEOPLE. GOOD CONVERSATION.</Eyebrow>
          <h2>
            Let’s find <em>your kind of fit.</em>
          </h2>
        </div>
        <div className="cta-band__aside">
          <p>
            A favorite maker. An unusual size. Something you’ve been looking
            for. We’d love to hear about it.
          </p>
          <div className="cta-band__actions">
            <ButtonLink variant="light" href={`tel:${site.phone.tel}`}>
              {`Call ${site.phone.display}`}
            </ButtonLink>
            <TextLink href="/visit/">Come see us in Greenwood</TextLink>
          </div>
        </div>
      </div>
      <Sparkle className="cta-band__star" size={220} />
    </section>
  );
}
