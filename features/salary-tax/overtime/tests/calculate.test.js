import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateOvertime } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("calculateOvertime", () => {
  it("₹26,000 ÷ 26 days ÷ 8 h = ₹125/h; 10 h at 2× = ₹2,500", () => {
    const r = calculateOvertime({ monthlyWage: 26000, daysPerMonth: 26, hoursPerDay: 8, overtimeHours: 10, multiplier: 2 });
    expect(r.hourlyRate).toBe(125);
    expect(r.overtimeRate).toBe(250);
    expect(r.overtimePay).toBe(2500);
    expect(r.totalPay).toBe(28500);
  });
  it("zero overtime hours pays nothing extra; 1× is the normal rate", () => {
    expect(calculateOvertime({ monthlyWage: 30000, daysPerMonth: 30, hoursPerDay: 8, overtimeHours: 0, multiplier: 2 }).overtimePay).toBe(0);
    expect(calculateOvertime({ monthlyWage: 24000, daysPerMonth: 30, hoursPerDay: 8, overtimeHours: 5, multiplier: 1 }).overtimePay).toBe(500);
  });
});

describe("Overtime spec", () => {
  it("runs with defaults and validates", () => {
    expect(runSpec(spec).out.rows[0].value).toBe("₹2,500.00");
    expect(isRejected(spec, { days: "0" })).toBe(true);
    expect(isRejected(spec, { multiplier: "0.5" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateOvertime(e.input).overtimePay).toBe(e.pay);
  });
});
