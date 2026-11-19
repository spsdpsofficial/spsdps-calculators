import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculatePersonalLoan, effectiveRate } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

const base = { principal: 500000, annualRatePercent: 13, tenureMonths: 36, feePercent: 2, feeGstPercent: 18, monthlyIncome: 0 };

describe("calculatePersonalLoan", () => {
  it("₹5L at 13% for 36 months → EMI ₹16,847, fees ₹11,800, effective rate 14.68% (Python reference)", () => {
    const r = calculatePersonalLoan(base);
    expect(r.emi).toBeCloseTo(16846.976, 2);
    expect(r.totalInterest).toBeCloseTo(106491.14, 1);
    expect(r.totalFees).toBeCloseTo(11800, 6);
    expect(r.netReceived).toBeCloseTo(488200, 6);
    expect(r.effectiveRatePercent).toBeCloseTo(14.679, 2);
  });
  it("with no fee the effective rate equals the quoted rate", () => {
    expect(calculatePersonalLoan({ ...base, feePercent: 0 }).effectiveRatePercent).toBeCloseTo(13, 6);
  });
  it("effectiveRate returns 0 when nothing is financed", () => {
    expect(effectiveRate({ emi: 100, tenureMonths: 10, netReceived: 2000 })).toBe(0);
  });
  it("income share is null without income", () => {
    expect(calculatePersonalLoan(base).incomeShare).toBeNull();
    expect(calculatePersonalLoan({ ...base, monthlyIncome: 100000 }).incomeShare).toBeCloseTo(16.847, 2);
  });
});

describe("Personal loan spec", () => {
  it("runs with defaults and validates", () => {
    const { out } = runSpec(spec);
    expect(out.rows[0].value).toBe("₹16,847");
    expect(out.rows).toHaveLength(7);
    expect(runSpec(spec, { income: "100000" }).out.rows).toHaveLength(8);
    expect(isRejected(spec, { months: "2" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    const r = calculatePersonalLoan(e.input);
    expect(Math.round(r.emi)).toBe(e.emi);
    expect(r.effectiveRatePercent.toFixed(2)).toBe(e.effective);
  });
});
