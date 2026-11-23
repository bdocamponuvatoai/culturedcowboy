"use client";

import { useSyncExternalStore } from "react";
import { findProduct, type Product } from "@/content/catalog";
import {
  getBagSnapshot,
  getServerBagSnapshot,
  subscribeToBag,
  type BagItem,
  type BagSnapshot,
} from "@/lib/bag-store";

/** The request bag, or `null` until it has been read from this browser's storage. */
export function useBag(): BagSnapshot | null {
  return useSyncExternalStore(
    subscribeToBag,
    getBagSnapshot,
    getServerBagSnapshot,
  );
}

export type BagLineData = BagItem & { product: Product };

/** Saved picks joined to their catalogue entries (unknown products are skipped). */
export function bagLines(bag: BagSnapshot | null): BagLineData[] {
  if (!bag) return [];
  return bag.items.flatMap((item) => {
    const product = findProduct(item.slug);
    return product ? [{ ...item, product }] : [];
  });
}

export function bagCount(bag: BagSnapshot | null): number {
  return bag ? bag.items.reduce((n, i) => n + i.quantity, 0) : 0;
}
