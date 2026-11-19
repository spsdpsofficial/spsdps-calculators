import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { compareRegimes } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("Income tax spec", () => {
  it("runs with defaults and shows both regimes", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    const result = spec.run(values, raw);
    expect(result.rows[0].value).toContain("New regime");
    expect(result.rows.map((row) => row.value).join(" ")).toContain("97,500");
  });
  it("treats an empty deductions field as zero and rejects negatives", () => {
    const raw = { ...initialValues(spec.fields), deductions: "" };
    expect(validateFields(spec.fields, raw).values.deductions).toBe(0);
    expect(validateFields(spec.fields, { ...raw, deductions: "-1" }).valid).toBe(false);
  });
  it("reports 'same tax' when both regimes give nil tax", () => {
    const raw = { ...initialValues(spec.fields), income: "500000" };
    const { values } = validateFields(spec.fields, raw);
    expect(spec.run(values, raw).rows[0].value).toContain("Same tax");
  });
  it("page example matches the engine", () => {
    const e = content.example.expected;
    const r = compareRegimes({ grossIncome: e.income, oldRegimeDeductions: e.deductions });
    expect(Math.round(r.newRegime.total)).toBe(e.newTax);
    expect(Math.round(r.oldRegime.total)).toBe(e.oldTax);
  });
});
