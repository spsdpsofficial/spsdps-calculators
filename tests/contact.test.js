import { describe, expect, it } from "vitest";
import { buildGmailLink, buildMailto, validateContact } from "@/lib/contact";
import { GUIDES, GOALS } from "@/lib/content/guides";
import { siteConfig } from "@/lib/constants/site";
import { getToolById } from "@/lib/tools";
import { GLOSSARY, FAQS } from "@/lib/content/guides";

const ok = { name: "Asha", email: "asha@example.com", topic: "Question", page: "", message: "Hello, this is a test." };

describe("contact form", () => {
  it("accepts valid input and rejects bad input", () => {
    expect(validateContact(ok)).toEqual({});
    const bad = validateContact({ ...ok, name: "", email: "x", message: "hi" });
    expect(Object.keys(bad).sort()).toEqual(["email", "message", "name"]);
  });
  it("addresses only the site email", () => {
    expect(siteConfig.contactEmail).toBe("spsdps.official@gmail.com");
    expect(buildMailto(ok)).toMatch(/^mailto:spsdps\.official@gmail\.com\?/);
    const g = new URL(buildGmailLink(ok));
    expect(g.searchParams.get("to")).toBe("spsdps.official@gmail.com");
    expect(g.searchParams.get("body")).toContain("Hello, this is a test.");
  });
  it("names the maker", () => {
    expect(siteConfig.maker).toBe("Devendra Pratap Singh");
  });
});

describe("guides content", () => {
  it("only links to existing live tools", () => {
    for (const g of GOALS) for (const id of g.tools) expect(getToolById(id)?.status, id).toBe("live");
  });
  it("fits SEO length limits", () => {
    expect(GUIDES.title.length).toBeLessThanOrEqual(60);
    expect(GUIDES.description.length).toBeGreaterThanOrEqual(110);
    expect(GUIDES.description.length).toBeLessThanOrEqual(165);
    expect(GLOSSARY.length).toBeGreaterThan(8);
    expect(FAQS.length).toBeGreaterThan(3);
  });
});
