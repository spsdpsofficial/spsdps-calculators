import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { bmr, calculateCalories } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("calculateCalories", () => {
  it("male 30y 70 kg 170 cm: BMR 1,617.5; moderate activity 2,507.1; lose 0.5 kg/week 1,957.1", () => {
    const base = { sex: "male", weightKg: 70, heightCm: 170, age: 30 };
    expect(bmr(base)).toBe(1617.5);
    const r = calculateCalories({ ...base, activity: 1.55, adjustment: -550 });
    expect(r.maintenance).toBeCloseTo(2507.125, 3);
    expect(r.target).toBeCloseTo(1957.125, 3);
    expect(r.belowBmr).toBe(false);
  });
  it("female formula uses −161", () => {
    expect(bmr({ sex: "female", weightKg: 60, heightCm: 160, age: 30 })).toBe(1289);
  });
  it("flags unsafe low targets", () => {
    const r = calculateCalories({ sex: "female", weightKg: 45, heightCm: 150, age: 60, activity: 1.2, adjustment: -550 });
    expect(r.belowFloor).toBe(true);
    expect(r.belowBmr).toBe(true);
  });
});

describe("Calorie spec", () => {
  it("runs with defaults and shows a warning note for low targets", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[0].value).toBe("2,507 kcal");
    const low = spec.run({ sex: "female", age: 60, weight: 45, height: 150, activity: "1.2", goal: "-550" }, raw);
    expect(low.notes[0]).toMatch(/under 1,200/);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateCalories(e.input).target).toBeCloseTo(e.target, 1);
  });
});
