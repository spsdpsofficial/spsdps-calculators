import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateReverseGst } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("calculateReverseGst", () => {
  it("₹11,800 incl. 18% → ₹10,000 + ₹1,800", () => {
    const r = calculateReverseGst({ inclusiveAmount: 11800, ratePercent: 18 });
    expect(r.net).toBeCloseTo(10000, 8);
    expect(r.gst).toBeCloseTo(1800, 8);
    expect(r.cgst).toBeCloseTo(900, 8);
    expect(r.gstShareOfPrice).toBeCloseTo(15.2542, 4);
  });
  it("0% GST leaves the price unchanged", () => {
    const r = calculateReverseGst({ inclusiveAmount: 500, ratePercent: 0 });
    expect(r).toMatchObject({ net: 500, gst: 0, gstShareOfPrice: 0 });
  });
});

describe("Reverse GST spec", () => {
  it("runs with defaults and a custom rate", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[0].value).toBe("₹10,000.00");
    const custom = { ...raw, rateChoice: "custom", customRate: "12" };
    const v = validateFields(spec.fields, custom);
    expect(v.valid).toBe(true);
    expect(spec.run(v.values, custom).rows[1].label).toBe("GST included (12%)");
  });
  it("page example matches", () => {
    const e = content.example.expected;
    const r = calculateReverseGst(e.input);
    expect(r.net).toBeCloseTo(e.net, 6);
    expect(r.gst).toBeCloseTo(e.gst, 6);
  });
});
