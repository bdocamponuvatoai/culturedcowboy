"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import type { Product } from "@/content/catalog";

/** Main photo on a warm stage (never enlarged far past its real size) with thumbnails. */
export function ProductGallery({ product: p }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const image = p.images[index];
  return (
    <div className="gallery">
      <div className="gallery__stage stage">
        <Image
          key={image.src}
          src={image}
          alt={`${p.brand} ${p.name}, catalogue view ${index + 1}`}
          loading="eager"
          fetchPriority="high"
          style={{ "--nw": image.width } as CSSProperties}
        />
      </div>
      {p.images.length > 1 && (
        <div
          className="gallery__thumbs"
          role="group"
          aria-label="Product photos"
        >
          {p.images.map((img, i) => (
            <button
              type="button"
              aria-pressed={i === index}
              aria-label={`View product photo ${i + 1}`}
              key={img.src}
              onClick={() => setIndex(i)}
            >
              <Image src={img} alt="" loading="eager" />
            </button>
          ))}
        </div>
      )}
      <p className="gallery__caption">
        Original product photography from the Cultured Cowboy catalogue.
        {p.photoNote ?? ""}
      </p>
    </div>
  );
}
