// A tiny bridge so any component (a quick-add button, the product picker) can open the bag drawer
// without sharing React state through the tree.
const OPEN_BAG = "cc:open-bag";

export function openBagDrawer() {
  window.dispatchEvent(new Event(OPEN_BAG));
}

export function onOpenBagDrawer(handler: () => void): () => void {
  window.addEventListener(OPEN_BAG, handler);
  return () => window.removeEventListener(OPEN_BAG, handler);
}
