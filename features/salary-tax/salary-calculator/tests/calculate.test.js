import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateSalary } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

const base = { basic: 60000, hra: 30000, other: 40000, pfOnCeiling: false, professionalTax: 200, estimateTds: true };

describe("calculateSalary", () => {
  it("matches an independent reference for ₹1,30,000 gross", () => {
    const r = calculateSalary(base);
    expect(r.gross).toBe(130000);
    expect(r.pf).toBeCloseTo(7200, 6);
    expect(r.tds).toBeCloseTo(8905, 1);
    expect(r.inHand).toBeCloseTo(113695, 1);
  });
  it("caps PF at the wage ceiling", () => {
    expect(calculateSalary({ ...base, pfOnCeiling: true }).pf).toBeCloseTo(1800, 6);
  });
  it("skips TDS when not requested, and pays no tax up to the rebate limit", () => {
    expect(calculateSalary({ ...base, estimateTds: false }).tds).toBe(0);
    expect(calculateSalary({ basic: 40000, hra: 20000, other: 15000, pfOnCeiling: false, professionalTax: 200, estimateTds: true }).tds).toBe(0);
  });
});

describe("Salary spec", () => {
  it("runs with defaults, honours 'no PF' and rejects bad input", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[0].value).toContain("1,13,695");
    expect(spec.run({ ...values, pfBase: "none" }, raw).rows[2].value).toContain("0");
    expect(validateFields(spec.fields, { ...raw, basic: "0" }).valid).toBe(false);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(Math.round(calculateSalary(base).inHand)).toBe(e.inHand);
  });
});
