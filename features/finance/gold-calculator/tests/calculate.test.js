import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateGold } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("calculateGold", () => {
  it("10 g of 22K at ₹10,000/g, 10% making, 3% GST → ₹1,03,782.80 (Python reference)", () => {
    const r = calculateGold({ weightGrams: 10, ratePerGram: 10000, purity: 0.916, makingPercent: 10, gstPercent: 3 });
    expect(r.metal).toBeCloseTo(91600, 6);
    expect(r.making).toBeCloseTo(9160, 6);
    expect(r.subtotal).toBeCloseTo(100760, 6);
    expect(r.gst).toBeCloseTo(3022.8, 6);
    expect(r.total).toBeCloseTo(103782.8, 6);
  });
  it("no making charges or GST leaves the metal value", () => {
    expect(calculateGold({ weightGrams: 5, ratePerGram: 100, purity: 1, makingPercent: 0, gstPercent: 0 }).total).toBe(500);
  });
});

describe("Gold spec", () => {
  it("runs with defaults and validates", () => {
    expect(runSpec(spec).out.rows[0].value).toBe("₹1,03,782.80");
    expect(isRejected(spec, { weight: "0" })).toBe(true);
    expect(isRejected(spec, { making: "80" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateGold(e.input).total.toFixed(2)).toBe(e.total);
  });
});
