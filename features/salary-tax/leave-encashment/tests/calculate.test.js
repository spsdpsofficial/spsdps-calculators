import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateLeaveEncashment } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

const base = { avgMonthlySalary: 100000, daysEncashed: 400, yearsOfService: 20, leaveTaken: 100, timing: "leaving", employer: "private" };

describe("calculateLeaveEncashment", () => {
  it("400 days at ₹1L/month: received ₹13,33,333, exempt capped at 10 months' salary ₹10L", () => {
    const r = calculateLeaveEncashment(base);
    expect(r.received).toBeCloseTo(1333333.33, 2);
    expect(r.exempt).toBe(1000000);
    expect(r.taxable).toBeCloseTo(333333.33, 2);
  });
  it("is fully taxable during service", () => {
    expect(calculateLeaveEncashment({ ...base, timing: "during" })).toMatchObject({ exempt: 0 });
  });
  it("government employees on retirement are fully exempt", () => {
    expect(calculateLeaveEncashment({ ...base, employer: "government" }).taxable).toBe(0);
  });
  it("entitlement caps the exemption (30 days per year less leave taken)", () => {
    const r = calculateLeaveEncashment({ ...base, daysEncashed: 100, yearsOfService: 5, leaveTaken: 100 });
    // Entitlement = 150 − 100 = 50 days → ₹1,66,667 exempt
    expect(r.exempt).toBeCloseTo(166666.67, 2);
  });
  it("applies the ₹25 lakh limit", () => {
    const r = calculateLeaveEncashment({ ...base, avgMonthlySalary: 500000, daysEncashed: 600, yearsOfService: 30, leaveTaken: 0 });
    expect(r.exempt).toBe(2500000);
  });
});

describe("Leave encashment spec", () => {
  it("runs with defaults and hides irrelevant fields", () => {
    const { out } = runSpec(spec);
    expect(out.rows[1].value).toBe("₹10,00,000");
    expect(out.table.rows).toHaveLength(4);
    expect(runSpec(spec, { timing: "during" }).out.rows[1].value).toBe("₹0");
    expect(runSpec(spec, { employer: "government" }).out.rows[2].value).toBe("₹0");
    expect(isRejected(spec, { days: "0" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    const r = calculateLeaveEncashment(e.input);
    expect(r.exempt).toBe(e.exempt);
    expect(Math.round(r.taxable)).toBe(e.taxable);
  });
});
