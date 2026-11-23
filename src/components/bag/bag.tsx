"use client";

import { useState } from "react";
import { BagLine } from "@/components/bag/bag-line";
import { bagCount, bagLines, useBag } from "@/components/bag/use-bag";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { ButtonLink, TextLink } from "@/components/ui/links";
import { site } from "@/config/site";
import {
  buildInquirySummary,
  buildMailtoHref,
  INQUIRY_FILENAME,
} from "@/lib/inquiry";

/** The visitor's saved picks plus the inquiry panel (email draft, copy, download). */
export function Bag() {
  const bag = useBag();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");

  if (!bag)
    return (
      <div className="bag-loading" aria-live="polite">
        Loading your picks…
      </div>
    );

  const lines = bagLines(bag);
  const summary = buildInquirySummary(lines, { name, email, notes });

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setStatus(
        "Your inquiry has been copied. Paste it into an email to " +
          site.email +
          ".",
      );
    } catch {
      setStatus(
        "Clipboard access is unavailable. Download your inquiry instead.",
      );
    }
  }

  function download() {
    const url = URL.createObjectURL(
      new Blob([summary], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = INQUIRY_FILENAME;
    a.click();
    // Give the browser a moment to start the download before releasing the blob.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus("Inquiry downloaded. Nothing has been sent to the store.");
  }

  if (!lines.length)
    return (
      <section className="empty-state empty-state--page">
        <Icon name="shopping-bag" size={44} strokeWidth={1} />
        <p className="display">
          A little room <em>for something good.</em>
        </p>
        <p>
          Save the pieces that catch your eye, then talk through the details
          with the store.
        </p>
        <ButtonLink href="/shop/" arrow>
          Explore the collection
        </ButtonLink>
      </section>
    );

  const count = bagCount(bag);

  return (
    <div className="bag-layout">
      <div className="bag-list">
        <h2 className="bag-list__count micro">{`${count} ${count === 1 ? "piece" : "pieces"} saved`}</h2>
        {lines.map((l) => (
          <BagLine
            key={l.key}
            lineKey={l.key}
            product={l.product}
            color={l.color}
            size={l.size}
            quantity={l.quantity}
          />
        ))}
        <p className="catalogue-note">
          {bag.storageAvailable
            ? "Your picks are saved in this browser."
            : "Browser storage is unavailable. Your picks will last only while this page stays open."}
          {" Items are not reserved."}
        </p>
        <TextLink href="/shop/">Keep exploring</TextLink>
      </div>

      <aside className="inquiry-card" aria-labelledby="inquiry-heading">
        <Eyebrow>LET’S GET THE DETAILS RIGHT</Eyebrow>
        <h2 id="inquiry-heading" className="heading--inline">
          Your <em>next step.</em>
        </h2>
        <p>
          Send your picks to the store for pricing, availability, and help with
          fit.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = buildMailtoHref(site.email, summary);
            setStatus(
              "Your email app should open with the inquiry. Review it and press Send there. If it doesn’t open, copy or download your inquiry below.",
            );
          }}
        >
          <label className="field">
            <span className="field__label">
              Your name <span>(optional)</span>
            </span>
            <input
              className="input"
              value={name}
              autoComplete="name"
              maxLength={100}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="field">
            <span className="field__label">
              Your email <span>(optional)</span>
            </span>
            <input
              className="input"
              value={email}
              type="email"
              autoComplete="email"
              maxLength={200}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="field">
            <span className="field__label">Anything else we should know?</span>
            <textarea
              className="input"
              value={notes}
              maxLength={1500}
              rows={3}
              placeholder="Fit questions, preferred timing, or another item…"
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
          <button className="btn btn--solid btn--block" type="submit">
            <Icon name="mail" size={18} />
            <span>Prepare email inquiry</span>
          </button>
        </form>
        <div className="inquiry-card__alts">
          <button type="button" className="text-link" onClick={copy}>
            <span>Copy inquiry</span>
          </button>
          <button type="button" className="text-link" onClick={download}>
            <span>Download inquiry</span>
          </button>
        </div>
        <p className="form-status" role="status">
          {status}
        </p>
        <p className="inquiry-card__fine">
          Opens your email app. Nothing is sent automatically. Please don’t
          include payment details.
        </p>
        <a className="inquiry-card__phone" href={`tel:${site.phone.tel}`}>
          <span className="micro">Prefer a conversation?</span>
          <span className="inquiry-card__number">
            <Icon name="phone" size={18} />
            {site.phone.display}
          </span>
        </a>
      </aside>
    </div>
  );
}
