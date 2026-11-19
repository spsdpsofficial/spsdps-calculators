import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { compoundByYear, compoundGrowth } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("compoundGrowth", () => {
  it("matches an independent reference: ₹1,00,000 at 8% for 10 years, monthly", () => {
    const r = compoundGrowth({ principal: 100000, annualRatePercent: 8, years: 10, timesPerYear: 12 });
    expect(r.amount).toBeCloseTo(221964.02, 1);
    expect(r.interest).toBeCloseTo(121964.02, 1);
  });
  it("yearly compounding at 10% doubles-ish: 1000 -> 1210 in 2 years", () => {
    expect(compoundGrowth({ principal: 1000, annualRatePercent: 10, years: 2, timesPerYear: 1 }).amount).toBeCloseTo(1210, 8);
  });
  it("0% rate leaves the principal unchanged", () => {
    expect(compoundGrowth({ principal: 5000, annualRatePercent: 0, years: 5, timesPerYear: 4 }).interest).toBe(0);
  });
  it("year rows end at the final amount, including part years", () => {
    const rows = compoundByYear({ principal: 100000, annualRatePercent: 8, years: 10, timesPerYear: 12 });
    expect(rows).toHaveLength(10);
    expect(rows.at(-1).balance).toBeCloseTo(221964.02, 1);
    expect(compoundByYear({ principal: 1000, annualRatePercent: 5, years: 2.5, timesPerYear: 1 })).toHaveLength(3);
  });
});

describe("Compound interest spec", () => {
  it("runs with defaults and rejects invalid input", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[0].value).toContain("2,21,964");
    expect(validateFields(spec.fields, { ...raw, principal: "-1" }).valid).toBe(false);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(Math.round(compoundGrowth(e).amount)).toBe(e.amountRounded);
  });
});
