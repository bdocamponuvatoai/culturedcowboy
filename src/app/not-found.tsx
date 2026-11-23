import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Sparkle } from "@/components/ui/icon";
import { ButtonLink, TextLink } from "@/components/ui/links";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `Page not found | ${site.name}` },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container not-found__inner">
        <Sparkle size={40} className="not-found__star" />
        <Eyebrow>A LITTLE OFF THE TRAIL</Eyebrow>
        <h1>
          Let’s get you <em>back to the good stuff.</em>
        </h1>
        <p className="lead">That page isn’t in this collection.</p>
        <div className="actions actions--center">
          <ButtonLink href="/shop/" arrow>
            Explore the collection
          </ButtonLink>
          <TextLink href="/">Back to home</TextLink>
        </div>
      </div>
    </section>
  );
}
