// Single source of truth for site-wide identity. Change the brand name, maker or contact address
// here only. Nothing else should hard-code them.

const rawUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").trim().replace(/\/+$/, "");

export const siteConfig = {
  name: "SPSDPS Calculators",
  shortName: "SPSDPS",
  tagline: "Calculator & Daily Utilities",
  maker: "Devendra Pratap Singh",
  description: "Free, accurate everyday calculators and online tools for India.",
  // Verified production origin. Falls back to a placeholder so builds never break.
  url: rawUrl || "https://www.example.com",
  isSiteUrlConfigured: Boolean(rawUrl),
  logoPath: "/icons/icon-512.png",
  defaultLocale: "en-IN",
  ogLocale: "en_IN",
  // Public contact address (shown on the Contact page and used by its form). Override with NEXT_PUBLIC_CONTACT_EMAIL.
  contactEmail: (process.env.NEXT_PUBLIC_CONTACT_EMAIL || "").trim() || "spsdps.official@gmail.com",
  // Other sites by the same maker, linked from the footer. Remove an entry to hide it.
  relatedSites: [{ name: "PDF & Image Tools", url: "https://filetools.spsdps.com/" }],
  // Search engines index the site only when explicitly enabled (see .env.example).
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
  searchConsoleToken: (process.env.NEXT_PUBLIC_GSC_VERIFICATION || "").trim(),
  gaMeasurementId: (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "").trim(),
  adsEnabled: process.env.NEXT_PUBLIC_ADS_ENABLED === "true",
  // Date the legal/boilerplate pages were last reviewed (ISO, YYYY-MM-DD).
  legalReviewed: "2026-11-18",
};

export const defaultOgImage = {
  url: "/og-default.png",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} - everyday calculators for India`,
};
