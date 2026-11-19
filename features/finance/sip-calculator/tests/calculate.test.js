import { describe, expect, it } from "vitest";
import { spec } from "../spec";
import { content } from "../content";
import { sipValueAfter, sipYearly } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("sipValueAfter", () => {
  it("matches an independent reference: ₹10,000/month, 12%, 10 years", () => {
    const r = sipValueAfter({ monthly: 10000, annualRatePercent: 12, months: 120 });
    expect(r.invested).toBe(1_200_000);
    expect(r.futureValue).toBeCloseTo(2323390.76, 1);
    expect(r.returns).toBeCloseTo(1123390.76, 1);
  });
  it("0% return gives exactly the invested amount", () => {
    expect(sipValueAfter({ monthly: 5000, annualRatePercent: 0, months: 24 }).futureValue).toBe(120000);
  });
  it("a single month grows by one month of interest", () => {
    expect(sipValueAfter({ monthly: 1000, annualRatePercent: 12, months: 1 }).futureValue).toBeCloseTo(1010, 6);
  });
  it("yearly rows end at the full-term value", () => {
    const rows = sipYearly({ monthly: 10000, annualRatePercent: 12, years: 10 });
    expect(rows).toHaveLength(10);
    expect(rows.at(-1).value).toBeCloseTo(2323390.76, 1);
  });
});

describe("SIP spec and page example", () => {
  it("runs with the default inputs", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[0].value).toContain("23,23,391");
  });
  it("the worked example on the page matches the calculator", () => {
    const e = content.example.expected;
    const r = sipValueAfter({ monthly: e.monthly, annualRatePercent: e.rate, months: e.years * 12 });
    expect(Math.round(r.futureValue)).toBe(e.futureValue);
    expect(Math.round(r.returns)).toBe(e.returns);
  });
  it("rejects invalid input", () => {
    const raw = { ...initialValues(spec.fields), monthly: "50", years: "0" };
    expect(validateFields(spec.fields, raw).valid).toBe(false);
  });
});
