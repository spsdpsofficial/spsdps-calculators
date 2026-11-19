import { siteConfig } from "@/lib/constants/site";

export const dynamic = "force-static";

// Crawling is allowed only when NEXT_PUBLIC_ALLOW_INDEXING=true (production launch).
// Every other deployment (previews, staging, forgotten test URLs) is closed to crawlers.
export default function robots() {
  if (!siteConfig.allowIndexing) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
