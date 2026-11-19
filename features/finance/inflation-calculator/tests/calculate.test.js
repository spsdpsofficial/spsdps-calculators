import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateInflation, impliedInflation } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("calculateInflation", () => {
  it("₹1L at 6% for 10 years costs ₹1,79,085 and buys ₹55,839 worth (Python reference)", () => {
    const r = calculateInflation({ amount: 100000, inflationPercent: 6, years: 10 });
    expect(r.futureCost).toBeCloseTo(179084.77, 2);
    expect(r.purchasingPower).toBeCloseTo(55839.48, 2);
  });
  it("zero inflation changes nothing", () => {
    expect(calculateInflation({ amount: 500, inflationPercent: 0, years: 5 }).futureCost).toBe(500);
  });
  it("impliedInflation reverses the calculation", () => {
    expect(impliedInflation({ oldPrice: 100, newPrice: 179.08477, years: 10 })).toBeCloseTo(6, 3);
  });
});

describe("Inflation spec", () => {
  it("runs with defaults and validates", () => {
    expect(runSpec(spec).out.rows[0].value).toBe("₹1,79,085");
    expect(isRejected(spec, { rate: "-1" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(Math.round(calculateInflation(e.input).futureCost)).toBe(e.future);
  });
});
