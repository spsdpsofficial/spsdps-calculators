import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateBusinessLoan } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

const base = { principal: 2500000, annualRatePercent: 14, tenureMonths: 60, feePercent: 2, feeGstPercent: 18, monthlyIncome: 400000 };

describe("calculateBusinessLoan", () => {
  it("₹25L at 14% for 5 years → EMI ₹58,171, interest ₹9,90,238 (Python reference)", () => {
    const r = calculateBusinessLoan(base);
    expect(r.emi).toBeCloseTo(58170.63, 2);
    expect(r.totalInterest).toBeCloseTo(990237.63, 2);
    expect(r.totalPayment).toBeCloseTo(3490237.63, 2);
  });
  it("fee, GST on fee and net disbursal", () => {
    const r = calculateBusinessLoan(base);
    expect(r.totalFees).toBe(59000);
    expect(r.feeGst).toBe(9000);
    expect(r.amountReceived).toBe(2441000);
    expect(r.totalCost).toBeCloseTo(1049237.63, 2);
    expect(r.incomeShare).toBeCloseTo(14.5427, 3);
  });
  it("no income means no burden figure; zero fee is allowed", () => {
    expect(calculateBusinessLoan({ ...base, monthlyIncome: 0, feePercent: 0 })).toMatchObject({ incomeShare: null, totalFees: 0 });
  });
});

describe("Business loan spec", () => {
  it("runs with defaults and drops the income row when empty", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    const out = spec.run(values, raw);
    expect(out.rows[0].value).toBe("₹58,171");
    expect(out.rows).toHaveLength(7);
    expect(spec.run({ ...values, income: 0 }, raw).rows).toHaveLength(6);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    const r = calculateBusinessLoan(e.input);
    expect(Math.round(r.emi)).toBe(e.emi);
    expect(Math.round(r.totalInterest)).toBe(e.interest);
    expect(r.totalFees).toBe(e.fees);
  });
});
