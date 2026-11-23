# Cultured Cowboy — Western & Biker

Website for Cultured Cowboy, a Western and biker clothing store at 1521 Bypass 72 NE, Greenwood, South Carolina.
It is a fully static Next.js site: a curated catalogue with instant search, product pages with colour, size and
quantity, and a "request bag" (with a slide-out drawer and quick add) that turns a visitor's picks into an email
inquiry. There is no checkout, payment or server.

## Getting started

Requires Node.js 20.9 or newer (CI and `.nvmrc` use the current LTS, 26).

```sh
npm ci
npm run dev        # http://localhost:3000
```

Production build (static export to `out/`):

```sh
npm run build
npm run preview    # serves out/ locally
```

## Scripts

| Script                 | What it does                                                                     |
| ---------------------- | -------------------------------------------------------------------------------- |
| `npm run dev`          | Development server with hot reload.                                              |
| `npm run build`        | Static export to `out/`, then `postbuild` (below).                               |
| `postbuild`            | `scripts/fix-export-segments.mjs`: works around a Windows export bug (see file). |
| `npm run preview`      | Serves `out/` with `serve` (fetched on demand, not a dependency).                |
| `npm run typecheck`    | Generates route types (`next typegen`) and runs `tsc --noEmit`.                  |
| `npm run lint`         | ESLint (Next.js core-web-vitals + TypeScript rules).                             |
| `npm run format`       | Prettier, write.                                                                 |
| `npm run format:check` | Prettier, check only.                                                            |
| `npm run check`        | `typecheck` + `lint` + `format:check` (what CI runs before building).            |

## Project structure

```
src/
  app/              routes (App Router). One folder per page; [slug] routes are fully
                    pre-generated (generateStaticParams, dynamicParams = false).
                    layout.tsx, not-found.tsx, icon.svg, robots.ts, sitemap.ts
  components/
    layout/         announcement bar, header (opens menu / search / bag), mobile menu, footer
    sections/       sections shared by several pages (page intro, editorial split, FAQ, CTA band, …)
    home/           home-page sections, including the hero scene switch
    catalogue/      search / maker / sort / category filters
    search/         the instant-search dialog
    product/        gallery, colour/size/quantity picker (with the phone add-bar), quick add
    bag/            the bag page, bag drawer, bag line item, useBag hook
    ui/             Icon + Sparkle, links (SmartLink/ButtonLink/TextLink), Sheet (native <dialog>),
                    QuantityStepper, Eyebrow, Brand, ProductCard, EditorialImage
    seo/            JSON-LD
  config/
    site.ts         business details + navigation (safe for client code)
    deployment.ts   SITE_URL / SITE_INDEXABLE (server only)
  content/          typed copy: products and collections, FAQs, editorial images
  lib/              framework-free helpers: page metadata, inquiry text + mailto, bag store, ui events
  styles/           globals.css → base/ (tokens, type, layout), components/, sections/, pages/;
                    fonts.ts (DM Sans local + Instrument Serif via next/font)
  assets/           images (static imports) and the self-hosted DM Sans font
scripts/            fix-export-segments.mjs
docs/               sources.md (where every fact came from), verification.md (test evidence),
                    original-assets.json (where each catalogue image came from)
```

## Conventions

- **Server Components by default.** Client components are limited to real interactivity: header and its
  sheets (menu, search, bag drawer), hero switch, catalogue filters, gallery, picker, quick add and the bag.
- **Content lives in `src/content/` and `src/config/site.ts`.** Never hard-code a phone number, address or
  product fact in a component. Every business fact is sourced in `docs/sources.md`; do not add hours,
  prices, reviews or claims that the owner has not supplied.
- **Design tokens** (colours, type, spacing, motion) live in `src/styles/base/tokens.css`; use them rather than
  new hex values. Headlines are Instrument Serif; an `<em>` in an `h1`/`h2` becomes the italic accent line
  (add `heading--inline` to keep it on the same line). Labels use `.eyebrow` / `.micro`.
- **Styles are plain global CSS** with component class names (`.product-card__name`), imported in layers from
  `src/styles/globals.css`. Motion is decorative only and switches off under `prefers-reduced-motion`.
- **Overlays use the `Sheet` component** (a native modal `<dialog>`): focus trap, Escape, inert page and focus
  return come from the browser. Open the bag drawer from anywhere with `openBagDrawer()` (`src/lib/ui-events.ts`).
