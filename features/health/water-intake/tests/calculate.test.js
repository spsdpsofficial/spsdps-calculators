import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateWaterIntake } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("calculateWaterIntake", () => {
  it("70 kg, 30 min exercise, mild weather → 2,800 ml, 12 glasses", () => {
    const r = calculateWaterIntake({ weightKg: 70, exerciseMinutes: 30, hot: false });
    expect(r).toMatchObject({ base: 2450, exercise: 350, climate: 0, totalMl: 2800, litres: 2.8, glasses: 12 });
  });
  it("hot weather adds 500 ml", () => {
    expect(calculateWaterIntake({ weightKg: 70, exerciseMinutes: 0, hot: true }).totalMl).toBe(2950);
  });
  it("scales exercise linearly", () => {
    expect(calculateWaterIntake({ weightKg: 60, exerciseMinutes: 90, hot: false }).exercise).toBe(1050);
  });
});

describe("Water spec", () => {
  it("runs with defaults; empty exercise counts as zero", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[0].value).toBe("2.8 L");
    expect(validateFields(spec.fields, { ...raw, exercise: "" }).values.exercise).toBe(0);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateWaterIntake(e.input).totalMl).toBe(e.totalMl);
  });
});
