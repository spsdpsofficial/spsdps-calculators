import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateDiscount, originalFromDiscounted } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("calculateDiscount", () => {
  it("₹2,999 with 40% then 10% → ₹1,619.46 (Python reference)", () => {
    const r = calculateDiscount({ price: 2999, discountPercent: 40, extraPercent: 10 });
    expect(r.finalPrice).toBeCloseTo(1619.46, 2);
    expect(r.saved).toBeCloseTo(1379.54, 2);
    expect(r.effectivePercent).toBeCloseTo(46, 0);
  });
  it("single discount and zero price", () => {
    expect(calculateDiscount({ price: 1000, discountPercent: 25 }).finalPrice).toBe(750);
    expect(calculateDiscount({ price: 0, discountPercent: 25 }).effectivePercent).toBe(0);
  });
  it("reverses a discount, rejecting 100%", () => {
    expect(originalFromDiscounted({ finalPrice: 750, discountPercent: 25 }).originalPrice).toBe(1000);
    expect(originalFromDiscounted({ finalPrice: 0, discountPercent: 100 }).error).toBeTruthy();
  });
});

describe("Discount spec", () => {
  it("runs both modes with defaults", () => {
    for (const mode of ["price", "reverse"]) {
      const raw = { ...initialValues(spec.fields), mode };
      const { valid, values } = validateFields(spec.fields, raw);
      expect(valid).toBe(true);
      expect(spec.run(values, raw).rows.length).toBeGreaterThan(1);
    }
  });
  it("empty optional extra discount counts as zero", () => {
    const raw = { ...initialValues(spec.fields), extra: "" };
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(values.extra).toBe(0);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    const r = calculateDiscount(e.input);
    expect(r.finalPrice).toBeCloseTo(e.finalPrice, 2);
    expect(r.saved).toBeCloseTo(e.saved, 2);
  });
});
