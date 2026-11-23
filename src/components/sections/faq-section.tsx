import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import type { Faq } from "@/content/faqs";

type FaqSectionProps = {
  eyebrow: string;
  heading: ReactNode;
  items: Faq[];
  children?: ReactNode;
};

/** Two-column FAQ: heading (plus optional link) beside native disclosure widgets. */
export function FaqSection({
  eyebrow,
  heading,
  items,
  children,
}: FaqSectionProps) {
  return (
    <section className="section">
      <div className="container split faq">
        <div className="faq__intro">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2>{heading}</h2>
          {children}
        </div>
        <div className="accordion">
          {items.map(({ question, answer }) => (
            <details key={question}>
              <summary>
                <span>{question}</span>
                <Icon name="plus" size={20} className="accordion__icon" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
