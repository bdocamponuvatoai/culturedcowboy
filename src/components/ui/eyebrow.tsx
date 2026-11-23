import type { ReactNode } from "react";

/** Small uppercase label above a heading, led by a short rule. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`eyebrow${className ? ` ${className}` : ""}`}>{children}</p>
  );
}
