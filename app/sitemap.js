import { absoluteUrl } from "@/lib/seo/metadata";
import { LEGAL } from "@/lib/content/legal";
import { GUIDES } from "@/lib/content/guides";
import { CATEGORIES, categoryHasLiveTools, categoryPath, getLiveTools, toolPath } from "@/lib/tools";
import { siteConfig } from "@/lib/constants/site";

export const dynamic = "force-static";

// Only indexable pages belong here: the home page, categories with at least one live tool,
// live tools and the trust pages. Planned tools are never listed.
export default function sitemap() {
  const buildDate = new Date();

  const home = [{ url: absoluteUrl("/"), lastModified: buildDate, changeFrequency: "weekly", priority: 1 }];

  const categories = CATEGORIES.filter((category) => categoryHasLiveTools(category.slug)).map((category) => ({
    url: absoluteUrl(categoryPath(category)),
    lastModified: buildDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const tools = getLiveTools().map((tool) => ({
    url: absoluteUrl(toolPath(tool)),
    lastModified: new Date(`${tool.lastReviewed}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const trustPages = Object.values(LEGAL).map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: new Date(`${siteConfig.legalReviewed}T00:00:00Z`),
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  const guides = [{ url: absoluteUrl(GUIDES.path), lastModified: new Date(`${GUIDES.updated}T00:00:00Z`), changeFrequency: "monthly", priority: 0.6 }];

  return [...home, ...categories, ...tools, ...guides, ...trustPages];
}
