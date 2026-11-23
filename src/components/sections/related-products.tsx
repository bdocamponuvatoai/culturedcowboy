import { Eyebrow } from "@/components/ui/eyebrow";
import { TextLink } from "@/components/ui/links";
import { ProductCard } from "@/components/ui/product-card";
import { products, type Product } from "@/content/catalog";

/** Four other pieces: same category first, then the rest of the selection. */
export function RelatedProducts({ product }: { product: Product }) {
  const others = products.filter((p) => p.slug !== product.slug);
  const related = [
    ...others.filter((p) => p.category === product.category),
    ...others.filter((p) => p.category !== product.category),
  ].slice(0, 4);
  return (
    <section className="section section--tint">
      <div className="container">
        <div className="section-head">
          <div>
            <Eyebrow>KEEP EXPLORING</Eyebrow>
            <h2>
              More <em>your style.</em>
            </h2>
          </div>
          <TextLink href="/shop/">View the collection</TextLink>
        </div>
        <div className="product-grid">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
