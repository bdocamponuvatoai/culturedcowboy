"use client";

import { useState } from "react";
import { useBag } from "@/components/bag/use-bag";
import { Icon } from "@/components/ui/icon";
import { NO_SIZE, type Product } from "@/content/catalog";
import { addToBag, MAX_LINES } from "@/lib/bag-store";
import { openBagDrawer } from "@/lib/ui-events";

/** Saves a product to the picks with its shown colour and "help me find my size", then opens the bag. */
export function QuickAdd({ product: p }: { product: Product }) {
  const bag = useBag();
  const [added, setAdded] = useState(false);
  const full = (bag?.items.length ?? 0) >= MAX_LINES;
  return (
    <button
      type="button"
      className="quick-add"
      data-added={added ? "true" : undefined}
      disabled={!bag || full}
      aria-label={
        added
          ? `Added to your picks: ${p.brand} ${p.name}`
          : `Quick add ${p.brand} ${p.name} to your picks`
      }
      onClick={() => {
        addToBag({ slug: p.slug, color: p.color, size: NO_SIZE, quantity: 1 });
        setAdded(true);
        openBagDrawer();
      }}
    >
      <Icon name={added ? "check" : "plus"} size={18} />
      <span>{added ? "Added to your picks" : "Quick add"}</span>
    </button>
  );
}
