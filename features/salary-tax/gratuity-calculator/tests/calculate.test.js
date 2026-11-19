import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateGratuity } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("calculateGratuity", () => {
  it("covered: ₹50,000 × 15 ÷ 26 × 12 years ≈ ₹3,46,154", () => {
    const r = calculateGratuity({ wage: 50000, years: 12, months: 0, covered: true });
    expect(r.gratuity).toBeCloseTo(346153.85, 1);
    expect(r.taxable).toBe(0);
  });
  it("matches the worked figure from the Bajaj Finserv example: ₹75,000 over 12 years ≈ ₹5,19,231", () => {
    expect(calculateGratuity({ wage: 75000, years: 12, months: 0, covered: true }).gratuity).toBeCloseTo(519230.77, 1);
  });
  it("rounds up only when the extra period is MORE than 6 months", () => {
    expect(calculateGratuity({ wage: 26000, years: 5, months: 6, covered: true }).countedYears).toBe(5);
    expect(calculateGratuity({ wage: 26000, years: 5, months: 7, covered: true }).countedYears).toBe(6);
  });
  it("not covered: uses 15/30 and completed years only", () => {
    const r = calculateGratuity({ wage: 50000, years: 10, months: 9, covered: false });
    expect(r.countedYears).toBe(10);
    expect(r.gratuity).toBe(250000);
  });
  it("splits amounts above ₹20 lakh into taxable", () => {
    const r = calculateGratuity({ wage: 400000, years: 30, months: 0, covered: true });
    expect(r.taxFree).toBe(2000000);
    expect(r.taxable).toBeCloseTo(r.gratuity - 2000000, 6);
  });
  it("is zero with zero years", () => {
    expect(calculateGratuity({ wage: 50000, years: 0, months: 3, covered: true }).gratuity).toBe(0);
  });
});

describe("Gratuity spec", () => {
  it("runs with defaults, warns under one year and rejects invalid months", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[0].value).toContain("2,88,462");
    expect(spec.run({ ...values, years: 0 }, raw).notes[0]).toContain("less than one year");
    expect(validateFields(spec.fields, { ...raw, months: "12" }).valid).toBe(false);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(Math.round(calculateGratuity(e.input).gratuity)).toBe(e.gratuity);
  });
});
