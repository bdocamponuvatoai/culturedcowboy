import { Catalogue } from "@/components/catalogue/catalogue";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageIntro } from "@/components/sections/page-intro";
import { pageMetadata } from "@/lib/metadata";

const lead =
  "Western classics. Road-ready leather. A few good things to make your own.";

export const metadata = pageMetadata({
  title: "The collection",
  path: "/shop/",
  description: lead,
});

export default function ShopPage() {
  return (
    <>
      <PageIntro
        compact
        eyebrow="THE CULTURED COWBOY COLLECTION"
        title={
          <>
            Find a little <em>more you.</em>
          </>
        }
        lead={lead}
      />
      <section className="catalogue-section" aria-label="Browse products">
        <div className="container">
          <Catalogue />
        </div>
      </section>
      <ContactCta />
    </>
  );
}
