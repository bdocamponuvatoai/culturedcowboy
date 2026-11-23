import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/deployment";
import { collectionPages, products } from "@/content/catalog";

export const dynamic = "force-static";

const STATIC_PATHS = [
  "/",
  "/shop/",
  "/about/",
  "/visit/",
  "/how-to-order/",
  "/fit-guide/",
  "/privacy/",
];

/** Every indexable page, built from the same content data as the routes. The bag is per-visitor, so it is left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC_PATHS,
    ...collectionPages.map((c) => `/collections/${c.slug}/`),
    ...products.map((p) => `/products/${p.slug}/`),
  ];
  return paths.map((path) => ({ url: `${siteUrl}${path}` }));
}
