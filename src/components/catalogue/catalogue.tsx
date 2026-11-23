"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { ButtonLink } from "@/components/ui/links";
import { ProductCard } from "@/components/ui/product-card";
import Link from "next/link";
import {
  brands,
  collections,
  inCollection,
  matchesQuery,
  products,
} from "@/content/catalog";

type Sort = "featured" | "name" | "brand";

/** Search, maker filter, sort and category chips over the product selection. */
export function Catalogue({
  initialCategory = "all",
}: {
  initialCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState("all");
  const [sort, setSort] = useState<Sort>("featured");
  const input = useRef<HTMLInputElement>(null);

  // Links to /shop/#search land with the search field focused.
  useEffect(() => {
    if (window.location.hash === "#search") input.current?.focus();
  }, []);

  const visible = products
    .filter(
      (p) =>
        inCollection(p, category) &&
        (brand === "all" || p.brand === brand) &&
        matchesQuery(p, query),
    )
    .sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : sort === "brand"
          ? a.brand.localeCompare(b.brand)
          : Number(!!b.featured) - Number(!!a.featured),
    );

  function reset() {
    setQuery("");
    setCategory(initialCategory);
    setBrand("all");
    setSort("featured");
  }

  const chips = [{ slug: "all", name: "All pieces" }, ...collections];

  return (
    <div className="catalogue">
      <div className="catalogue__toolbar">
        <div className="chip-row" role="group" aria-label="Filter by category">
          {chips.map((c) => (
            <button
              key={c.slug}
              type="button"
              className="chip"
              aria-pressed={category === c.slug}
              onClick={() => setCategory(c.slug)}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div className="catalogue__controls">
          <div className="search-field" id="search">
            <Icon name="search" size={18} />
            <input
              ref={input}
              type="search"
              aria-label="Search products"
              placeholder="Search boots, hats, makers…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                className="search-field__clear"
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setQuery("");
                  input.current?.focus();
                }}
              >
                <Icon name="x" size={16} />
              </button>
            )}
          </div>
          <label className="select">
            <span className="select__label micro">Maker</span>
            <select
              aria-label="Maker"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="all">All makers</option>
              {brands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
            <Icon name="chevron-down" size={16} />
          </label>
          <label className="select">
            <span className="select__label micro">Sort by</span>
            <select
              aria-label="Sort by"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              <option value="featured">Our selection</option>
              <option value="name">Name, A–Z</option>
              <option value="brand">Maker, A–Z</option>
            </select>
            <Icon name="chevron-down" size={16} />
          </label>
        </div>
      </div>

      <p className="catalogue__count micro" aria-live="polite">
        {`${visible.length} ${visible.length === 1 ? "piece" : "pieces"}`}
      </p>

      {visible.length ? (
        <div className="product-grid catalogue-grid">
          <h2 className="visually-hidden">Products</h2>
          {visible.map((p, i) => (
            <ProductCard product={p} key={p.slug} eager={i < 4} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="display">
            No match <em>just yet.</em>
          </p>
          <p>
            Try another name, maker, or category. There’s more in store than
            this selection.
          </p>
          <div className="actions actions--center">
            <button className="btn btn--solid" type="button" onClick={reset}>
              <span>Reset filters</span>
            </button>
            <ButtonLink variant="outline" href="/visit/">
              Ask the store
            </ButtonLink>
          </div>
        </div>
      )}

      <p className="catalogue-note">
        {
          "Selected styles from the original catalogue, subject to confirmation. Product photography may vary in resolution. Need something else? "
        }
        <Link className="inline-link" href="/visit/">
          Ask us.
        </Link>
      </p>
    </div>
  );
}
