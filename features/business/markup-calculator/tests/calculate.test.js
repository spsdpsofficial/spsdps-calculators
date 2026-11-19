import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateMarkup } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("calculateMarkup", () => {
  it("price from cost and markup", () => {
    expect(calculateMarkup({ mode: "price", cost: 800, markup: 25 })).toMatchObject({ price: 1000, profit: 200, marginPercent: 20 });
  });
  it("markup from cost and price", () => {
    expect(calculateMarkup({ mode: "markup", cost: 800, price: 1000 }).markupPercent).toBe(25);
  });
  it("cost from price and markup", () => {
    expect(calculateMarkup({ mode: "cost", price: 1000, markup: 25 }).cost).toBe(800);
  });
  it("a 100% markup is a 50% margin", () => {
    expect(calculateMarkup({ mode: "price", cost: 500, markup: 100 }).marginPercent).toBe(50);
  });
});

describe("Markup spec", () => {
  it("validates only visible fields in every mode", () => {
    for (const mode of ["price", "markup", "cost"]) {
      const raw = { ...initialValues(spec.fields), mode };
      const { valid, values } = validateFields(spec.fields, raw);
      expect(valid).toBe(true);
      expect(spec.run(values, raw).rows.length).toBe(5);
    }
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateMarkup(e.input)).toMatchObject(e.result);
  });
});
