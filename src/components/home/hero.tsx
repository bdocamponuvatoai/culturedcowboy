"use client";

import { useState } from "react";
import { EditorialImage, ImageLabel } from "@/components/ui/editorial-image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink, TextLink } from "@/components/ui/links";

type Scene = "western" | "biker";

const SCENES = {
  western: {
    label: "The Western spirit",
    alt: "Illustrative Western lifestyle: a rider and her horse in a sunlit pasture",
    title: (
      <>
        Western soul.
        <br />
        <em>Independent spirit.</em>
      </>
    ),
    description:
      "The boots you live in. The hat that becomes you. Find your next favorite, with people who know the difference.",
    cta: { href: "/shop/", label: "Explore the collection" },
  },
  biker: {
    label: "The open road",
    alt: "Illustrative biker lifestyle: a man beside a parked motorcycle on a quiet road",
    title: (
      <>
        Good leather.
        <br />
        <em>Long stories.</em>
      </>
    ),
    description:
      "For the road ahead and everywhere after. Explore classic motorcycle leather with a character all its own.",
    cta: { href: "/collections/leather/", label: "Explore leather & biker" },
  },
} as const;

const ORDER: Scene[] = ["western", "biker"];

/** Home hero with a manual switch between the Western and biker stories. */
export function Hero() {
  const [scene, setScene] = useState<Scene>("western");
  const s = SCENES[scene];
  return (
    <section
      className={`hero hero--${scene} on-night`}
      aria-label="Discover Cultured Cowboy"
    >
      <div className="hero__media">
        {/* Keyed so the image fades in again when the story changes. */}
        <EditorialImage key={scene} name={scene} alt={s.alt} priority />
      </div>
      <div className="hero__shade" />
      <div className="container hero__content">
        <Eyebrow>ROOTED IN GREENWOOD. MADE FOR YOUR OWN WAY.</Eyebrow>
        <h1 key={scene} className="hero__title">
          {s.title}
        </h1>
        <p className="hero__lead">{s.description}</p>
        <div className="hero__actions">
          <ButtonLink variant="light" href={s.cta.href} arrow>
            {s.cta.label}
          </ButtonLink>
          <TextLink href="/how-to-order/">How ordering works</TextLink>
        </div>
      </div>
      <div className="container hero__bottom">
        <div
          className="scene-switch"
          role="group"
          aria-label="Choose a collection story"
        >
          {ORDER.map((key, i) => (
            <button
              key={key}
              type="button"
              aria-pressed={scene === key}
              onClick={() => setScene(key)}
            >
              <span className="scene-switch__num">{`0${i + 1}`}</span>
              <span>{SCENES[key].label}</span>
            </button>
          ))}
        </div>
        <ImageLabel />
      </div>
    </section>
  );
}
