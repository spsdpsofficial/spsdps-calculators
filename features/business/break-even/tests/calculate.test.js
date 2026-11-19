import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateBreakEven } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("calculateBreakEven", () => {
  it("₹1,00,000 fixed, ₹250 price, ₹150 variable → 1,000 units, ₹2,50,000; 1,500 units for ₹50,000 profit", () => {
    const r = calculateBreakEven({ fixedCosts: 100000, price: 250, variableCost: 150, targetProfit: 50000 });
    expect(r).toMatchObject({ contribution: 100, contributionRatio: 40, breakEvenUnits: 1000, breakEvenRevenue: 250000, targetUnits: 1500, targetRevenue: 375000 });
  });
  it("rounds units up", () => {
    expect(calculateBreakEven({ fixedCosts: 1000, price: 30, variableCost: 10 }).breakEvenUnits).toBe(50);
    expect(calculateBreakEven({ fixedCosts: 1001, price: 30, variableCost: 10 }).breakEvenUnits).toBe(51);
  });
  it("zero fixed costs breaks even at zero units", () => {
    expect(calculateBreakEven({ fixedCosts: 0, price: 30, variableCost: 10 }).breakEvenUnits).toBe(0);
  });
  it("errors when price does not exceed variable cost", () => {
    expect(calculateBreakEven({ fixedCosts: 1000, price: 10, variableCost: 10 }).error).toBeTruthy();
    expect(calculateBreakEven({ fixedCosts: 1000, price: 5, variableCost: 10 }).error).toBeTruthy();
  });
});

describe("Break-even spec", () => {
  it("runs with defaults, empty target hides target rows, shows error for bad economics", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    const out = spec.run(values, raw);
    expect(out.rows[0].value).toBe("1,000");
    expect(out.rows).toHaveLength(6);
    expect(spec.run({ ...values, target: 0 }, raw).rows).toHaveLength(4);
    expect(spec.run({ ...values, variable: 300 }, raw).error).toBeTruthy();
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateBreakEven(e.input)).toMatchObject(e.result);
  });
});
