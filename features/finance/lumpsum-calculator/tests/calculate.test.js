import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { lumpsumValue, lumpsumYearly } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("lumpsum maths", () => {
  it("₹1L at 12% for 10 years → ₹3,10,585 (Python reference)", () => {
    const r = lumpsumValue({ amount: 100000, annualRatePercent: 12, years: 10 });
    expect(r.futureValue).toBeCloseTo(310584.82, 2);
    expect(r.returns).toBeCloseTo(210584.82, 2);
  });
  it("zero return keeps the amount; fractional years work", () => {
    expect(lumpsumValue({ amount: 5000, annualRatePercent: 0, years: 7 }).futureValue).toBe(5000);
    expect(lumpsumValue({ amount: 1000, annualRatePercent: 10, years: 0.5 }).futureValue).toBeCloseTo(1048.81, 2);
  });
  it("yearly table ends at the final value", () => {
    const rows = lumpsumYearly({ amount: 100000, annualRatePercent: 12, years: 10 });
    expect(rows).toHaveLength(10);
    expect(rows[9].value).toBeCloseTo(310584.82, 2);
  });
});

describe("Lumpsum spec", () => {
  it("runs with defaults and validates", () => {
    const { out } = runSpec(spec);
    expect(out.rows[0].value).toBe("₹3,10,585");
    expect(out.table.rows).toHaveLength(10);
    expect(isRejected(spec, { years: "0" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(Math.round(lumpsumValue(e.input).futureValue)).toBe(e.value);
  });
});
