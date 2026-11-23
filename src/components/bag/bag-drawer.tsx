"use client";

import { BagLine } from "@/components/bag/bag-line";
import { bagCount, bagLines, useBag } from "@/components/bag/use-bag";
import { ButtonLink } from "@/components/ui/links";
import { Sheet } from "@/components/ui/sheet";
import { Icon } from "@/components/ui/icon";

type BagDrawerProps = { open: boolean; onClose: () => void };

/** Slide-out summary of the request bag, opened from the header or after a quick add. */
export function BagDrawer({ open, onClose }: BagDrawerProps) {
  const bag = useBag();
  const lines = bagLines(bag);
  const count = bagCount(bag);

  return (
    <Sheet
      id="bag-drawer"
      open={open}
      onClose={onClose}
      side="right"
      label="Your picks"
      title={
        <>
          <span className="sheet__heading">Your picks</span>
          <span className="sheet__count">{count}</span>
        </>
      }
      footer={
        lines.length > 0 && (
          <>
            <p className="drawer-note">
              Your picks are a saved inquiry list. Adding an item does not
              purchase or reserve it.
            </p>
            <ButtonLink href="/bag/" block arrow onClick={onClose}>
              Review &amp; prepare inquiry
            </ButtonLink>
          </>
        )
      }
    >
      {lines.length === 0 ? (
        <div className="drawer-empty">
          <Icon name="shopping-bag" size={40} strokeWidth={1} />
          <p className="display">
            A little room <em>for something good.</em>
          </p>
          <p>
            Save the pieces that catch your eye, then talk through the details
            with the store.
          </p>
          <ButtonLink href="/shop/" variant="outline" arrow onClick={onClose}>
            Explore the collection
          </ButtonLink>
        </div>
      ) : (
        <div className="drawer-lines">
          {lines.map((l) => (
            <BagLine
              key={l.key}
              lineKey={l.key}
              product={l.product}
              color={l.color}
              size={l.size}
              quantity={l.quantity}
              compact
              onNavigate={onClose}
            />
          ))}
        </div>
      )}
    </Sheet>
  );
}
