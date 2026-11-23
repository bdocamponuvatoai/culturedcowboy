import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";

type PageIntroProps = {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  align?: "start" | "center";
  aside?: ReactNode;
  /** Shorter opener for listing pages, so products appear sooner. */
  compact?: boolean;
  children?: ReactNode;
};

/** Page opener: eyebrow, large serif H1 and a lead paragraph, with an optional visual beside it. */
export function PageIntro({
  eyebrow,
  title,
  lead,
  align = "start",
  aside,
  compact,
  children,
}: PageIntroProps) {
  return (
    <section
      className={`page-intro page-intro--${align}${aside ? " page-intro--with-aside" : ""}${compact ? " page-intro--compact" : ""}`}
    >
      <div className="container page-intro__inner">
        <div className="page-intro__copy">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
          {children}
        </div>
        {aside && <div className="page-intro__aside">{aside}</div>}
      </div>
    </section>
  );
}
