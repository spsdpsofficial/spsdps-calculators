import { describe, expect, it } from "vitest";
import { CATEGORIES, TOOLS, isLive, toolId } from "@/lib/tools";
import { MENU_GROUPS, POPULAR_TOOL_IDS, buildNavMenu, getCategoryGroups, getToolIcon } from "@/lib/tools/menu";

describe("menu structure", () => {
  it("has groups for every category and nothing else", () => {
    expect(Object.keys(MENU_GROUPS).sort()).toEqual(CATEGORIES.map((c) => c.slug).sort());
  });
  it("lists every live tool exactly once, and only tools that exist", () => {
    const listed = Object.entries(MENU_GROUPS).flatMap(([category, groups]) => groups.flatMap((g) => g.tools.map((slug) => `${category}/${slug}`)));
    expect(new Set(listed).size).toBe(listed.length);
    const live = TOOLS.filter(isLive).map(toolId).sort();
    expect([...listed].sort()).toEqual(live);
  });
  it("keeps groups readable: 2 to 12 tools each and at most 4 groups per category", () => {
    for (const groups of Object.values(MENU_GROUPS)) {
      expect(groups.length).toBeLessThanOrEqual(4);
      for (const g of groups) {
        expect(g.tools.length).toBeGreaterThanOrEqual(2);
        expect(g.tools.length).toBeLessThanOrEqual(12);
      }
    }
  });
  it("builds a compact nav menu whose counts match", () => {
    const menu = buildNavMenu();
    expect(menu).toHaveLength(CATEGORIES.length);
    for (const entry of menu) {
      expect(entry.groups.flatMap((g) => g.tools)).toHaveLength(entry.count);
      for (const [name, href] of entry.groups.flatMap((g) => g.tools)) {
        expect(name.length).toBeGreaterThan(0);
        expect(href).toMatch(/^\/[a-z-]+\/[a-z0-9-]+\/$/);
      }
    }
  });
  it("popular tools exist and are live; icons resolve", () => {
    expect(new Set(POPULAR_TOOL_IDS).size).toBe(POPULAR_TOOL_IDS.length);
    const live = new Set(TOOLS.filter(isLive).map(toolId));
    for (const id of POPULAR_TOOL_IDS) expect(live.has(id)).toBe(true);
    expect(getCategoryGroups("finance")[0].tools[0].slug).toBe("emi-calculator");
    expect(getToolIcon(TOOLS.find((t) => t.slug === "emi-calculator"))).toBe("bank");
  });
});
