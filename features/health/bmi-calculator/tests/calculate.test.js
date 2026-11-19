import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { asianCategory, calculateBmi, whoCategory } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("calculateBmi", () => {
  it("70 kg, 170 cm → 24.22, WHO normal, Asian overweight (Python reference)", () => {
    const r = calculateBmi({ weightKg: 70, heightCm: 170 });
    expect(r.bmi).toBeCloseTo(24.2215, 4);
    expect(r.who).toBe("Normal weight");
    expect(r.asian).toBe("Overweight (at risk)");
    expect(r.asianRange.min).toBeCloseTo(53.465, 3);
    expect(r.asianRange.max).toBeCloseTo(66.181, 3);
    expect(r.whoRange.max).toBeCloseTo(71.961, 3);
  });
  it("category boundaries", () => {
    expect([18.4, 18.5, 24.9, 25, 29.9, 30].map(whoCategory)).toEqual(["Underweight", "Normal weight", "Normal weight", "Overweight", "Overweight", "Obese"]);
    expect([22.9, 23, 24.9, 25].map(asianCategory)).toEqual(["Normal weight", "Overweight (at risk)", "Overweight (at risk)", "Obese"]);
  });
});

describe("BMI spec", () => {
  it("runs with defaults and rejects impossible heights", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[0].value).toBe("24.2");
    expect(validateFields(spec.fields, { ...raw, height: "0" }).valid).toBe(false);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateBmi(e.input).bmi).toBeCloseTo(e.bmi, 2);
  });
});
