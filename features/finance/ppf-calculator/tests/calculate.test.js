import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { ppfProjection } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("ppfProjection", () => {
  it("matches an independent reference: ₹1,50,000 a year at 7.1% for 15 years", () => {
    const r = ppfProjection({ yearlyDeposit: 150000, annualRatePercent: 7.1, years: 15 });
    expect(r.maturity).toBeCloseTo(4068209.22, 1);
    expect(r.invested).toBe(2250000);
    expect(r.interest).toBeCloseTo(1818209.22, 1);
  });
  it("0% gives only the invested amount", () => {
    expect(ppfProjection({ yearlyDeposit: 1000, annualRatePercent: 0, years: 15 }).maturity).toBe(15000);
  });
  it("one year earns one year of interest", () => {
    expect(ppfProjection({ yearlyDeposit: 100000, annualRatePercent: 7, years: 1 }).maturity).toBeCloseTo(107000, 6);
  });
});

describe("PPF spec", () => {
  it("enforces the ₹1,50,000 limit and the 15-year minimum", () => {
    const raw = initialValues(spec.fields);
    expect(validateFields(spec.fields, raw).valid).toBe(true);
    expect(validateFields(spec.fields, { ...raw, deposit: "150001" }).valid).toBe(false);
    expect(validateFields(spec.fields, { ...raw, years: "14" }).valid).toBe(false);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(Math.round(ppfProjection(e).maturity)).toBe(e.maturityRounded);
  });
});
