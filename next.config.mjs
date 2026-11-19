/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pre-render every route to plain static files in `out/` (no Node server, no database).
  output: "export",
  // One consistent URL policy: /finance/emi-calculator/ (matches canonical URLs).
  trailingSlash: true,
  // next/image runtime optimisation is not available in a static export.
  images: { unoptimized: true },
  reactStrictMode: true,
  // Never ship source maps to visitors. (Browser JS can be minified, not hidden.)
  productionBrowserSourceMaps: false,
  // Do not advertise the framework in responses.
  poweredByHeader: false,
};

if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_SITE_URL) {
  console.warn(
    "\n[spsdps-calculators] NEXT_PUBLIC_SITE_URL is not set. Canonical, sitemap and Open Graph URLs " +
      "will use a placeholder. Set it to your verified production domain before launch.\n",
  );
}

export default nextConfig;
