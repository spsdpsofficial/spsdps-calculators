import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { simulateSwp } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("simulateSwp", () => {
  it("₹50L, ₹40k/month, 8%, 20 years → ending ₹9,16,125 (Python reference)", () => {
    const r = simulateSwp({ corpus: 5000000, monthlyWithdrawal: 40000, annualRatePercent: 8, months: 240 });
    expect(r.endingBalance).toBeCloseTo(916125.12, 1);
    expect(r.totalWithdrawn).toBe(9600000);
    expect(r.depleted).toBe(false);
    expect(r.yearly).toHaveLength(20);
  });
  it("₹60k/month exhausts the corpus after 121 months", () => {
    const r = simulateSwp({ corpus: 5000000, monthlyWithdrawal: 60000, annualRatePercent: 8, months: 240 });
    expect(r.depleted).toBe(true);
    expect(r.lastedMonths).toBe(121);
    expect(r.totalWithdrawn).toBeGreaterThan(5000000);
  });
  it("zero return simply divides the corpus", () => {
    const r = simulateSwp({ corpus: 120000, monthlyWithdrawal: 10000, annualRatePercent: 0, months: 24 });
    expect(r.lastedMonths).toBe(12);
    expect(r.totalWithdrawn).toBe(120000);
  });
});

describe("SWP spec", () => {
  it("runs with defaults and validates", () => {
    const { out } = runSpec(spec);
    expect(out.rows[0].value).toBe("₹9,16,125");
    expect(out.table.rows).toHaveLength(20);
    expect(runSpec(spec, { withdrawal: "60000" }).out.rows[0].value).toBe("10 years 1 months");
    expect(isRejected(spec, { rate: "40" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(Math.round(simulateSwp(e.input).endingBalance)).toBe(e.ending);
  });
});
