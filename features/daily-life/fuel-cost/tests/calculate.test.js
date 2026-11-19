import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateFuelCost } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("calculateFuelCost", () => {
  it("450 km at 18 km/l and ₹100/L → 25 L, ₹2,500", () => {
    const r = calculateFuelCost({ distance: 450, mileage: 18, price: 100 });
    expect(r).toMatchObject({ litres: 25, cost: 2500 });
    expect(r.costPerKm).toBeCloseTo(5.56, 2);
  });
  it("round trip doubles everything but cost per km", () => {
    const r = calculateFuelCost({ distance: 450, mileage: 18, price: 100, roundTrip: true });
    expect(r).toMatchObject({ litres: 50, cost: 5000, totalDistance: 900 });
    expect(r.costPerKm).toBeCloseTo(5.56, 2);
  });
  it("zero distance has no division error", () => {
    expect(calculateFuelCost({ distance: 0, mileage: 18, price: 100 }).costPerKm).toBe(0);
  });
});

describe("Fuel spec", () => {
  it("rejects zero mileage", () => {
    const raw = initialValues(spec.fields);
    expect(validateFields(spec.fields, raw).valid).toBe(true);
    expect(validateFields(spec.fields, { ...raw, mileage: "0" }).valid).toBe(false);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateFuelCost(e.input)).toMatchObject(e.result);
  });
});
