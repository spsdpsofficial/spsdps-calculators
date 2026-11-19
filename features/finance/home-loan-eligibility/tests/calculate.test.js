import { describe, expect, it } from "vitest";
import { calculateEmi } from "@/lib/finance/loan";
import { content } from "../content";
import { spec } from "../spec";
import { calculateEligibility, principalForEmi } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("eligibility maths", () => {
  it("₹1L income, ₹10k existing EMI, 45% FOIR, 8.5%, 20 years → ₹35,000 EMI, loan ₹40,33,079 (Python reference)", () => {
    const r = calculateEligibility({ monthlyIncome: 100000, existingEmi: 10000, foirPercent: 45, annualRatePercent: 8.5, tenureMonths: 240 });
    expect(r.maxEmi).toBe(35000);
    expect(r.loan).toBeCloseTo(4033079.39, 1);
  });
  it("is the exact inverse of the EMI formula", () => {
    const loan = principalForEmi({ emi: 52069.394, annualRatePercent: 8.5, tenureMonths: 240 });
    expect(loan).toBeCloseTo(6000000, 0);
    const back = calculateEmi({ principal: 2500000, annualRatePercent: 9, tenureMonths: 180 }).emi;
    expect(principalForEmi({ emi: back, annualRatePercent: 9, tenureMonths: 180 })).toBeCloseTo(2500000, 4);
  });
  it("handles a zero rate and no spare capacity", () => {
    expect(principalForEmi({ emi: 1000, annualRatePercent: 0, tenureMonths: 12 })).toBe(12000);
    expect(calculateEligibility({ monthlyIncome: 50000, existingEmi: 30000, foirPercent: 40, annualRatePercent: 9, tenureMonths: 120 }).eligible).toBe(false);
  });
});

describe("Eligibility spec", () => {
  it("runs with defaults, errors when there is no room", () => {
    expect(runSpec(spec).out.rows[1].value).toBe("₹35,000");
    expect(runSpec(spec, { existing: "60000" }).out.error).toBeTruthy();
    expect(isRejected(spec, { foir: "95" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(Math.round(calculateEligibility(e.input).loan)).toBe(e.loan);
  });
});
