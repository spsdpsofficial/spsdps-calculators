import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateCagr } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("calculateCagr", () => {
  it("₹1L → ₹2.5L in 5 years is 20.1124% (Python reference)", () => {
    const r = calculateCagr({ startValue: 100000, endValue: 250000, years: 5 });
    expect(r.cagrPercent).toBeCloseTo(20.1124, 3);
    expect(r.totalReturnPercent).toBe(150);
    expect(r.doublingYears).toBeCloseTo(3.78, 2);
  });
  it("handles a loss and a flat result", () => {
    const loss = calculateCagr({ startValue: 100, endValue: 50, years: 2 });
    expect(loss.cagrPercent).toBeCloseTo(-29.289, 2);
    expect(loss.doublingYears).toBeNull();
    expect(calculateCagr({ startValue: 100, endValue: 100, years: 3 }).cagrPercent).toBe(0);
  });
});

describe("CAGR spec", () => {
  it("runs with defaults and validates", () => {
    expect(runSpec(spec).out.rows[0].value).toBe("20.11%");
    expect(isRejected(spec, { years: "0" })).toBe(true);
    expect(isRejected(spec, { start: "0" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateCagr(e.input).cagrPercent.toFixed(2)).toBe(e.cagr);
  });
});
