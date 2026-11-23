"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "@/components/ui/icon";

type SheetProps = {
  open: boolean;
  onClose: () => void;
  side: "left" | "right" | "top";
  label: string;
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  id?: string;
};

/**
 * Slide-in panel built on the native modal <dialog>: focus is trapped inside, Escape closes it,
 * the page behind is inert, and focus returns to the control that opened it.
 */
export function Sheet({
  open,
  onClose,
  side,
  label,
  title,
  children,
  footer,
  id,
}: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      id={id}
      className={`sheet sheet--${side}`}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => {
        // A click on the backdrop lands on the dialog element itself.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sheet__panel">
        <div className="sheet__head">
          <div className="sheet__title">{title}</div>
          <button
            type="button"
            className="icon-btn"
            aria-label="Close"
            onClick={onClose}
          >
            <Icon name="x" />
          </button>
        </div>
        <div className="sheet__body">{children}</div>
        {footer && <div className="sheet__foot">{footer}</div>}
      </div>
    </dialog>
  );
}
