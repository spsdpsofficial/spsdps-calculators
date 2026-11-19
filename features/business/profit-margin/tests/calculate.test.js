import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateProfitMargin } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("calculateProfitMargin", () => {
  it("margin from cost and price", () => {
    expect(calculateProfitMargin({ mode: "margin", cost: 800, price: 1000 })).toMatchObject({ profit: 200, marginPercent: 20, markupPercent: 25 });
  });
  it("price from cost and target margin", () => {
    expect(calculateProfitMargin({ mode: "price", cost: 800, targetMargin: 20 }).price).toBe(1000);
  });
  it("cost from price and target margin", () => {
    expect(calculateProfitMargin({ mode: "cost", price: 1000, targetMargin: 20 }).cost).toBe(800);
  });
});

describe("Profit margin spec", () => {
  it("validates only visible fields in every mode", () => {
    for (const mode of ["margin", "price", "cost"]) {
      const raw = { ...initialValues(spec.fields), mode };
      const { valid, values } = validateFields(spec.fields, raw);
      expect(valid).toBe(true);
      expect(spec.run(values, raw).rows.length).toBe(5);
    }
  });
  it("rejects a 100% target margin at validation", () => {
    const raw = { ...initialValues(spec.fields), mode: "price", margin: "100" };
    expect(validateFields(spec.fields, raw).valid).toBe(false);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateProfitMargin(e.input)).toMatchObject(e.result);
  });
});
