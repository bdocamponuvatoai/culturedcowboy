import { Sparkle } from "@/components/ui/icon";

/** The Cultured Cowboy wordmark. */
export function Brand({ className }: { className?: string }) {
  return (
    <span className={`brand${className ? ` ${className}` : ""}`}>
      <span className="brand__name">
        Cultured Cowboy
        <Sparkle className="brand__star" />
      </span>
      <span className="brand__tag">Western &amp; Biker · Greenwood, SC</span>
    </span>
  );
}
