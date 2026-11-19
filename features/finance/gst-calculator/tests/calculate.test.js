import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateGst } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("calculateGst", () => {
  it("adds GST to a GST-exclusive price", () => {
    const r = calculateGst({ amount: 10000, ratePercent: 18, mode: "add" });
    expect(r.gst).toBeCloseTo(1800, 8);
    expect(r.total).toBeCloseTo(11800, 8);
    expect(r.cgst).toBeCloseTo(900, 8);
    expect(r.sgst).toBeCloseTo(900, 8);
  });
  it("removes GST from a GST-inclusive price", () => {
    const r = calculateGst({ amount: 11800, ratePercent: 18, mode: "remove" });
    expect(r.net).toBeCloseTo(10000, 8);
    expect(r.gst).toBeCloseTo(1800, 8);
  });
  it("0% rate leaves the price unchanged in both modes", () => {
    expect(calculateGst({ amount: 500, ratePercent: 0, mode: "add" }).total).toBe(500);
    expect(calculateGst({ amount: 500, ratePercent: 0, mode: "remove" }).gst).toBe(0);
  });
  it("add then remove returns the original price for every offered rate", () => {
    for (const rate of [0.25, 3, 5, 18, 40]) {
      const total = calculateGst({ amount: 1234.56, ratePercent: rate, mode: "add" }).total;
      expect(calculateGst({ amount: total, ratePercent: rate, mode: "remove" }).net).toBeCloseTo(1234.56, 8);
    }
  });
});

describe("GST spec", () => {
  it("handles the custom-rate path and validates it", () => {
    const raw = { ...initialValues(spec.fields), rateChoice: "custom", customRate: "12" };
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[1].label).toBe("GST at 12%");
    expect(validateFields(spec.fields, { ...raw, customRate: "150" }).valid).toBe(false);
  });
  it("page example matches the calculator", () => {
    const e = content.example.expected;
    expect(calculateGst(e).gst).toBeCloseTo(e.expectedGst, 6);
  });
});
