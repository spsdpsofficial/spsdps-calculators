import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { simulatePrepayment } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

const loan = { principal: 3_000_000, annualRatePercent: 8.5, tenureMonths: 240, prepayment: 500_000, afterMonth: 24 };

describe("simulatePrepayment", () => {
  it("matches an independent reference when keeping the EMI", () => {
    const r = simulatePrepayment({ ...loan, mode: "tenure" });
    expect(r.emi).toBeCloseTo(26034.7, 1);
    expect(r.newTenureMonths).toBe(172);
    expect(r.interestSaved).toBeCloseTo(1290458.46, 0);
  });
  it("matches an independent reference when keeping the tenure", () => {
    const r = simulatePrepayment({ ...loan, mode: "emi" });
    expect(r.newEmi).toBeCloseTo(21507.41, 1);
    expect(r.interestSaved).toBeCloseTo(477894.05, 0);
    expect(r.newTenureMonths).toBe(240);
  });
  it("agrees with the closed-form remaining-months formula", () => {
    const r = simulatePrepayment({ ...loan, mode: "tenure" });
    const rate = 0.085 / 12;
    const balance = r.balanceBefore - 500000;
    const months = Math.ceil(-Math.log(1 - (balance * rate) / r.emi) / Math.log(1 + rate));
    expect(24 + months).toBe(r.newTenureMonths);
  });
  it("saves more interest the earlier you prepay", () => {
    const early = simulatePrepayment({ ...loan, afterMonth: 6, mode: "tenure" }).interestSaved;
    const late = simulatePrepayment({ ...loan, afterMonth: 120, mode: "tenure" }).interestSaved;
    expect(early).toBeGreaterThan(late);
  });
  it("refuses a prepayment larger than the balance", () => {
    expect(simulatePrepayment({ ...loan, prepayment: 5_000_000, mode: "tenure" }).error).toBeTruthy();
  });
});

describe("Loan prepayment spec", () => {
  it("runs with defaults and reports cross-field errors", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[0].label).toBe("Interest saved");
    expect(spec.run({ ...values, afterMonth: 240 }, raw).error).toBeTruthy();
    expect(spec.run({ ...values, prepayment: 9_000_000 }, raw).error).toBeTruthy();
  });
  it("page example matches", () => {
    const e = content.example.expected;
    const r = simulatePrepayment({ ...loan, mode: "tenure" });
    expect(Math.round(r.interestSaved)).toBe(e.interestSaved);
    expect(r.newTenureMonths).toBe(e.newTenureMonths);
  });
});
