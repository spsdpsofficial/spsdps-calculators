import { defaultOgImage, siteConfig } from "@/lib/constants/site";
import { categoryPath, categoryHasLiveTools, getCategory, getTool, isLive, toolPath } from "@/lib/tools";

/** Absolute URL for a site path (used in sitemap and structured data). */
export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Robots directives. Indexing is off globally unless explicitly enabled for production. */
export function robotsFor({ noindex = false } = {}) {
  const index = siteConfig.allowIndexing && !noindex;
  return {
    index,
    follow: index,
    googleBot: { index, follow: index, "max-image-preview": "large", "max-snippet": -1 },
  };
}

/**
 * Build Next.js `metadata` for any page. `path` must be the clean, trailing-slash URL path
 * (relative: it is resolved against `metadataBase` set in the root layout).
 */
export function buildMetadata({ title, description, path, keywords, noindex = false, type = "website" }) {
  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: path },
    robots: robotsFor({ noindex }),
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.ogLocale,
      type,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage.url],
    },
  };
}

export function buildCategoryMetadata(categorySlug) {
  const category = getCategory(categorySlug);
  if (!category) throw new Error(`Unknown category "${categorySlug}"`);
  return buildMetadata({
    title: category.title,
    description: category.description,
    path: categoryPath(category),
    // Thin until at least one tool is live: keep it out of the index.
    noindex: !categoryHasLiveTools(categorySlug),
  });
}

/** `content` is the tool's content.js export (seo.title, seo.description, seo.keywords). */
export function buildToolMetadata(categorySlug, toolSlug, content) {
  const tool = getTool(categorySlug, toolSlug);
  if (!tool) throw new Error(`Unknown tool "${categorySlug}/${toolSlug}" - add it to lib/tools/catalogue.js`);
  return buildMetadata({
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords,
    path: toolPath(tool),
    // A tool that is not "live" can never be indexed, even if its route exists.
    noindex: !isLive(tool),
  });
}
