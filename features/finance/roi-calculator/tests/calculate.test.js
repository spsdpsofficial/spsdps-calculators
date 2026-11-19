import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateRoi } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("calculateRoi", () => {
  it("₹1L → ₹1.5L is 50%, annualised 14.4714% over 3 years (Python reference)", () => {
    const r = calculateRoi({ invested: 100000, finalValue: 150000, years: 3 });
    expect(r.roiPercent).toBe(50);
    expect(r.gain).toBe(50000);
    expect(r.annualisedPercent).toBeCloseTo(14.4714, 3);
  });
  it("losses are negative and no annualised figure without years", () => {
    const r = calculateRoi({ invested: 200, finalValue: 150 });
    expect(r.roiPercent).toBe(-25);
    expect(r.annualisedPercent).toBeNull();
  });
});

describe("ROI spec", () => {
  it("runs with defaults, with and without years", () => {
    const withYears = runSpec(spec).out.rows;
    expect(withYears[0].value).toBe("50%");
    expect(withYears).toHaveLength(3);
    expect(runSpec(spec, { years: "" }).out.rows).toHaveLength(2);
    expect(runSpec(spec, { final: "50000" }).out.rows[1].label).toBe("Net loss");
    expect(isRejected(spec, { invested: "0" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateRoi(e.input).annualisedPercent.toFixed(2)).toBe(e.annualised);
  });
});
