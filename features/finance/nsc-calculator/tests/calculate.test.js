import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateNsc } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("calculateNsc", () => {
  it("₹1L at 7.7% for 5 years → ₹1,44,903 (Python reference)", () => {
    const r = calculateNsc({ amount: 100000, annualRatePercent: 7.7 });
    expect(r.maturity).toBeCloseTo(144903.38, 2);
    expect(r.interest).toBeCloseTo(44903.38, 2);
    expect(r.yearly).toHaveLength(5);
  });
  it("zero rate returns the principal", () => {
    expect(calculateNsc({ amount: 5000, annualRatePercent: 0 }).maturity).toBe(5000);
  });
});

describe("NSC spec", () => {
  it("runs with defaults and validates", () => {
    expect(runSpec(spec).out.rows[0].value).toBe("₹1,44,903");
    expect(isRejected(spec, { amount: "500" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(Math.round(calculateNsc(e.input).maturity)).toBe(e.maturity);
  });
});
