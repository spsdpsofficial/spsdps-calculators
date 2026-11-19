import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateNps, npsCorpus } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

const base = { monthlyContribution: 10000, currentAge: 30, retirementAge: 60, annualReturnPercent: 10, annuityPercent: 40, annuityRatePercent: 6 };

describe("calculateNps", () => {
  it("₹10k/month from 30 to 60 at 10% → corpus ₹2,27,93,253 (Python reference)", () => {
    const r = calculateNps(base);
    expect(r.corpus).toBeCloseTo(22793253.24, 1);
    expect(r.annuityCorpus).toBeCloseTo(9117301.3, 1);
    expect(r.lumpSum).toBeCloseTo(13675951.95, 1);
    expect(r.monthlyPension).toBeCloseTo(45586.51, 1);
    expect(r.invested).toBe(3600000);
  });
  it("zero return gives plain contributions", () => {
    expect(npsCorpus({ monthlyContribution: 1000, annualReturnPercent: 0, years: 2 })).toBe(24000);
  });
  it("100% annuity leaves no lump sum", () => {
    expect(calculateNps({ ...base, annuityPercent: 100 }).lumpSum).toBe(0);
  });
});

describe("NPS spec", () => {
  it("runs with defaults, rejects bad retirement age", () => {
    expect(runSpec(spec).out.rows[0].value).toBe("₹2,27,93,253");
    expect(runSpec(spec, { age: "50", retire: "45" }).out.error).toBeTruthy();
    expect(isRejected(spec, { annuity: "20" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    const r = calculateNps(e.input);
    expect(Math.round(r.corpus)).toBe(e.corpus);
    expect(Math.round(r.monthlyPension)).toBe(e.pension);
  });
});
