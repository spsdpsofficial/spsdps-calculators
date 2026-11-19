import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateStampDuty } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("calculateStampDuty", () => {
  it("₹75L at 5% stamp duty + 1% registration → ₹3,75,000 + ₹75,000 (Python reference)", () => {
    const r = calculateStampDuty({ propertyValue: 7500000, stampDutyPercent: 5, registrationPercent: 1 });
    expect(r.stampDuty).toBe(375000);
    expect(r.registration).toBe(75000);
    expect(r.total).toBe(450000);
    expect(r.totalPercentOfValue).toBeCloseTo(6, 10);
    expect(r.costWithCharges).toBe(7950000);
  });
  it("includes other charges", () => {
    expect(calculateStampDuty({ propertyValue: 1000000, stampDutyPercent: 6, registrationPercent: 1, otherCharges: 5000 }).total).toBe(75000);
  });
});

describe("Stamp duty spec", () => {
  it("runs with defaults and validates", () => {
    expect(runSpec(spec).out.rows[0].value).toBe("₹4,50,000");
    expect(isRejected(spec, { stamp: "40" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateStampDuty(e.input).total).toBe(e.total);
  });
});
