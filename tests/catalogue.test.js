import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { CATEGORIES, TOOLS, getLiveTools, toolPath } from "@/lib/tools";

const root = path.resolve(import.meta.dirname, "..");
const exists = (...parts) => fs.existsSync(path.join(root, ...parts));

describe("tool catalogue integrity", () => {
  it("has six categories and fifty tools", () => {
    expect(CATEGORIES).toHaveLength(6);
    expect(TOOLS).toHaveLength(81);
  });

  it("uses unique, url-safe slugs inside each category", () => {
    const seen = new Set();
    for (const tool of TOOLS) {
      expect(tool.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      const id = `${tool.category}/${tool.slug}`;
      expect(seen.has(id), `duplicate tool ${id}`).toBe(false);
      seen.add(id);
    }
  });

  it("assigns every tool to a known category", () => {
    const known = new Set(CATEGORIES.map((category) => category.slug));
    for (const tool of TOOLS) expect(known.has(tool.category), tool.slug).toBe(true);
  });

  it("has a category route and a feature folder for every tool", () => {
    for (const category of CATEGORIES) expect(exists("app", category.slug, "page.js"), category.slug).toBe(true);
    for (const tool of TOOLS) expect(exists("features", tool.category, tool.slug), `${tool.category}/${tool.slug}`).toBe(true);
  });

  it("gives every live tool a route, content, tests, calculation and a review date", () => {
    const live = getLiveTools();
    expect(live.length).toBeGreaterThan(0);
    for (const tool of live) {
      const id = `${tool.category}/${tool.slug}`;
      expect(exists("app", tool.category, tool.slug, "page.js"), `${id} route`).toBe(true);
      expect(exists("features", tool.category, tool.slug, "content.js"), `${id} content`).toBe(true);
      expect(exists("features", tool.category, tool.slug, "index.js"), `${id} index`).toBe(true);
      expect(exists("features", tool.category, tool.slug, "calculations"), `${id} calculations`).toBe(true);
      expect(exists("features", tool.category, tool.slug, "tests"), `${id} tests`).toBe(true);
      expect(tool.lastReviewed, `${id} lastReviewed`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("builds clean trailing-slash paths", () => {
    expect(toolPath({ category: "finance", slug: "emi-calculator" })).toBe("/finance/emi-calculator/");
  });
});

describe("live tool content quality gates", async () => {
  for (const tool of getLiveTools()) {
    const { content } = await import(`@/features/${tool.category}/${tool.slug}/content.js`);
    const id = `${tool.category}/${tool.slug}`;

    it(`${id}: SEO text fits search-result limits`, () => {
      expect(content.seo.title.length).toBeLessThanOrEqual(45);
      expect(content.seo.description.length).toBeGreaterThanOrEqual(110);
      expect(content.seo.description.length).toBeLessThanOrEqual(165);
    });

    it(`${id}: has every required content section`, () => {
      expect(content.h1).toBeTruthy();
      expect(content.intro.length).toBeGreaterThanOrEqual(1);
      expect(content.howTo.length).toBeGreaterThanOrEqual(3);
      expect(content.formula.expression).toBeTruthy();
      expect(content.formula.variables.length).toBeGreaterThanOrEqual(1);
      expect(content.example.inputs.length).toBeGreaterThanOrEqual(1);
      expect(content.example.results.length).toBeGreaterThanOrEqual(1);
      expect(content.factors.length).toBeGreaterThanOrEqual(1);
      expect(content.benefits.length).toBeGreaterThanOrEqual(1);
      expect(content.assumptions.length).toBeGreaterThanOrEqual(1);
      expect(content.references.length).toBeGreaterThanOrEqual(1);
    });

    it(`${id}: has 5-8 FAQs and unique questions`, () => {
      expect(content.faqs.length).toBeGreaterThanOrEqual(5);
      expect(content.faqs.length).toBeLessThanOrEqual(8);
      expect(new Set(content.faqs.map((faq) => faq.q)).size).toBe(content.faqs.length);
    });

    it(`${id}: related ids exist in the catalogue and references are https`, () => {
      const ids = new Set(TOOLS.map((t) => `${t.category}/${t.slug}`));
      for (const related of content.related) expect(ids.has(related), related).toBe(true);
      for (const reference of content.references) expect(reference.url.startsWith("https://")).toBe(true);
    });

    it(`${id}: contains no unfinished TODO markers`, () => {
      expect(JSON.stringify(content)).not.toMatch(/TODO|FIXME|lorem ipsum/i);
    });
  }
});
