import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateElectricityBill } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

const base = { units: 250, slab1Units: 100, rate1: 3.5, slab2Units: 100, rate2: 5, rate3: 7, fixedCharge: 100, dutyPercent: 5 };

describe("calculateElectricityBill", () => {
  it("250 units on 100@3.5 + 100@5 + 50@7, ₹100 fixed, 5% duty → ₹1,365", () => {
    const r = calculateElectricityBill(base);
    expect(r.energyCharge).toBe(1200);
    expect(r.total).toBeCloseTo(1365, 2);
    expect(r.averagePerUnit).toBeCloseTo(5.46, 2);
  });
  it("stays within slab 1 for low usage", () => {
    const r = calculateElectricityBill({ ...base, units: 60 });
    expect(r.slabs.map((s) => s.units)).toEqual([60, 0, 0]);
    expect(r.energyCharge).toBe(210);
  });
  it("zero units gives only the fixed charge plus duty and no division error", () => {
    const r = calculateElectricityBill({ ...base, units: 0 });
    expect(r.total).toBeCloseTo(105, 2);
    expect(r.averagePerUnit).toBe(0);
  });
});

describe("Electricity spec", () => {
  it("runs with defaults and rejects negatives", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[0].value).toBe("₹1,365.00");
    expect(validateFields(spec.fields, { ...raw, units: "-5" }).valid).toBe(false);
  });
  it("page example matches", () => {
    expect(calculateElectricityBill(content.example.expected.input).total).toBeCloseTo(content.example.expected.total, 2);
  });
});
