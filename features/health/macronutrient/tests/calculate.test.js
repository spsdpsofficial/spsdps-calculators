import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateMacros } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("calculateMacros", () => {
  it("2,000 kcal at 50/20/30 → 250 g carbs, 100 g protein, 66.7 g fat", () => {
    const { rows } = calculateMacros({ calories: 2000, carbsPercent: 50, proteinPercent: 20, fatPercent: 30 });
    expect(rows.map((r) => r.grams)).toEqual([250, 100, 600 / 9]);
    expect(rows.map((r) => r.kcal)).toEqual([1000, 400, 600]);
    expect(rows.some((r) => r.outsideRange)).toBe(false);
  });
  it("rejects splits that do not add to 100", () => {
    expect(calculateMacros({ calories: 2000, carbsPercent: 50, proteinPercent: 20, fatPercent: 20 }).error).toMatch(/add up to 100/);
  });
  it("flags shares outside the AMDR", () => {
    const { rows } = calculateMacros({ calories: 2000, carbsPercent: 20, proteinPercent: 40, fatPercent: 40 });
    expect(rows.map((r) => r.outsideRange)).toEqual([true, true, true]);
  });
});

describe("Macro spec", () => {
  it("runs a preset without validating hidden custom fields", () => {
    const raw = { ...initialValues(spec.fields), carbs: "" };
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    const out = spec.run(values, raw);
    expect(out.rows[0].value).toBe("250 g");
    expect(out.chart.segments).toHaveLength(3);
  });
  it("custom splits are validated and checked for 100%", () => {
    const raw = { ...initialValues(spec.fields), preset: "custom", protein: "25" };
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).error).toBeTruthy();
  });
  it("page example matches", () => {
    const e = content.example.expected;
    const { rows } = calculateMacros(e.input);
    expect(rows.map((r) => Math.round(r.grams))).toEqual(e.grams);
  });
});
