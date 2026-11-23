"use client";

import { Icon } from "@/components/ui/icon";

type QuantityStepperProps = {
  value: number;
  min?: number;
  max: number;
  onChange: (next: number) => void;
  /** What is being counted, for the button labels, e.g. "Skyline 6X Felt Hat". */
  itemLabel?: string;
  size?: "md" | "sm";
};

export function QuantityStepper({
  value,
  min = 1,
  max,
  onChange,
  itemLabel,
  size = "md",
}: QuantityStepperProps) {
  const of = itemLabel ? `${itemLabel} quantity` : "quantity";
  return (
    <div
      className={`qty qty--${size}`}
      role="group"
      aria-label={itemLabel ? `${itemLabel} quantity` : "Quantity"}
    >
      <button
        type="button"
        aria-label={`Decrease ${of}`}
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
      >
        <Icon name="minus" size={16} />
      </button>
      <output aria-live="polite">{value}</output>
      <button
        type="button"
        aria-label={`Increase ${of}`}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
