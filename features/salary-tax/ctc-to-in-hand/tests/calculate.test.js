import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateCtcBreakup } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

const base = { ctc: 1_500_000, basicPercent: 40, hraPercentOfBasic: 50, pfOnCeiling: false, includeGratuity: true, professionalTaxYearly: 2400 };

describe("calculateCtcBreakup", () => {
  it("matches an independent reference for ₹15,00,000 CTC", () => {
    const r = calculateCtcBreakup(base);
    expect(r.gross).toBeCloseTo(1399153.85, 1);
    expect(r.special).toBeCloseTo(499153.85, 1);
    expect(r.tax).toBeCloseTo(81768, 0);
    expect(r.inHandYearly).toBeCloseTo(1242985.85, 0);
    expect(r.inHandMonthly).toBeCloseTo(103582.15, 0);
  });
  it("components add back up to the CTC", () => {
    const r = calculateCtcBreakup(base);
    expect(r.basic + r.hra + r.special + r.employerPf + r.gratuity).toBeCloseTo(base.ctc, 6);
  });
  it("returns an error when basic + HRA exceed what the CTC allows", () => {
    expect(calculateCtcBreakup({ ...base, basicPercent: 80, hraPercentOfBasic: 60 }).error).toBeTruthy();
  });
  it("PF wage ceiling lowers PF and raises in-hand", () => {
    const capped = calculateCtcBreakup({ ...base, pfOnCeiling: true });
    expect(capped.employeePf).toBeCloseTo(21600, 6);
    expect(capped.gross).toBeGreaterThan(calculateCtcBreakup(base).gross);
  });
  it("no gratuity means zero gratuity component", () => {
    expect(calculateCtcBreakup({ ...base, includeGratuity: false }).gratuity).toBe(0);
  });
});

describe("CTC spec", () => {
  it("runs with defaults, surfaces errors and rejects bad input", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[0].value).toContain("1,03,582");
    expect(spec.run({ ...values, basic: 80, hra: 60 }, raw).error).toBeTruthy();
    expect(validateFields(spec.fields, { ...raw, ctc: "5" }).valid).toBe(false);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(Math.round(calculateCtcBreakup(base).inHandMonthly)).toBe(e.monthly);
  });
});
