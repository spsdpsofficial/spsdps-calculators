import { describe, expect, it } from "vitest";
import { formatCompactINR, formatDateLong, formatINR, formatNumber, formatPercent } from "./index";
import { clamp, parseNumber, sanitizeNumericInput } from "../helpers/numbers";

describe("formatINR", () => {
  it("uses lakh/crore digit grouping", () => {
    expect(formatINR(1000000).replace(/\s/g, "")).toBe("₹10,00,000");
    expect(formatINR(123456789).replace(/\s/g, "")).toBe("₹12,34,56,789");
    expect(formatINR(1234.5, { decimals: 2 }).replace(/\s/g, "")).toBe("₹1,234.50");
  });
  it("never throws on bad input", () => {
    expect(formatINR(Number.NaN)).toBe("—");
    expect(formatINR(Number.POSITIVE_INFINITY)).toBe("—");
  });
});

describe("formatCompactINR / formatNumber / formatPercent", () => {
  it("expresses large amounts in lakh and crore", () => {
    expect(formatCompactINR(1500000)).toBe("₹15 lakh");
    expect(formatCompactINR(25000000)).toBe("₹2.5 crore");
    expect(formatCompactINR(85000).replace(/\s/g, "")).toBe("₹85,000");
  });
  it("formats numbers and percentages", () => {
    expect(formatNumber(1234567.891)).toBe("12,34,567.89");
    expect(formatPercent(8.5)).toBe("8.5%");
  });
});

describe("formatDateLong", () => {
  it("formats date-only strings without timezone drift", () => {
    expect(formatDateLong("2026-11-11")).toBe("11 November 2026");
    expect(formatDateLong("2026-01-01")).toBe("1 January 2026");
  });
  it("returns an empty string for invalid dates", () => {
    expect(formatDateLong("nope")).toBe("");
  });
});

describe("parseNumber", () => {
  it.each([
    ["1000000", 1000000],
    ["10,00,000", 1000000],
    ["₹ 25,000", 25000],
    ["8.5", 8.5],
    [".5", 0.5],
    [7, 7],
  ])("parses %s", (input, expected) => {
    expect(parseNumber(input)).toBe(expected);
  });

  it.each(["", "  ", "abc", "-5", "+5", "1e5", "1.2.3", "5%", null, undefined, Number.NaN, {}])(
    "rejects %s",
    (input) => {
      expect(Number.isNaN(parseNumber(input))).toBe(true);
    },
  );
});

describe("sanitizeNumericInput / clamp", () => {
  it("strips junk and keeps a single decimal point", () => {
    expect(sanitizeNumericInput("₹1,0a0.5.5")).toBe("100.55");
    expect(sanitizeNumericInput("<script>")).toBe("");
  });
  it("clamps into range", () => {
    expect(clamp(5, 1, 3)).toBe(3);
    expect(clamp(-1, 1, 3)).toBe(1);
    expect(clamp(2, 1, 3)).toBe(2);
  });
});
