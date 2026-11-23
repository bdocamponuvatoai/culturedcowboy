import { Eyebrow } from "@/components/ui/eyebrow";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Preview privacy",
  path: "/privacy/",
  description:
    "What this site stores in your browser, and what happens when you prepare an inquiry.",
});

export default function PrivacyPage() {
  return (
    <section className="container legal">
      <header className="legal__head">
        <Eyebrow>DESIGN PREVIEW</Eyebrow>
        <h1 className="heading--inline">
          Your <em>information.</em>
        </h1>
      </header>
      <div className="legal__body">
        <h2>What this preview stores</h2>
        <p>
          Your selected products, color preferences, sizes, and quantities are
          stored in this browser using local storage. They remain until you
          remove them or clear your browser’s site data. Your contact details
          and inquiry notes are held only in the open page and are not saved to
          local storage.
        </p>
        <h2>Sending an inquiry</h2>
        <p>
          “Prepare email inquiry” opens your email app with a draft. Nothing is
          sent automatically. Your email service handles the message after you
          choose to send it. “Copy inquiry” puts the draft on your clipboard;
          “Download inquiry” saves a text file to your device.
        </p>
        <h2>No payment collection</h2>
        <p>
          This preview has no connected checkout, payment processing, account
          registration, marketing tracking, or live inventory. Do not include
          card numbers or other payment credentials in an inquiry. The hosting
          provider may process ordinary access and security logs under its own
          privacy terms.
        </p>
        <h2>Images and product information</h2>
        <p>
          Editorial images are AI-generated and illustrate a proposed creative
          direction. They do not depict the actual store, its employees, or
          inventory. Product images and descriptions are based on Cultured
          Cowboy’s existing catalogue. The store must confirm all current
          product, price, and availability details.
        </p>
      </div>
    </section>
  );
}
