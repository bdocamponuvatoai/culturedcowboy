"use client";

import Image from "next/image";
import Link from "next/link";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import type { Product } from "@/content/catalog";
import { MAX_QUANTITY, removeFromBag, setBagQuantity } from "@/lib/bag-store";

type BagLineProps = {
  lineKey: string;
  product: Product;
  color: string;
  size: string;
  quantity: number;
  compact?: boolean;
  onNavigate?: () => void;
};

/** One saved pick: photo, details, quantity and remove. Used by the drawer and the bag page. */
export function BagLine({
  lineKey,
  product: p,
  color,
  size,
  quantity,
  compact,
  onNavigate,
}: BagLineProps) {
  const href = `/products/${p.slug}/`;
  return (
    <article className={`bag-line${compact ? " bag-line--compact" : ""}`}>
      <Link
        href={href}
        className="bag-line__media"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onNavigate}
      >
        <Image src={p.images[0]} alt="" />
      </Link>
      <div className="bag-line__body">
        <p className="micro bag-line__brand">{p.brand}</p>
        <h3 className="bag-line__name">
          <Link href={href} onClick={onNavigate}>
            {p.name}
          </Link>
        </h3>
        <dl className="bag-line__meta">
          <div>
            <dt>Color</dt>
            <dd>{color}</dd>
          </div>
          <div>
            <dt>Size</dt>
            <dd>{size}</dd>
          </div>
        </dl>
        <div className="bag-line__actions">
          <QuantityStepper
            size="sm"
            value={quantity}
            max={MAX_QUANTITY}
            itemLabel={p.name}
            onChange={(n) => setBagQuantity(lineKey, n)}
          />
          <button
            type="button"
            className="bag-line__remove"
            onClick={() => removeFromBag(lineKey)}
          >
            Remove<span className="visually-hidden">{` ${p.name}`}</span>
          </button>
        </div>
      </div>
      {!compact && <p className="bag-line__price micro">Ask for pricing</p>}
    </article>
  );
}
