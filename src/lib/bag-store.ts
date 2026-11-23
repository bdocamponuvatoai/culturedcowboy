import { findProduct } from "@/content/catalog";

// The request bag: a small localStorage-backed store read through useSyncExternalStore.
// Nothing here leaves the browser.

export type BagItem = {
  key: string;
  slug: string;
  size: string;
  color: string;
  quantity: number;
};
export type BagSnapshot = { items: BagItem[]; storageAvailable: boolean };

const BAG_STORAGE_KEY = "cultured-cowboy-request-v1";
export const MAX_LINES = 24;
export const MAX_QUANTITY = 20;

const clampQuantity = (n: number) => Math.max(1, Math.min(MAX_QUANTITY, n));

function isValidItem(x: unknown): x is BagItem {
  if (!x || typeof x !== "object") return false;
  const i = x as Record<string, unknown>;
  return (
    typeof i.slug === "string" &&
    findProduct(i.slug) !== undefined &&
    typeof i.key === "string" &&
    typeof i.size === "string" &&
    typeof i.color === "string" &&
    Number.isInteger(i.quantity) &&
    (i.quantity as number) >= 1 &&
    (i.quantity as number) <= MAX_QUANTITY
  );
}

let snapshot: BagSnapshot | null = null;
const listeners = new Set<() => void>();

function persist(items: BagItem[], storageAvailable: boolean): boolean {
  try {
    localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(items));
    return storageAvailable;
  } catch {
    return false;
  }
}

function load(): BagSnapshot {
  let items: BagItem[] = [];
  let storageAvailable = true;
  try {
    const raw: unknown = JSON.parse(
      localStorage.getItem(BAG_STORAGE_KEY) || "[]",
    );
    if (Array.isArray(raw)) items = raw.filter(isValidItem).slice(0, MAX_LINES);
  } catch {
    storageAvailable = false;
  }
  // Write the validated list straight back, so storage never keeps entries we dropped.
  if (storageAvailable) storageAvailable = persist(items, storageAvailable);
  return { items, storageAvailable };
}

function update(next: (items: BagItem[]) => BagItem[]) {
  const current = getBagSnapshot();
  const items = next(current.items);
  snapshot = {
    items,
    storageAvailable: persist(items, current.storageAvailable),
  };
  listeners.forEach((l) => l());
}

export function getBagSnapshot(): BagSnapshot {
  if (!snapshot) snapshot = load();
  return snapshot;
}

/** Server render and hydration: the bag has not been read yet. */
export function getServerBagSnapshot(): BagSnapshot | null {
  return null;
}

// Keep several open tabs in step instead of letting one overwrite another.
function onStorage(e: StorageEvent) {
  if (e.key !== BAG_STORAGE_KEY && e.key !== null) return;
  snapshot = load();
  listeners.forEach((l) => l());
}

export function subscribeToBag(listener: () => void): () => void {
  if (listeners.size === 0) window.addEventListener("storage", onStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

function bagItemKey(slug: string, size: string, color: string): string {
  return [slug, size.trim().toLowerCase(), color].join("|");
}

export function addToBag(item: Omit<BagItem, "key">) {
  const key = bagItemKey(item.slug, item.size, item.color);
  update((items) =>
    items.some((x) => x.key === key)
      ? items.map((x) =>
          x.key === key
            ? {
                ...x,
                quantity: Math.min(MAX_QUANTITY, x.quantity + item.quantity),
              }
            : x,
        )
      : [...items, { ...item, key }].slice(0, MAX_LINES),
  );
}

export function removeFromBag(key: string) {
  update((items) => items.filter((x) => x.key !== key));
}

export function setBagQuantity(key: string, quantity: number) {
  update((items) =>
    items.map((x) =>
      x.key === key ? { ...x, quantity: clampQuantity(quantity) } : x,
    ),
  );
}
