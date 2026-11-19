import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateSsy } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("calculateSsy", () => {
  it("₹1.5L a year for 15 years at 8.2%, maturity at 21 → ₹71,82,119 (Python reference)", () => {
    const r = calculateSsy({ yearlyDeposit: 150000, annualRatePercent: 8.2 });
    expect(r.maturity).toBeCloseTo(7182119.17, 1);
    expect(r.invested).toBe(2250000);
    expect(r.interest).toBeCloseTo(4932119.17, 1);
    expect(r.yearly).toHaveLength(21);
  });
  it("zero rate returns the deposits", () => {
    expect(calculateSsy({ yearlyDeposit: 1000, annualRatePercent: 0 }).maturity).toBe(15000);
  });
});

describe("SSY spec", () => {
  it("runs with defaults and enforces deposit limits", () => {
    const { out } = runSpec(spec);
    expect(out.rows[0].value).toBe("₹71,82,119");
    expect(out.table.rows).toHaveLength(21);
    expect(isRejected(spec, { deposit: "200000" })).toBe(true);
    expect(isRejected(spec, { deposit: "100" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(Math.round(calculateSsy(e.input).maturity)).toBe(e.maturity);
  });
});
