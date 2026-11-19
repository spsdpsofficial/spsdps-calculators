import { describe, expect, it } from "vitest";
import { compareRegimes, computeIncomeTax } from "./incomeTax";

const total = (taxableIncome, regime, ageBand) => computeIncomeTax({ taxableIncome, regime, ageBand }).total;

describe("computeIncomeTax: values from an independent implementation", () => {
  it.each([
    [1_200_000, "new", "below60", 0],
    [1_300_000, "new", "below60", 78_000],
    [1_210_000, "new", "below60", 10_400], // marginal relief
    [1_425_000, "new", "below60", 97_500],
    [1_000_000, "old", "below60", 117_000],
    [500_000, "old", "below60", 0], // 87A rebate
    [500_001, "old", "below60", 13_000.21], // no marginal relief in old regime
    [1_000_000, "old", "senior", 114_400],
    [6_000_000, "new", "below60", 1_578_720], // surcharge 10% with relief logic
    [6_000_000, "old", "below60", 1_844_700],
    [12_000_000, "old", "below60", 4_081_350],
  ])("taxable %i (%s, %s) -> %d", (income, regime, age, expected) => {
    expect(total(income, regime, age)).toBeCloseTo(expected, 1);
  });
});

describe("computeIncomeTax: invariants", () => {
  it("never decreases as income rises (no cliff edges) in either regime", () => {
    for (const regime of ["new", "old"]) {
      let previous = 0;
      for (let income = 0; income <= 60_000_000; income += 25_000) {
        const tax = total(income, regime);
        // Old regime has a deliberate cliff at ₹5 lakh (no marginal relief); everything else must be monotonic.
        if (!(regime === "old" && income === 500_025)) expect(tax).toBeGreaterThanOrEqual(previous - 1e-6);
        previous = tax;
      }
    }
  });
  it("surcharge marginal relief: extra tax never exceeds extra income at a threshold", () => {
    for (const regime of ["new", "old"]) {
      for (const threshold of [5_000_000, 10_000_000, 20_000_000, 50_000_000]) {
        const extra = 10_000;
        const increase = total(threshold + extra, regime) - total(threshold, regime);
        expect(increase).toBeLessThanOrEqual(extra * 1.04 + 1e-6);
      }
    }
  });
  it("is zero for zero or negative income", () => {
    expect(total(0, "new")).toBe(0);
    expect(total(-5, "old")).toBe(0);
  });
  it("splits total into slab tax + surcharge + cess", () => {
    const r = computeIncomeTax({ taxableIncome: 6_000_000, regime: "new" });
    expect(r.slabTax + r.surcharge + r.cess).toBeCloseTo(r.total, 6);
  });
});

describe("compareRegimes", () => {
  it("applies the standard deduction per regime and picks the cheaper one", () => {
    const r = compareRegimes({ grossIncome: 1_500_000, oldRegimeDeductions: 200_000 });
    expect(r.newRegime.taxableIncome).toBe(1_425_000);
    expect(r.oldRegime.taxableIncome).toBe(1_250_000);
    expect(r.newRegime.total).toBeCloseTo(97_500, 1);
    expect(r.betterRegime).toBe("new");
    expect(r.saving).toBeCloseTo(r.oldRegime.total - r.newRegime.total, 6);
  });
  it("old regime wins when deductions are large", () => {
    expect(compareRegimes({ grossIncome: 1_500_000, oldRegimeDeductions: 800_000 }).betterRegime).toBe("old");
  });
  it("non-salaried people get no standard deduction", () => {
    expect(compareRegimes({ grossIncome: 1_000_000, salaried: false }).newRegime.taxableIncome).toBe(1_000_000);
  });
});
