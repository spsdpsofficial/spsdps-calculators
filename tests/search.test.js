import { describe, expect, it } from "vitest";
import { buildSearchIndex, popularEntries, searchTools } from "@/lib/tools/search";

const index = buildSearchIndex();

describe("tool search", () => {
  it("indexes every live tool", () => {
    expect(index).toHaveLength(81);
  });
  it("finds the obvious tool first", () => {
    expect(searchTools(index, "emi")[0].id).toBe("finance/emi-calculator");
    expect(searchTools(index, "sip")[0].id).toBe("finance/sip-calculator");
    expect(searchTools(index, "bmi")[0].id).toBe("health/bmi-calculator");
    expect(searchTools(index, "gst")[0].name).toMatch(/GST/);
  });
  it("matches several words in any order and ignores case", () => {
    expect(searchTools(index, "TAX income")[0].id).toBe("salary-tax/income-tax");
    expect(searchTools(index, "home loan").map((r) => r.id)).toContain("finance/home-loan");
  });
  it("matches on description words and returns nothing for gibberish or blank", () => {
    expect(searchTools(index, "qqqzzz")).toEqual([]);
    expect(searchTools(index, "   ")).toEqual([]);
    expect(searchTools(index, "pension").length).toBeGreaterThan(0);
  });
  it("respects the limit and shows popular tools for an empty box", () => {
    expect(searchTools(index, "calculator", 3)).toHaveLength(3);
    expect(popularEntries(index, 6)).toHaveLength(6);
    expect(popularEntries(index)[0].id).toBe("finance/emi-calculator");
  });
});
