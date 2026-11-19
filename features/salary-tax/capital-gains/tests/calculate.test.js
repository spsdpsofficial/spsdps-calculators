import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateCapitalGains } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

const equity = { assetType: "equity", buyPrice: 500000, sellPrice: 800000, holdingMonths: 18 };

describe("calculateCapitalGains", () => {
  it("long-term equity: ₹3L gain, ₹1.25L exempt, 12.5% on ₹1.75L + 4% cess = ₹22,750", () => {
    const r = calculateCapitalGains(equity);
    expect(r).toMatchObject({ longTerm: true, gain: 300000, taxableGain: 175000, exemptionUsed: 125000 });
    expect(r.tax).toBe(21875);
    expect(r.totalTax).toBeCloseTo(22750, 6);
  });
  it("short-term equity: 20% + cess", () => {
    const r = calculateCapitalGains({ ...equity, holdingMonths: 12 });
    expect(r.longTerm).toBe(false);
    expect(r.totalTax).toBeCloseTo(62400, 6);
  });
  it("small long-term equity gain is fully exempt", () => {
    expect(calculateCapitalGains({ ...equity, sellPrice: 600000 }).totalTax).toBe(0);
  });
  it("property needs more than 24 months; short-term uses the slab rate", () => {
    const base = { assetType: "property", buyPrice: 4000000, sellPrice: 5000000 };
    expect(calculateCapitalGains({ ...base, holdingMonths: 24, slabRatePercent: 30 }).totalTax).toBeCloseTo(312000, 6);
    const lt = calculateCapitalGains({ ...base, holdingMonths: 25 });
    expect(lt.longTerm).toBe(true);
    expect(lt.totalTax).toBeCloseTo(130000, 6);
  });
  it("expenses reduce the gain and a loss pays no tax", () => {
    expect(calculateCapitalGains({ ...equity, expenses: 50000 }).gain).toBe(250000);
    expect(calculateCapitalGains({ ...equity, sellPrice: 400000 })).toMatchObject({ gain: -100000, totalTax: 0 });
  });
});

describe("Capital gains spec", () => {
  it("runs with defaults, shows a loss, and validates", () => {
    expect(runSpec(spec).out.rows[0].value).toBe("₹22,750");
    expect(runSpec(spec, { sell: "400000" }).out.rows[0].label).toBe("Capital loss");
    expect(isRejected(spec, { months: "-1" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(Math.round(calculateCapitalGains(e.input).totalTax)).toBe(e.totalTax);
  });
});
