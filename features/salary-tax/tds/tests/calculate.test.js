import { describe, expect, it } from "vitest";
import { TDS_NATURES } from "@/lib/tax/tdsRates";
import { content } from "../content";
import { spec } from "../spec";
import { calculateTds } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("calculateTds", () => {
  it("professional fees ₹1,00,000 at 10% → ₹10,000", () => {
    const r = calculateTds({ natureId: "professional", amount: 100000, hasPan: true });
    expect(r.tds).toBe(10000);
    expect(r.netPayable).toBe(90000);
  });
  it("no TDS at or below the threshold", () => {
    expect(calculateTds({ natureId: "professional", amount: 50000, hasPan: true }).tds).toBe(0);
    expect(calculateTds({ natureId: "professional", amount: 50001, hasPan: true }).tds).toBeCloseTo(5000.1, 6);
  });
  it("without PAN the rate is the higher of 2× and 20%", () => {
    expect(calculateTds({ natureId: "professional", amount: 100000, hasPan: false }).ratePercent).toBe(20);
    expect(calculateTds({ natureId: "contractor-individual", amount: 100000, hasPan: false }).ratePercent).toBe(20);
    expect(calculateTds({ natureId: "lottery", amount: 100000, hasPan: false }).ratePercent).toBe(60);
  });
  it("rejects an unknown nature", () => {
    expect(() => calculateTds({ natureId: "nope", amount: 1, hasPan: true })).toThrow();
  });
  it("data table has unique ids and sane rates", () => {
    expect(new Set(TDS_NATURES.map((n) => n.id)).size).toBe(TDS_NATURES.length);
    for (const n of TDS_NATURES) {
      expect(n.ratePercent).toBeGreaterThan(0);
      expect(n.threshold).toBeGreaterThan(0);
    }
  });
});

describe("TDS spec", () => {
  it("runs with defaults and validates", () => {
    expect(runSpec(spec).out.rows[0].value).toBe("₹10,000");
    expect(runSpec(spec, { pan: "no" }).out.rows[0].value).toBe("₹20,000");
    expect(isRejected(spec, { amount: "0" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateTds(e.input).tds).toBe(e.tds);
  });
});
