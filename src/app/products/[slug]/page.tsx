import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPicker } from "@/components/product/product-picker";
import { RelatedProducts } from "@/components/sections/related-products";
import { JsonLd } from "@/components/seo/json-ld";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon, type IconName } from "@/components/ui/icon";
import { siteUrl } from "@/config/deployment";
import { site } from "@/config/site";
import { collections, findProduct, products } from "@/content/catalog";
import { pageMetadata } from "@/lib/metadata";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const p = findProduct((await params).slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.brand} ${p.name}`,
    path: `/products/${p.slug}/`,
    description: p.description,
    image: { src: p.images[0], alt: `${p.brand} ${p.name} in ${p.color}` },
  });
}

// Short reassurances, each restating something the site already says.
const ASSURANCES: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "ruler",
    title: "Fit guidance",
    body: "Unsure? We’ll help you find the right fit.",
  },
  {
    icon: "message-circle",
    title: "Confirmed by a person",
    body: "The store confirms price, availability, and sizing.",
  },
  {
    icon: "map-pin",
    title: "Greenwood store",
    body: "Call ahead for current hours.",
  },
];

export default async function ProductPage({ params }: Params) {
  const p = findProduct((await params).slug);
  if (!p) notFound();
  const collection = collections.find((c) => c.slug === p.category);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Collection",
        item: `${siteUrl}/shop/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: collection?.name,
        item: `${siteUrl}/collections/${p.category}/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: p.name,
        item: `${siteUrl}/products/${p.slug}/`,
      },
    ],
  };
  return (
    <>
      <div className="container product">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol role="list">
            <li>
              <Link href="/shop/">Collection</Link>
            </li>
            <li>
              <Link href={`/collections/${p.category}/`}>
                {collection?.name}
              </Link>
            </li>
            <li aria-current="page">{p.name}</li>
          </ol>
        </nav>
        <section className="product__layout">
          <ProductGallery product={p} />
          <div className="product__info">
            <Eyebrow>{`${p.brand.toUpperCase()} · ${p.audience.toUpperCase()}`}</Eyebrow>
            <h1 className="product__title">{p.name}</h1>
            <p className="product__style micro">{`Catalogue style ${p.style}`}</p>
            <p className="product__description">{p.description}</p>
            <ProductPicker product={p} />
            <ul className="assurances" role="list">
              {ASSURANCES.map((a) => (
                <li key={a.title}>
                  <Icon name={a.icon} size={20} />
                  <span>
                    <strong>{a.title}</strong>
                    {a.body}
                  </span>
                </li>
              ))}
            </ul>
            <div className="accordion accordion--compact">
              <details open>
                <summary>
                  <span>The details</span>
                  <Icon name="plus" size={18} className="accordion__icon" />
                </summary>
                <ul className="detail-list">
                  {p.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </details>
              <details>
                <summary>
                  <span>Ordering &amp; availability</span>
                  <Icon name="plus" size={18} className="accordion__icon" />
                </summary>
                <p>
                  Catalogue listings are a starting point. Contact us to confirm
                  current pricing, sizes, stock, lead times, and fulfillment.
                  Saving a selection does not reserve an item or place an order.
                </p>
                <a
                  className="inline-link"
                  href={`tel:${site.phone.tel}`}
                >{`Call ${site.phone.display}`}</a>
              </details>
              <details>
                <summary>
                  <span>Original catalogue</span>
                  <Icon name="plus" size={18} className="accordion__icon" />
                </summary>
                <p>
                  Product details and photography are drawn from the store’s
                  existing website. Some listed styles may have changed.
                </p>
                <a
                  className="inline-link"
                  href={p.source}
                  target="_blank"
                  rel="noreferrer"
                >
                  View the original listing
                </a>
              </details>
            </div>
          </div>
        </section>
      </div>
      <RelatedProducts product={p} />
      <JsonLd data={breadcrumbJsonLd} />
    </>
  );
}
