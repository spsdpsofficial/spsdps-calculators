import { CATEGORIES } from "./categories";
import { TOOLS } from "./catalogue";

export { CATEGORIES, TOOLS };

export const toolId = (tool) => `${tool.category}/${tool.slug}`;
export const toolPath = (tool) => `/${tool.category}/${tool.slug}/`;
export const categoryPath = (category) => `/${category.slug}/`;

export const isLive = (tool) => tool.status === "live";

export function getCategory(slug) {
  return CATEGORIES.find((category) => category.slug === slug) || null;
}

export function getTool(categorySlug, toolSlug) {
  return TOOLS.find((tool) => tool.category === categorySlug && tool.slug === toolSlug) || null;
}

/** Resolve a "category/slug" id (used in content `related` lists). */
export function getToolById(id) {
  const [categorySlug, toolSlug] = String(id).split("/");
  return getTool(categorySlug, toolSlug);
}

export const getToolsByCategory = (categorySlug) => TOOLS.filter((tool) => tool.category === categorySlug);
export const getLiveTools = () => TOOLS.filter(isLive);
export const getLiveToolsByCategory = (categorySlug) => getToolsByCategory(categorySlug).filter(isLive);

/** A category page is only worth indexing once it lists at least one live tool. */
export const categoryHasLiveTools = (categorySlug) => getLiveToolsByCategory(categorySlug).length > 0;
