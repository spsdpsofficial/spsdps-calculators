import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { futureValue, presentValue } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

const input = { annualRatePercent: 8, years: 5, compounding: "quarterly" };

describe("present and future value", () => {
  it("₹1L at 8% quarterly for 5 years → FV ₹1,48,595; PV of that is ₹67,297 (Python reference)", () => {
    expect(futureValue({ presentValue: 100000, ...input })).toBeCloseTo(148594.74, 2);
    expect(presentValue({ futureValue: 100000, ...input })).toBeCloseTo(67297.13, 2);
  });
  it("PV is the inverse of FV", () => {
    const fv = futureValue({ presentValue: 54321, ...input, compounding: "monthly" });
    expect(presentValue({ futureValue: fv, ...input, compounding: "monthly" })).toBeCloseTo(54321, 6);
  });
  it("zero rate leaves the amount unchanged", () => {
    expect(futureValue({ presentValue: 100, annualRatePercent: 0, years: 3, compounding: "annual" })).toBe(100);
  });
});

describe("PV/FV spec", () => {
  it("runs both modes and validates", () => {
    expect(runSpec(spec).out.rows[0].value).toBe("₹1,48,595");
    expect(runSpec(spec, { mode: "pv" }).out.rows[0].value).toBe("₹67,297");
    expect(isRejected(spec, { years: "0" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(Math.round(futureValue({ presentValue: 100000, ...e.input }))).toBe(e.fv);
    expect(Math.round(presentValue({ futureValue: 100000, ...e.input }))).toBe(e.pv);
  });
});
