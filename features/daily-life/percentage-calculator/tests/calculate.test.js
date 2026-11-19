import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { addOrSubtractPercent, percentChange, percentOf, whatPercent } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("percentage maths", () => {
  it("percentOf", () => expect(percentOf(15, 2400).value).toBe(360));
  it("whatPercent", () => {
    expect(whatPercent(360, 2400).value).toBe(15);
    expect(whatPercent(1, 0).error).toBeTruthy();
  });
  it("percentChange up and down", () => {
    expect(percentChange(1000, 1250)).toEqual({ value: 25, change: 250 });
    expect(percentChange(1250, 1000).value).toBe(-20);
    expect(percentChange(0, 5).error).toBeTruthy();
  });
  it("add / subtract", () => {
    expect(addOrSubtractPercent(2400, 15, "add").value).toBe(2760);
    expect(addOrSubtractPercent(2400, 15, "subtract").value).toBe(2040);
  });
});

describe("Percentage spec", () => {
  it("runs each mode, validating only the visible fields", () => {
    const base = initialValues(spec.fields);
    for (const mode of ["of", "what", "change", "adjust"]) {
      const raw = { ...base, mode };
      const { valid, values } = validateFields(spec.fields, raw);
      expect(valid).toBe(true);
      expect(spec.run(values, raw).rows?.length).toBeGreaterThan(0);
    }
  });
  it("reports divide-by-zero as an error", () => {
    expect(spec.run({ mode: "what", a: 5, b: 0 }, {}).error).toBeTruthy();
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(percentOf(e.percent, e.base).value).toBe(e.answer);
  });
});
