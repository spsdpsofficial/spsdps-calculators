import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { simulateEpf } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

const base = { monthlyWage: 30000, age: 30, retirementAge: 58, openingBalance: 0, raisePercent: 5, interestPercent: 8.25, epsApplies: true };

describe("simulateEpf", () => {
  it("matches an independent reference: ₹30,000 wage, age 30 to 58, 5% raises, 8.25%", () => {
    expect(simulateEpf(base).balance).toBeCloseTo(13117280.18, 0);
  });
  it("matches a second reference with an opening balance and no raises", () => {
    expect(simulateEpf({ ...base, openingBalance: 200000, raisePercent: 0 }).balance).toBeCloseTo(9259012.81, 0);
  });
  it("balance = opening + contributions + interest", () => {
    const r = simulateEpf(base);
    expect(r.openingBalance + r.employeeTotal + r.employerTotal + r.interestTotal).toBeCloseTo(r.balance, 4);
  });
  it("employer pays less into EPF when EPS applies", () => {
    const withEps = simulateEpf(base);
    const without = simulateEpf({ ...base, epsApplies: false });
    expect(without.employerTotal).toBeGreaterThan(withEps.employerTotal);
  });
  it("EPS share is capped at ₹1,250 a month for high wages", () => {
    const r = simulateEpf({ ...base, monthlyWage: 100000, raisePercent: 0, retirementAge: 31, interestPercent: 0 });
    expect(r.employerTotal).toBeCloseTo((12000 - 1249.5) * 12, 1);
  });
  it("0% interest gives only contributions", () => {
    expect(simulateEpf({ ...base, interestPercent: 0 }).interestTotal).toBe(0);
  });
  it("returns one row per working year", () => {
    expect(simulateEpf(base).rows).toHaveLength(28);
  });
});

describe("EPF spec", () => {
  it("runs with defaults and surfaces the age error", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[0].value).toContain("1,31,17,280");
    expect(spec.run({ ...values, retire: 30 }, raw).error).toBeTruthy();
    expect(validateFields(spec.fields, { ...raw, age: "17" }).valid).toBe(false);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(Math.round(simulateEpf(base).balance)).toBe(e.corpus);
  });
});
