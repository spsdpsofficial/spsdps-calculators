import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { simpleInterest, toYears } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("simpleInterest", () => {
  it("₹2,00,000 at 9% for 3 years = ₹54,000", () => {
    const r = simpleInterest({ principal: 200000, annualRatePercent: 9, time: 3, unit: "years" });
    expect(r.interest).toBe(54000);
    expect(r.total).toBe(254000);
  });
  it("converts months and days to years", () => {
    expect(toYears(18, "months")).toBe(1.5);
    expect(toYears(73, "days")).toBeCloseTo(0.2, 10);
    expect(simpleInterest({ principal: 100000, annualRatePercent: 12, time: 6, unit: "months" }).interest).toBe(6000);
  });
  it("0% rate gives no interest", () => {
    expect(simpleInterest({ principal: 5000, annualRatePercent: 0, time: 2, unit: "years" }).interest).toBe(0);
  });
});

describe("Simple interest spec", () => {
  it("runs with defaults and rejects bad input", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[0].value).toContain("54,000");
    expect(validateFields(spec.fields, { ...raw, time: "0" }).valid).toBe(false);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(simpleInterest(e).interest).toBe(e.interest);
  });
});
