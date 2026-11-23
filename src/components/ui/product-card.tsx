import Image from "next/image";
import Link from "next/link";
import { QuickAdd } from "@/components/product/quick-add";
import type { Product } from "@/content/catalog";

export function ProductCard({
  product: p,
  eager = false,
}: {
  product: Product;
  eager?: boolean;
}) {
  const href = `/products/${p.slug}/`;
  const [primary, alternate] = p.images;
  return (
    <article className="product-card">
      <div className="product-card__frame">
        {/* The name below is the accessible link; this duplicate is for pointer users only. */}
        <Link
          className="product-card__media"
          href={href}
          tabIndex={-1}
          aria-hidden="true"
        >
          <Image
            className="product-card__img"
            src={primary}
            alt={`${p.brand} ${p.name} in ${p.color}`}
            loading={eager ? "eager" : "lazy"}
          />
          {alternate && (
            <Image
              className="product-card__img product-card__img--alt"
              src={alternate}
              alt={`${p.brand} ${p.name}, alternate view`}
            />
          )}
        </Link>
        <QuickAdd product={p} />
      </div>
      <div className="product-card__body">
        <p className="micro product-card__brand">{p.brand}</p>
        <h3 className="product-card__name">
          <Link href={href}>{p.name}</Link>
        </h3>
        <p className="product-card__meta">
          <span>{p.color}</span>
          <span>Ask for pricing</span>
        </p>
      </div>
    </article>
  );
}
