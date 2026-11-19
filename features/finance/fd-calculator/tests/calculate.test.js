import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { fdMaturity } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("fdMaturity", () => {
  it("matches an independent reference: ₹5,00,000 at 7.1% for 5 years, quarterly", () => {
    const r = fdMaturity({ principal: 500000, annualRatePercent: 7.1, years: 5, timesPerYear: 4 });
    expect(r.maturity).toBeCloseTo(710873.34, 1);
    expect(r.interest).toBeCloseTo(210873.34, 1);
  });
  it("yearly compounding is P(1+r)^t", () => {
    expect(fdMaturity({ principal: 100000, annualRatePercent: 10, years: 2, timesPerYear: 1 }).maturity).toBeCloseTo(121000, 6);
  });
  it("more frequent compounding never gives less", () => {
    const at = (n) => fdMaturity({ principal: 100000, annualRatePercent: 7, years: 3, timesPerYear: n }).maturity;
    expect(at(12)).toBeGreaterThan(at(4));
    expect(at(4)).toBeGreaterThan(at(2));
    expect(at(2)).toBeGreaterThan(at(1));
  });
  it("supports part-year tenures", () => {
    expect(fdMaturity({ principal: 100000, annualRatePercent: 8, years: 0.5, timesPerYear: 2 }).maturity).toBeCloseTo(104000, 6);
  });
});

describe("FD spec", () => {
  it("runs with defaults and rejects bad input", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[0].value).toContain("7,10,873");
    expect(validateFields(spec.fields, { ...raw, years: "0" }).valid).toBe(false);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(Math.round(fdMaturity(e).maturity)).toBe(e.maturityRounded);
  });
});
