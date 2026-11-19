import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateHomeLoan } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

const base = { propertyValue: 7500000, downPaymentPercent: 20, annualRatePercent: 8.5, tenureMonths: 240, feePercent: 0.5 };

describe("calculateHomeLoan", () => {
  it("₹75L at 20% down, 8.5% for 20 years → loan ₹60L, EMI ₹52,069 (Python reference)", () => {
    const r = calculateHomeLoan(base);
    expect(r.loanAmount).toBe(6000000);
    expect(r.downPayment).toBe(1500000);
    expect(r.emi).toBeCloseTo(52069.394, 2);
    expect(r.totalInterest).toBeCloseTo(6496654.56, 1);
    expect(r.fee).toBe(30000);
    expect(r.totalCost).toBeCloseTo(14026654.56, 1);
  });
  it("100% down payment-like edge: zero loan is not offered, 0% down finances everything", () => {
    expect(calculateHomeLoan({ ...base, downPaymentPercent: 0 }).loanAmount).toBe(7500000);
  });
});

describe("Home loan spec", () => {
  it("runs with defaults and rejects bad input", () => {
    expect(runSpec(spec).out.rows[0].value).toBe("₹52,069");
    expect(isRejected(spec, { down: "95" })).toBe(true);
    expect(isRejected(spec, { years: "0" })).toBe(true);
    expect(runSpec(spec, { fee: "" }).values.fee).toBe(0);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    const r = calculateHomeLoan(e.input);
    expect(Math.round(r.emi)).toBe(e.emi);
    expect(Math.round(r.totalInterest)).toBe(e.interest);
  });
});
