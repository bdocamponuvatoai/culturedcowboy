import { site } from "@/config/site";

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "How do I order?",
    answer: `Browse the collection, add your preferred items and sizes to your request bag, and prepare an email inquiry. The store confirms current pricing, availability, fit, shipping, and payment arrangements directly. You can also call ${site.phone.display}.`,
  },
  {
    question: "Why do you confirm fit before an order?",
    answer:
      "Different makers and styles fit differently. A short conversation about size, width, shaping, or how you plan to wear an item can help you choose more confidently.",
  },
  {
    question: "Is everything shown currently in stock?",
    answer:
      "This is a selection from the existing catalogue, not a live inventory feed. Availability, current specifications, and prices need to be confirmed with Cultured Cowboy before purchase.",
  },
  {
    question: "Can I ask for something outside this collection?",
    answer:
      "Yes. The original catalogue includes more boots, hats, clothing, tack, wedding pieces, gifts, and accessories. Tell the store the maker, style, and details you have in mind.",
  },
  {
    question: "Can I visit in person?",
    answer: `Visit Cultured Cowboy at ${site.address.street} in Greenwood, South Carolina. Call ahead to confirm current opening hours and the availability of an item you want to see.`,
  },
];
