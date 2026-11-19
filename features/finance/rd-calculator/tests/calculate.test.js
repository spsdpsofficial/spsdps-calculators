import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { rdMaturity } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("rdMaturity", () => {
  it("matches an independent reference: ₹5,000/month, 6.5%, 60 months", () => {
    const r = rdMaturity({ monthly: 5000, annualRatePercent: 6.5, months: 60 });
    expect(r.maturity).toBeCloseTo(354954.1, 1);
    expect(r.deposited).toBe(300000);
  });
  it("agrees with the closed-form annuity formula", () => {
    const q = 0.065 / 4;
    const closed = 5000 * (((1 + q) ** 20 - 1) / (1 - (1 + q) ** (-1 / 3)));
    expect(rdMaturity({ monthly: 5000, annualRatePercent: 6.5, months: 60 }).maturity).toBeCloseTo(closed, 4);
  });
  it("earns more with a higher rate and longer tenure", () => {
    const base = rdMaturity({ monthly: 1000, annualRatePercent: 6, months: 24 }).interest;
    expect(rdMaturity({ monthly: 1000, annualRatePercent: 7, months: 24 }).interest).toBeGreaterThan(base);
    expect(rdMaturity({ monthly: 1000, annualRatePercent: 6, months: 36 }).interest).toBeGreaterThan(base);
  });
});

describe("RD spec", () => {
  it("rejects tenures below 6 months and runs with defaults", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[0].value).toContain("3,54,954");
    expect(validateFields(spec.fields, { ...raw, months: "3" }).valid).toBe(false);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(Math.round(rdMaturity(e).maturity)).toBe(e.maturityRounded);
  });
});
