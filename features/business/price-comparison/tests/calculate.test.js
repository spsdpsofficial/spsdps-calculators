import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { comparePrices } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("comparePrices", () => {
  it("₹250 for 500 g vs ₹460 for 1000 g → B is cheaper by 8% per gram", () => {
    const r = comparePrices([{ name: "A", price: 250, quantity: 500 }, { name: "B", price: 460, quantity: 1000 }]);
    expect(r.best.name).toBe("B");
    expect(r.ranked.map((o) => o.unitPrice)).toEqual([0.46, 0.5]);
    expect(r.savingPercent).toBeCloseTo(8, 10);
    expect(r.ranked[1].extraPercent).toBeCloseTo(8.6957, 3);
  });
  it("ranks three products and skips incomplete ones", () => {
    const r = comparePrices([{ name: "A", price: 100, quantity: 1 }, { name: "B", price: 90, quantity: 1 }, { name: "C", price: 0, quantity: 0 }]);
    expect(r.ranked.map((o) => o.name)).toEqual(["B", "A"]);
  });
  it("flags ties and too few products", () => {
    expect(comparePrices([{ name: "A", price: 10, quantity: 1 }, { name: "B", price: 20, quantity: 2 }]).tie).toBe(true);
    expect(comparePrices([{ name: "A", price: 10, quantity: 1 }]).error).toBeTruthy();
  });
});

describe("Price comparison spec", () => {
  it("runs with defaults, leaving the optional third product empty", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    const out = spec.run(values, raw);
    expect(out.rows[0].label).toBe("Product B (best value)");
    expect(out.rows.at(-1).value).toBe("8%");
  });
  it("uses a filled third product", () => {
    const raw = { ...initialValues(spec.fields), priceC: "400", qtyC: "1000" };
    const { values } = validateFields(spec.fields, raw);
    expect(spec.run(values, raw).rows[0].label).toBe("Product C (best value)");
  });
  it("page example matches", () => {
    const e = content.example.expected;
    const r = comparePrices(e.input);
    expect(r.best.name).toBe(e.best);
    expect(r.savingPercent).toBeCloseTo(e.savingPercent, 6);
  });
});
