"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useBag } from "@/components/bag/use-bag";
import { Icon } from "@/components/ui/icon";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { site } from "@/config/site";
import {
  NO_SIZE,
  sizePlaceholder,
  swatchColors,
  type Product,
} from "@/content/catalog";
import { addToBag, MAX_LINES, MAX_QUANTITY } from "@/lib/bag-store";
import { openBagDrawer } from "@/lib/ui-events";

/** Colour, size and quantity, saved to the request bag (an inquiry list, not a purchase). */
export function ProductPicker({ product: p }: { product: Product }) {
  const bag = useBag();
  const [size, setSize] = useState("");
  const [color, setColor] = useState(p.color);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [buyRowVisible, setBuyRowVisible] = useState(true);
  const buyRow = useRef<HTMLDivElement>(null);
  const full = (bag?.items.length ?? 0) >= MAX_LINES;

  // Show the compact bar on small screens once the main button has scrolled up out of view.
  // The root extends far below the viewport, so "in view or still below" is one state and
  // "scrolled past" the other; a jump (anchor link, reduced motion) still flips it.
  useEffect(() => {
    const row = buyRow.current;
    if (!row) return;
    const io = new IntersectionObserver(
      ([entry]) => setBuyRowVisible(entry.isIntersecting),
      { rootMargin: "0px 0px 100000px 0px" },
    );
    io.observe(row);
    return () => io.disconnect();
  }, []);

  function add() {
    addToBag({ slug: p.slug, color, size: size.trim() || NO_SIZE, quantity });
    setAdded(true);
    openBagDrawer();
  }

  const addLabel = added ? "Added to your picks" : "Add to your picks";

  return (
    <div className="picker">
      <p className="picker__notice">
        <Icon name="shield-check" size={18} />
        Price &amp; availability confirmed by the store
      </p>

      <fieldset className="picker__field">
        <legend className="picker__label">
          <span className="micro">Preferred color</span>
          <span className="picker__value">{color}</span>
        </legend>
        <div className="swatches">
          {p.colors.map((c) => (
            <label key={c} className="swatch">
              <input
                type="radio"
                name={`color-${p.slug}`}
                value={c}
                checked={color === c}
                onChange={() => {
                  setColor(c);
                  setAdded(false);
                }}
              />
              <span
                className="swatch__dot"
                style={
                  { "--swatch": swatchColors[c] ?? "#999" } as CSSProperties
                }
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="picker__field">
        <label htmlFor="preferred-size" className="picker__label">
          <span className="micro">Your size, if you know it</span>
        </label>
        <input
          id="preferred-size"
          className="input"
          value={size}
          maxLength={60}
          placeholder={sizePlaceholder(p.category)}
          onChange={(e) => {
            setSize(e.target.value);
            setAdded(false);
          }}
        />
        <p className="picker__hint">
          {"Unsure? We’ll help you find the right fit. "}
          <Link href="/fit-guide/" className="inline-link">
            A little help with fit
          </Link>
        </p>
      </div>

      <div className="picker__buy" ref={buyRow}>
        <QuantityStepper
          value={quantity}
          max={MAX_QUANTITY}
          onChange={(n) => {
            setQuantity(n);
            setAdded(false);
          }}
        />
        <button
          className="btn btn--solid add-button"
          type="button"
          disabled={!bag || full}
          onClick={add}
        >
          {added && <Icon name="check" size={18} />}
          <span>{addLabel}</span>
        </button>
      </div>

      <div aria-live="polite">
        {added && (
          <p className="success-note">
            {"Saved. "}
            <Link href="/bag/" className="inline-link">
              Review your picks and prepare an inquiry
            </Link>
          </p>
        )}
        {full && (
          <p className="success-note">
            {`Your bag has ${MAX_LINES} selections. `}
            <Link href="/bag/" className="inline-link">
              Review your picks
            </Link>
            {" before adding more."}
          </p>
        )}
      </div>

      <p className="picker__explainer">
        This saves an inquiry, not a purchase or reservation. We’ll confirm the
        details with you before you order.
      </p>
      <a className="picker__call" href={`tel:${site.phone.tel}`}>
        <Icon name="phone" size={18} />
        <span>
          Prefer a conversation? <strong>{site.phone.display}</strong>
        </span>
      </a>

      <div
        className="buy-bar"
        data-visible={buyRowVisible ? undefined : "true"}
        aria-hidden={buyRowVisible}
      >
        <div className="buy-bar__info">
          <span className="micro">{p.brand}</span>
          <span className="buy-bar__name">{p.name}</span>
        </div>
        <button
          className="btn btn--solid"
          type="button"
          tabIndex={buyRowVisible ? -1 : undefined}
          disabled={!bag || full}
          onClick={add}
        >
          <span>{added ? "Added" : "Add to picks"}</span>
        </button>
      </div>
    </div>
  );
}
