import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateHra } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("calculateHra", () => {
  it("metro: least of ₹25,000, ₹25,000 and ₹25,000", () => {
    const r = calculateHra({ basicDa: 50000, hraReceived: 25000, rentPaid: 30000, metro: true });
    expect(r.exempt).toBe(25000);
    expect(r.taxable).toBe(0);
  });
  it("non-metro uses 40% of salary", () => {
    const r = calculateHra({ basicDa: 50000, hraReceived: 25000, rentPaid: 30000, metro: false });
    expect(r.limits.percentOfSalary).toBe(20000);
    expect(r.exempt).toBe(20000);
    expect(r.taxable).toBe(5000);
  });
  it("is zero when rent is below 10% of salary", () => {
    expect(calculateHra({ basicDa: 50000, hraReceived: 20000, rentPaid: 4000, metro: true }).exempt).toBe(0);
  });
  it("is limited by the HRA received", () => {
    expect(calculateHra({ basicDa: 100000, hraReceived: 10000, rentPaid: 60000, metro: true }).exempt).toBe(10000);
  });
  it("never goes negative or exceeds HRA received", () => {
    for (const rent of [0, 1000, 50000, 500000]) {
      const r = calculateHra({ basicDa: 40000, hraReceived: 15000, rentPaid: rent, metro: false });
      expect(r.exempt).toBeGreaterThanOrEqual(0);
      expect(r.exempt).toBeLessThanOrEqual(15000);
    }
  });
});

describe("HRA spec", () => {
  it("runs with defaults and rejects a missing salary", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[0].value).toContain("25,000");
    expect(validateFields(spec.fields, { ...raw, basicDa: "" }).valid).toBe(false);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateHra(e.input).exempt).toBe(e.exempt);
  });
});
