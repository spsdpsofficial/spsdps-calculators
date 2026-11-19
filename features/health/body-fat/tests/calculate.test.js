import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { bodyFatCategory, calculateBodyFat, navyBodyFat } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("navyBodyFat (Python reference)", () => {
  it("male 170 cm, neck 38, waist 85 → 17.80%", () => {
    expect(navyBodyFat({ sex: "male", heightCm: 170, neckCm: 38, waistCm: 85 }).percent).toBeCloseTo(17.7967, 3);
  });
  it("female 160 cm, neck 33, waist 75, hip 95 → 28.28%", () => {
    expect(navyBodyFat({ sex: "female", heightCm: 160, neckCm: 33, waistCm: 75, hipCm: 95 }).percent).toBeCloseTo(28.278, 3);
  });
  it("rejects impossible measurements", () => {
    expect(navyBodyFat({ sex: "male", heightCm: 170, neckCm: 50, waistCm: 40 }).error).toBeTruthy();
    expect(navyBodyFat({ sex: "male", heightCm: 170, neckCm: 30, waistCm: 31 }).error).toBeTruthy();
  });
});

describe("categories and masses", () => {
  it("ACE bands", () => {
    expect(bodyFatCategory("male", 17.8)).toBe("Fitness");
    expect(bodyFatCategory("male", 30)).toBe("Obese range");
    expect(bodyFatCategory("female", 28.3)).toBe("Average");
  });
  it("fat and lean mass add to body weight", () => {
    const r = calculateBodyFat({ sex: "male", weightKg: 70, heightCm: 170, neckCm: 38, waistCm: 85 });
    expect(r.fatMass + r.leanMass).toBeCloseTo(70, 10);
    expect(r.fatMass).toBeCloseTo(12.46, 2);
  });
});

describe("Body fat spec", () => {
  it("hip is only required for females", () => {
    const raw = { ...initialValues(spec.fields), hip: "" };
    expect(validateFields(spec.fields, raw).valid).toBe(true);
    expect(validateFields(spec.fields, { ...raw, sex: "female" }).valid).toBe(false);
  });
  it("runs with defaults and surfaces errors", () => {
    const raw = initialValues(spec.fields);
    const { values } = validateFields(spec.fields, raw);
    expect(spec.run(values, raw).rows[0].value).toBe("17.8%");
    expect(spec.run({ ...values, neck: 70, waist: 60 }, raw).error).toBeTruthy();
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateBodyFat(e.input).percent).toBeCloseTo(e.percent, 1);
  });
});
