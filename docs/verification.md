# Verification

Measured on 24 November 2026 on Windows 11 with Google Chrome 157.0.8103.80 (headless, driven by `playwright-core`) and
Node 24.15.0. The test scripts drive two builds side by side, so they live outside the repository; the method is described
here so every check can be repeated.

The work happened in two stages, verified separately:

- **Part A, migration.** The original ChatGPT-built site (a Next.js 16.3 app with one stylesheet and a prebuilt `out/`)
  was rebuilt into this project's structure without changing the design, and proven identical.
- **Part B, redesign.** The site was then deliberately redesigned. Pixel parity no longer applies, so the redesign is
  verified on behaviour (against the original's recorded outcomes), navigation and accessibility.

"Legacy" below is the original export, copied before any change and confirmed identical to a fresh build of its own
source (0 HTML differences, byte-identical CSS). Every build was served by the same small static server
(directory index + `404.html`).

---

## Part A: migration parity

### A1. Build and static checks

| Check                                             | Result                                                          |
| ------------------------------------------------- | --------------------------------------------------------------- |
| `npm run build` (Turbopack, static export)        | Pass: 26 static routes (24 HTML files, icon, robots, sitemap)   |
| `npm run check` (typegen + tsc, ESLint, Prettier) | Pass, 0 warnings                                                |
| Windows prefetch-segment fix (`postbuild`)        | 21 nested `__next.*` files flattened per build (bug reproduced) |

### A2. Stylesheet split (cascade proof)

The original 33.9 KB stylesheet was first split into 35 ordered partials. Because moving responsive rules into
per-component files can change which declaration wins, the split was checked against the real DOM:

- **Element signatures:** every element on 22 routes and 10 UI states (open menu, filled/empty/full bag, empty search,
  gallery, FAQ open, …) was recorded in Chrome with the full list of selectors it matches: 280 distinct signatures.
- **Winner comparison:** for each signature, at one width per breakpoint band and with reduced motion on and off, the
  winning declaration for every longhand property was computed for the old and new order. **53,542 checks, 0
  differences.** A negative test (undoing two relocations) was caught, as expected.
- **Counts:** declarations 1,282 → 1,278 (−5 `@font-face`, replaced by `next/font`; +1 from splitting one grouped
  selector); selector×declaration pairs 1,360 → 1,355 (exactly the 5 `@font-face` declarations).

(The redesign in Part B later replaced this stylesheet.)

### A3. DOM structure

The live DOM after hydration (tags, attributes, every text node separately) was serialised for 22 routes + 10 UI states
on both builds and diffed, with image hashes and `next/image` housekeeping attributes normalised.

**Identical on all 32 pages/states, including text-node boundaries.** The check caught three places where Prettier had
re-wrapped JSX into `Text.{" "}<Link>` (two text nodes, which shifts the next word by a sub-pixel); they were fixed with
string literals.

### A4. Pixel parity

Every route, a hash preset (`/shop/#search`) and a query preset (`/?utm_source=…`) at six widths, plus ten UI states.
Each comparison captures the first screen at width × 900 and the whole page, strict (threshold 0, anti-aliasing
counted).

Capture method (after fixing two capture artefacts, see below): software rendering (`--disable-gpu`), sRGB, reduced
motion, every image forced eager and `decode()`d, `document.fonts.ready`, the full page captured by growing the
viewport to the document height (not Playwright's full-page mode), shots repeated until two consecutive frames are
byte-identical, the two sites captured one after the other.

**Result: 152 of 164 comparisons pixel-identical (322 capture pairs).** The remaining 12 are two known items:

| Where                                               | Difference                                                                | Finding                                                                                                                                                                                                                        |
| --------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Home page and its variants, tall captures only (10) | A single pixel row inside the hero photo, ±1 of 255 in one colour channel | DOM, CSS cascade, image bytes and `srcset` choice are identical; removing the `decoding="async"` attribute did not change it. Not visible. Cause not identified (renderer-level).                                              |
| `/collections/hats/` at 1280 and 1024 (2)           | Skyline hat photo resampled, ≤5 of 255                                    | Intermittent: the same cases were pixel-identical on targeted re-runs, and the same kind of photo resampling appeared when legacy was compared with itself on other pages. Treated as capture noise; not proven for this page. |

Capture artefacts found and fixed (they affected legacy-vs-legacy too, so they were not migration differences):
Playwright's full-page mode re-rasterised photos mid-capture at a timing-dependent quality, and a full-page capture of
a page that loads scrolled painted the fixed skip link and sticky header at the scroll offset.

Hash landing: on `/shop/#search` the new site scrolls 2 px further at 1600 and 768 px (identical at the other widths). Legacy jumped before its webfont
loaded and was then shifted by the font swap; the new site preloads the font, so it lands exactly at the CSS offset.

### A5. Behaviour parity

The same scripted interactions ran on both builds and their outcomes were recorded as JSON (247 values): header menu
(labels, links, Escape by pointer and keyboard, resize, navigation), hero switch, catalogue search/clear/maker/sorts/
chips/empty/reset and all five collections, `/shop/#search` focus, product gallery, quantity limits, colour + trimmed
size, add, merge, "help me find my size", the 24-line limit, invalid stored entries, bag quantity/remove, the exact
`mailto:` URL (captured from Chrome's navigation request), status messages, clipboard text, downloaded file, Back,
emptying the bag, and the FAQ.

**243 of 247 identical.** The 4 differences are the two menu changes the brief required: Escape returns focus to the menu
button, and widening to desktop closes the menu.

### A6. Navigation

19 client-side steps through header, product card, breadcrumb, footer and logo links, the search hash link, Back and
Forward, the hero CTA after scrolling and the skip link: JS state survived every step; title, H1, `aria-current`, focus
and scroll matched legacy on every step; **0 4xx responses (165 requests including prefetches) and 0 console errors or
warnings.** A missing URL returns HTTP 404 with the styled page.

### A7. `<head>`

Title, description, robots, theme colour and viewport unchanged. Added: canonical, Open Graph/Twitter, per-page
descriptions taken from each page's on-screen intro, JSON-LD (`ClothingStore` on the home page, `BreadcrumbList` on
products), `robots.txt` (disallow all until indexing is enabled), `sitemap.xml`, a "Page not found" title, and `noindex`
on the bag page.

---

## Part B: redesign

The redesign keeps every on-screen fact and all copy, the same routes, the same request-bag data format and the same
inquiry text. It changes the visual system (Instrument Serif + DM Sans, warm bone/night palette, saddle and brass
accents), the header (transparent over the hero, centred wordmark), and adds a search dialog, a bag drawer, quick add on
product cards, colour swatches, a sticky add bar on phones and scroll reveals (off for reduced motion).

### B1. Behaviour against the original

The behaviour script was re-pointed at the new markup and its outcomes compared with the legacy recording:
**218 of 244 legacy values identical**, including every search, filter and sort result, all collection counts, picker
limits, bag merge and validation, the exact `mailto:` URL, clipboard text and the downloaded file. The 26 differences are
by design: the menu is now a modal dialog (no separate label/state fields; search moved to a header button on every
screen size, the phone number into the menu's contact block), the old hero class name is gone, button text is displayed
in capitals by CSS (the underlying text is unchanged), and widening the window closes the menu.

New features checked: quick add saves the shown colour with "Please help me find my size" and opens the bag drawer;
Escape closes the drawer and returns focus to the button that opened it; the drawer links to the bag page and closes;
search focuses its input, finds products as you type, and Enter opens the first result; the phone add-bar appears once
the main button scrolls away, including after an instant jump (a bug found and fixed during review). 0 page errors.

### B2. Navigation

Same 19-step session: all client-side, titles and `aria-current` correct, Back/Forward correct, **0 4xx (171 requests),
0 console errors or warnings.**

### B3. Accessibility (axe-core, WCAG 2.2 A/AA + best practice)

All 22 routes at 1280 and 390 px, plus the filled bag and the open menu, search and bag dialogs: **0 violations.** Issues
found and fixed on the way: decorative footer wordmark contrast (now CSS-generated), heading order (structural headings
added), the logo link's accessible name, the announcement bar outside a landmark, and the quick-add name after adding.

### B4. Visual review

Every page was reviewed at 1440 and 390 px, plus the menu, search, drawer, quick-add, scrolled-header and phone add-bar
states. Fixes from review: headline line breaks, a beige box around some catalogue photos (now blended by a mild
brightness lift), the static brand row under reduced motion, footer wordmark clipping and colour, the phone announcement
bar wrapping, category numbers colliding with photos on phones, and eyebrows sharing a line with the Visit page's phone
and email.

### Not covered

Real phones and tablets (all mobile checks are Chrome emulation), Safari and Firefox, screen readers, and live-network
performance (Lighthouse is run on the deployed site).
