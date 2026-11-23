# Source notes

Reviewed 24 November 2026 (Asia/Manila). Primary business source: https://culturedcowboy.com/ . No third-party reviews or customer metrics are presented.

## Business

- Main website: business name, (864) 223-3700, cowboy@culturedcowboy.com, Greenwood store, personal phone/email ordering.
- Store page: https://culturedcowboy.com/indeximages/ourstore/ourstore.html — Western and biker products, store history and local presence.
- CC Rider: https://culturedcowboy.com/cc_rider/index.htm — biker division.
- Address supplied by the user and corroborated against the store site: 1521 Bypass 72 NE, Greenwood, South Carolina.
- Hours on older pages vary. This concept says to call ahead rather than publishing a potentially stale schedule.
- Internal prospect appointment details are not included in the website.

## Product sources

Each `source` field in `src/content/catalog.ts` links to its original listing.

- https://culturedcowboy.com/boots/RWatson/pages/index.htm
- https://culturedcowboy.com/boots/RWatson/pages/RW7001.htm
- https://culturedcowboy.com/boots/RWatson/pages/RWL8400-1.htm
- https://culturedcowboy.com/hats/stetson/pages/StetsonFurFelts.htm
- https://culturedcowboy.com/cc_rider/schott/pages/118.htm
- https://culturedcowboy.com/cc_rider/schott/pages/141.html
- https://culturedcowboy.com/cinch/pages/cnchshirtindex.htm

Original images and brand marks were downloaded from the primary website. `original-assets.json` gives exact paths, URLs, and byte sizes. Image files are unmodified. On screen, CSS scales them to fit (never past 1.25× their real width on product pages) and applies a mild brightness/contrast lift so the light backdrops of several photos blend into the page. Brand marks are displayed as brand identifiers, without suggesting new partnerships or endorsements. R. Watson appears as plain text rather than a reconstructed logo.

Source pages contain older pricing and conflicting/copy-pasted descriptions. Prices were intentionally omitted; clear product titles, catalogue category pages, image context and consistent descriptive details were prioritized. The RW7001 title identifies Chocolate Ranch Hand, whereas part of its prose says Black; the title/category identification is used. Photos are catalogue references, not proof of live stock.

Old email credit-card collection instructions and unrelated/spam content were excluded. The site never requests card details and never submits an order automatically.

## Editorial photography

The three lifestyle scenes (`src/assets/images/editorial/`: western, biker, craft, each with a 720px variant) are AI-generated illustrations, not photographs of the store, its staff, or products for sale. The site labels each one "AI-generated editorial imagery". They should be replaced with real photography before launch if the owner can supply it.

## Fonts

- DM Sans by Colophon Foundry (SIL Open Font License), self-hosted from `src/assets/fonts/` with its licence: https://fonts.google.com/specimen/DM+Sans
- Instrument Serif by Instrument (SIL Open Font License), downloaded at build time by `next/font/google` and served from this site: https://fonts.google.com/specimen/Instrument+Serif
