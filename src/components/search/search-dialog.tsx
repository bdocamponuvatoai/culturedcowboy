"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { Sheet } from "@/components/ui/sheet";
import { collections, matchesQuery, products } from "@/content/catalog";

type SearchDialogProps = { open: boolean; onClose: () => void };

/** Instant search over the catalogue, opened from the header. */
export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const results = query.trim()
    ? products.filter((p) => matchesQuery(p, query))
    : [];

  function close() {
    setQuery("");
    onClose();
  }

  return (
    <Sheet
      open={open}
      onClose={close}
      side="top"
      label="Search the collection"
      title={<span className="micro">Search</span>}
    >
      <form
        role="search"
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (results[0]) {
            router.push(`/products/${results[0].slug}/`);
            close();
          }
        }}
      >
        <Icon name="search" size={26} />
        <input
          // The dialog moves focus here when it opens.
          autoFocus
          type="search"
          aria-label="Search products"
          placeholder="Search boots, hats, makers…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {!query.trim() ? (
        <div className="search-suggest">
          <p className="micro">Browse by collection</p>
          <div className="chip-row">
            {collections.map((c) => (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}/`}
                className="chip"
                onClick={close}
              >
                {c.name}
              </Link>
            ))}
            <Link href="/collections/western/" className="chip" onClick={close}>
              The Western collection
            </Link>
          </div>
        </div>
      ) : results.length ? (
        <>
          <p className="search-count micro" aria-live="polite">
            {results.length} {results.length === 1 ? "piece" : "pieces"}
          </p>
          <ul className="search-results" role="list">
            {results.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}/`}
                  className="search-result"
                  onClick={close}
                >
                  <span className="search-result__media">
                    <Image src={p.images[0]} alt="" />
                  </span>
                  <span>
                    <span className="micro">{p.brand}</span>
                    <span className="search-result__name">{p.name}</span>
                    <span className="search-result__meta">{p.color}</span>
                  </span>
                  <Icon name="arrow-up-right" size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="search-empty" aria-live="polite">
          <p className="display">No match just yet.</p>
          <p>
            Try another name, maker, or category. There’s more in store than
            this selection.
          </p>
          <Link href="/visit/" className="text-link" onClick={close}>
            <span>Ask the store</span>
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>
      )}

      <Link href="/shop/" className="search-all text-link" onClick={close}>
        <span>View the full collection</span>
        <Icon name="arrow-right" size={14} />
      </Link>
    </Sheet>
  );
}
