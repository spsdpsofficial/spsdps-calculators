import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { cardInterest } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("cardInterest", () => {
  it("matches an independent reference: ₹50,000 at 3.5% a month for 30 days", () => {
    const r = cardInterest({ balance: 50000, monthlyRatePercent: 3.5, days: 30, gstPercent: 18 });
    expect(r.interest).toBeCloseTo(1726.03, 2);
    expect(r.gst).toBeCloseTo(310.68, 2);
    expect(r.annualRatePercent).toBeCloseTo(42, 8);
  });
  it("scales linearly with days and balance", () => {
    const one = cardInterest({ balance: 1000, monthlyRatePercent: 3, days: 10 }).interest;
    expect(cardInterest({ balance: 1000, monthlyRatePercent: 3, days: 20 }).interest).toBeCloseTo(one * 2, 8);
    expect(cardInterest({ balance: 2000, monthlyRatePercent: 3, days: 10 }).interest).toBeCloseTo(one * 2, 8);
  });
  it("0 GST leaves total equal to interest", () => {
    const r = cardInterest({ balance: 1000, monthlyRatePercent: 3, days: 10, gstPercent: 0 });
    expect(r.total).toBe(r.interest);
  });
});

describe("Credit card spec", () => {
  it("runs with defaults and rejects bad input", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[0].value).toContain("1,726.03");
    expect(validateFields(spec.fields, { ...raw, days: "0" }).valid).toBe(false);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(cardInterest(e).interest).toBeCloseTo(e.interest, 2);
  });
});