- **Catalogue photos are small originals.** They sit on a warm "stage" and are never enlarged past ~1.25× their real
  width, so they stay sharp; a mild CSS brightness lift blends their light backdrops into the stage.
- **Text next to an inline element keeps its space in a string literal**, e.g. `{"Saved. "}<Link …>`.
  Prettier otherwise rewraps it as `Saved.{" "}`, which renders two DOM text nodes and shifts the line by a
  sub-pixel. The DOM check in `docs/verification.md` caught exactly this.
- **Links:** `SmartLink` (and `ButtonLink` / `TextLink`) use `next/link` for internal paths and plain
  anchors for `tel:`, `mailto:` and external URLs.
- **Images** are static imports through `next/image`. Editorial photos use `EditorialImage`, which keeps
  their 720w/1800w `srcset`. Images ship unoptimised (static export); see follow-ups below.
- **The request bag** is stored in `localStorage` under `cultured-cowboy-request-v1` (max 24 lines,
  1–20 each) and read with `useSyncExternalStore`. Nothing is sent anywhere: the inquiry opens the
  visitor's own email app, or is copied or downloaded.

## Routes

| Path                          | Page                                                                    |
| ----------------------------- | ----------------------------------------------------------------------- |
| `/`                           | Home                                                                    |
| `/shop/`                      | Full catalogue with search, maker filter, sort and category chips       |
| `/collections/[slug]/`        | `boots`, `hats`, `leather`, `western-wear`, `western` (all non-leather) |
| `/products/[slug]/`           | 8 product pages                                                         |
| `/bag/`                       | Request bag and inquiry (noindex)                                       |
| `/about/`, `/visit/`          | Story; address, phone, email, directions                                |
| `/how-to-order/`              | Ordering process and FAQ                                                |
| `/fit-guide/`, `/privacy/`    | Fit guidance; what the site stores                                      |
| `/robots.txt`, `/sitemap.xml` | Generated from `src/app/robots.ts` and `src/app/sitemap.ts`             |
| anything else                 | Styled 404 (`src/app/not-found.tsx` → `out/404.html`)                   |

## Configuration

Read at build time. Copy `.env.example` to `.env.local` to override locally.

| Variable         | Default                                                                | Purpose                                                                                                      |
| ---------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `SITE_URL`       | `https://$VERCEL_PROJECT_PRODUCTION_URL`, else `http://localhost:3000` | Origin for canonical URLs, Open Graph, sitemap. No trailing slash.                                           |
| `SITE_INDEXABLE` | `false`                                                                | `true` allows indexing (robots meta + robots.txt). Requires a real `SITE_URL`; the build fails on localhost. |

While `SITE_INDEXABLE` is not `true`, every page is `noindex, nofollow` and `robots.txt` disallows all crawling.

## Before launch

- [ ] Owner approves all copy, product selection and the AI-generated editorial photography (or supplies real photos).
- [ ] Owner confirms the phone number, email and address, and decides whether to publish opening hours.
- [ ] Custom domain connected; `SITE_URL` set to it for Production.
- [ ] `SITE_INDEXABLE=true` set for Production only, then redeploy.
- [ ] Check `robots.txt`, `sitemap.xml` and canonical URLs on the live domain.
- [ ] Run Lighthouse on the live home page and a product page.
- [ ] Submit `sitemap.xml` in Google Search Console.

## CI

`.github/workflows/ci.yml` runs on every push to `main` and on pull requests: `npm ci` → `npm run check` →
`npm run build`, then uploads `out/` as the `site` artifact. Dependabot (`.github/dependabot.yml`) opens weekly
npm updates (Next/React grouped) and monthly GitHub Actions updates.

## Hosting

Any static host that serves `dir/index.html` for `dir/` and `404.html` for missing paths works. The project is set
up for Vercel: `vercel.json` adds security headers (`X-Content-Type-Options`, `Referrer-Policy`,
`X-Frame-Options`, `Permissions-Policy`, `Strict-Transport-Security`) and the trailing-slash redirect.

<!-- deployment section is completed after the first deploy -->

## Follow-ups

- **Real photography.** The three lifestyle images are AI-generated (labelled on the site); the catalogue photos are
  small originals (266–543 px wide). Owner-supplied photos would lift the site most, then responsive variants for them.
- **ESLint 10** once `eslint-config-next`'s React plugin declares support (Dependabot holds ESLint majors until then).
- **WOFF2 font.** DM Sans ships as a 240 KB TTF; a lossless WOFF2 conversion would roughly halve it.
