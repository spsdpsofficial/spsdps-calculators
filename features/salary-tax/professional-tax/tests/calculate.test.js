import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateProfessionalTax } from "../calculations/calculate";
import { PT_STATES } from "@/lib/tax/professionalTax";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

const pt = (stateId, monthlyGross) => calculateProfessionalTax({ stateId, monthlyGross });

describe("calculateProfessionalTax", () => {
  it("Maharashtra: ₹200 a month, ₹300 in February, ₹2,500 a year", () => {
    const r = pt("maharashtra", 50000);
    expect(r.perPeriod).toBe(200);
    expect(r.februaryAmount).toBe(300);
    expect(r.yearly).toBe(2500);
  });
  it("Maharashtra lower slabs", () => {
    expect(pt("maharashtra", 7500).perPeriod).toBe(0);
    expect(pt("maharashtra", 7501).perPeriod).toBe(175);
    expect(pt("maharashtra", 10000).yearly).toBe(2100);
    expect(pt("maharashtra", 10001).perPeriod).toBe(200);
  });
  it("West Bengal, Telangana, Gujarat boundaries", () => {
    expect(pt("west-bengal", 25000).perPeriod).toBe(130);
    expect(pt("west-bengal", 25001).perPeriod).toBe(150);
    expect(pt("telangana", 15000).perPeriod).toBe(0);
    expect(pt("telangana", 20001).yearly).toBe(2400);
    expect(pt("gujarat", 8999).perPeriod).toBe(80);
    expect(pt("gujarat", 12000).perPeriod).toBe(200);
  });
  it("Tamil Nadu and Kerala use half-yearly income and amounts", () => {
    const tn = pt("tamil-nadu", 20000); // half-year income 1,20,000 -> top slab
    expect(tn.perPeriod).toBe(1250);
    expect(tn.yearly).toBe(2500);
    expect(pt("tamil-nadu", 3500).perPeriod).toBe(0); // 21,000 half-year is nil
    expect(pt("kerala", 25000).perPeriod).toBe(1250);
    expect(pt("kerala", 2000).perPeriod).toBe(120);
  });
  it("never exceeds the ₹2,500 yearly constitutional cap for any state or salary", () => {
    for (const id of Object.keys(PT_STATES)) {
      for (const salary of [0, 5000, 12000, 30000, 80000, 1_000_000]) {
        expect(pt(id, salary).yearly).toBeLessThanOrEqual(2500);
      }
    }
  });
  it("rejects an unknown state", () => {
    expect(pt("narnia", 1000).error).toBeTruthy();
  });
});

describe("Professional tax spec", () => {
  it("runs with defaults and rejects a negative salary", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[0].value).toContain("200");
    expect(validateFields(spec.fields, { ...raw, gross: "-1" }).valid).toBe(false);
    expect(validateFields(spec.fields, { ...raw, state: "xx" }).valid).toBe(false);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(pt(e.state, e.gross).yearly).toBe(e.yearly);
  });
});
