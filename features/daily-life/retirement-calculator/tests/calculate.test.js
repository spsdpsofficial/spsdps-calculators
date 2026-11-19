import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateRetirement } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

const base = { age: 30, retireAge: 60, lifeExpectancy: 85, monthlyExpense: 50000, inflation: 6, preReturn: 10, postReturn: 7, savings: 500000 };

describe("calculateRetirement", () => {
  it("matches the independent Python reference", () => {
    const r = calculateRetirement(base);
    expect(r.expenseAtRetirement).toBeCloseTo(287174.56, 2);
    expect(r.corpus).toBeCloseTo(77148478.32, 1);
    expect(r.futureSavings).toBeCloseTo(8724701.13, 1);
    expect(r.gap).toBeCloseTo(68423777.19, 1);
    expect(r.monthlySip).toBeCloseTo(30019.31, 2);
  });
  it("needs no investment when savings already cover the corpus", () => {
    const r = calculateRetirement({ ...base, savings: 1e9 });
    expect(r.gap).toBe(0);
    expect(r.monthlySip).toBe(0);
  });
  it("handles inflation equal to post-retirement return", () => {
    const r = calculateRetirement({ ...base, inflation: 7, postReturn: 7 });
    expect(Number.isFinite(r.corpus)).toBe(true);
    expect(r.corpus).toBeCloseTo(r.expenseAtRetirement * 12 * 25, 0);
  });
  it("handles a zero pre-retirement return", () => {
    expect(Number.isFinite(calculateRetirement({ ...base, preReturn: 0 }).monthlySip)).toBe(true);
  });
});

describe("Retirement spec", () => {
  it("runs with defaults", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[1].value).toBe("₹30,019");
  });
  it("rejects inconsistent ages", () => {
    expect(spec.run({ ...initialValues(spec.fields), age: 50, retireAge: 45, life: 85 }, {}).error).toBeTruthy();
    expect(spec.run({ age: 30, retireAge: 60, life: 60 }, {}).error).toBeTruthy();
  });
  it("page example matches", () => {
    const e = content.example.expected;
    const r = calculateRetirement(e.input);
    expect(Math.round(r.corpus)).toBe(e.corpus);
    expect(Math.round(r.monthlySip)).toBe(e.monthlySip);
  });
});
