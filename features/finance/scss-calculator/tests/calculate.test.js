import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateScss } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("calculateScss", () => {
  it("₹15L at 8.2% → ₹30,750 a quarter, ₹6,15,000 over 5 years (Python reference)", () => {
    const r = calculateScss({ deposit: 1500000, annualRatePercent: 8.2 });
    expect(r.quarterly).toBe(30750);
    expect(r.totalInterest).toBe(615000);
    expect(r.yearly).toBe(123000);
    expect(r.monthlyEquivalent).toBe(10250);
    expect(r.quarters).toBe(20);
  });
});

describe("SCSS spec", () => {
  it("runs with defaults, enforces maximum and multiples of ₹1,000", () => {
    expect(runSpec(spec).out.rows[0].value).toBe("₹30,750");
    expect(isRejected(spec, { deposit: "3500000" })).toBe(true);
    expect(runSpec(spec, { deposit: "1500500" }).out.error).toBeTruthy();
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateScss(e.input).quarterly).toBe(e.quarterly);
  });
});
