import Image from "next/image";
import { notFound } from "next/navigation";
import { Catalogue } from "@/components/catalogue/catalogue";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageIntro } from "@/components/sections/page-intro";
import { collectionPages } from "@/content/catalog";
import { pageMetadata } from "@/lib/metadata";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return collectionPages.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const c = collectionPages.find((x) => x.slug === slug);
  if (!c) return {};
  return pageMetadata({
    title: c.name,
    path: `/collections/${c.slug}/`,
    description: c.description,
  });
}

export default async function CollectionPage({ params }: Params) {
  const { slug } = await params;
  const c = collectionPages.find((x) => x.slug === slug);
  if (!c) notFound();
  return (
    <>
      <PageIntro
        compact
        eyebrow={c.name.toUpperCase()}
        title={c.line}
        lead={c.description}
        aside={
          <div className="stage stage--intro">
            <Image
              src={c.image}
              alt={c.name}
              loading="eager"
              fetchPriority="high"
            />
          </div>
        }
      />
      <section className="catalogue-section" aria-label={`Browse ${c.name}`}>
        <div className="container">
          <Catalogue key={slug} initialCategory={slug} />
        </div>
      </section>
      <ContactCta />
    </>
  );
}
