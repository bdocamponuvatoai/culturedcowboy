import "server-only";

// Deployment settings, read from the environment at build time (see .env.example).

const LOCAL_URL = "http://localhost:3000";

function resolveSiteUrl(): string {
  const configured =
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : LOCAL_URL);
  const url = configured.trim().replace(/\/+$/, "");
  // Throws on anything that is not an absolute URL.
  new URL(url);
  return url;
}

/** Absolute origin used for canonical URLs, Open Graph and the sitemap. No trailing slash. */
export const siteUrl = resolveSiteUrl();

/** Search engines may index the site only when this is explicitly enabled. */
export const isIndexable = process.env.SITE_INDEXABLE === "true";

if (isIndexable && /^https?:\/\/(localhost|127\.0\.0\.1)(:|$)/.test(siteUrl)) {
  throw new Error(
    "SITE_INDEXABLE=true but the site URL is still localhost. Set SITE_URL to the public domain before enabling indexing.",
  );
}
