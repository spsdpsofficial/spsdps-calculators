import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateIdealWeight, idealWeights } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

const byName = (list) => Object.fromEntries(list.map((f) => [f.name, f.kg]));

describe("idealWeights (Python reference, 170 cm)", () => {
  it("male", () => {
    const w = byName(idealWeights({ sex: "male", heightCm: 170 }));
    expect(w.Devine).toBeCloseTo(65.937, 3);
    expect(w.Robinson).toBeCloseTo(65.165, 3);
    expect(w.Miller).toBeCloseTo(65.97, 2);
    expect(w.Hamwi).toBeCloseTo(66.709, 3);
  });
  it("female", () => {
    const w = byName(idealWeights({ sex: "female", heightCm: 170 }));
    expect(w.Devine).toBeCloseTo(61.437, 3);
    expect(w.Robinson).toBeCloseTo(60.78, 2);
    expect(w.Miller).toBeCloseTo(62.524, 3);
    expect(w.Hamwi).toBeCloseTo(60.744, 3);
  });
  it("average, BMI range and short-height flag", () => {
    const r = calculateIdealWeight({ sex: "male", heightCm: 170 });
    expect(r.average).toBeCloseTo(65.945, 2);
    expect(r.bmiRange.min).toBeCloseTo(53.465, 3);
    expect(r.shortHeight).toBe(false);
    expect(calculateIdealWeight({ sex: "female", heightCm: 150 }).shortHeight).toBe(true);
  });
});

describe("Ideal weight spec", () => {
  it("runs with defaults and rejects out-of-range height", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[0].value).toBe("65.9 kg");
    expect(validateFields(spec.fields, { ...raw, height: "100" }).valid).toBe(false);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateIdealWeight(e.input).average).toBeCloseTo(e.average, 1);
  });
});
