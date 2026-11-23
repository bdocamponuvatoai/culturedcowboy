import type { Product } from "@/content/catalog";

// Builds the plain-text inquiry the visitor emails, copies or downloads from the bag.

export type InquiryLine = {
  quantity: number;
  color: string;
  size: string;
  product: Product;
};
export type InquiryContact = { name: string; email: string; notes: string };

const INQUIRY_SUBJECT = "Cultured Cowboy — product inquiry";
export const INQUIRY_FILENAME = "cultured-cowboy-order-inquiry.txt";

export function buildInquirySummary(
  lines: InquiryLine[],
  { name, email, notes }: InquiryContact,
): string {
  const items = lines
    .map(
      ({ quantity, color, size, product: p }) =>
        `${quantity} × ${p.brand} ${p.name}\nStyle: ${p.style}\nColor: ${color}\nSize preference: ${size}\nOriginal catalogue: ${p.source}`,
    )
    .join("\n\n");
  const contact = `${name ? `\nName: ${name}` : ""}${email ? `\nReply email: ${email}` : ""}${notes ? `\nNotes: ${notes}` : ""}`;
  return `Hello Cultured Cowboy,\n\nI'd like to ask about these items:\n\n${items}\n\nPlease confirm current pricing, sizes, availability, and fulfillment options.\n${contact}\n\nThis is an inquiry, not a paid order.`;
}

export function buildMailtoHref(to: string, summary: string): string {
  return `mailto:${to}?subject=${encodeURIComponent(INQUIRY_SUBJECT)}&body=${encodeURIComponent(summary)}`;
}
