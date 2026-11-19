import { CATEGORIES } from "./categories";
import { TOOLS } from "./catalogue";
import { isLive, toolPath } from "./index";
import { POPULAR_TOOL_IDS } from "./menu";

const categoryName = new Map(CATEGORIES.map((c) => [c.slug, c.navName]));

/** Searchable entries for every live tool. Built lazily, once, only when the search dialog opens. */
export function buildSearchIndex() {
  return TOOLS.filter(isLive).map((tool) => ({
    id: `${tool.category}/${tool.slug}`,
    name: tool.name,
    description: tool.description,
    category: categoryName.get(tool.category) ?? "",
    href: toolPath(tool),
    haystackName: tool.name.toLowerCase(),
    haystackKeyword: tool.keyword.toLowerCase(),
    haystackRest: `${tool.description} ${categoryName.get(tool.category) ?? ""}`.toLowerCase(),
  }));
}

/**
 * Every word typed must match somewhere. Name matches rank above keyword matches, which rank above description
 * matches; a name that starts with the word ranks highest. Ties keep catalogue order.
 */
export function searchTools(index, query, limit = 8) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  const scored = [];
  index.forEach((entry, order) => {
    let score = 0;
    for (const word of words) {
      let wordScore = 0;
      if (entry.haystackName.startsWith(word)) wordScore = 6;
      else if (entry.haystackName.includes(` ${word}`)) wordScore = 5;
      else if (entry.haystackName.includes(word)) wordScore = 4;
      else if (entry.haystackKeyword.includes(word)) wordScore = 3;
      else if (entry.haystackRest.includes(word)) wordScore = 1;
      if (wordScore === 0) return;
      score += wordScore;
    }
    scored.push({ entry, score, order });
  });
  return scored
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, limit)
    .map((item) => item.entry);
}

/** What to show before anything is typed. */
export function popularEntries(index, limit = 6) {
  const byId = new Map(index.map((entry) => [entry.id, entry]));
  return POPULAR_TOOL_IDS.map((id) => byId.get(id)).filter(Boolean).slice(0, limit);
}
