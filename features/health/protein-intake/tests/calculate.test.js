import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { GOALS, calculateProtein } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("calculateProtein", () => {
  it("70 kg, regular exercise (1.2–1.6 g/kg) → 84–112 g, 21–28 g per meal over 4", () => {
    const r = calculateProtein({ weightKg: 70, goalId: "active", meals: 4 });
    expect(r.low).toBeCloseTo(84, 8);
    expect(r.high).toBeCloseTo(112, 8);
    expect(r.perMealLow).toBeCloseTo(21, 8);
    expect(r.perMealHigh).toBeCloseTo(28, 8);
  });
  it("sedentary uses the 0.8 g/kg recommended amount as its lower bound", () => {
    expect(calculateProtein({ weightKg: 60, goalId: "sedentary", meals: 3 }).low).toBeCloseTo(48, 8);
  });
  it("every goal has a sensible range", () => {
    for (const g of GOALS) expect(g.high).toBeGreaterThan(g.low);
  });
  it("rejects an unknown goal", () => {
    expect(() => calculateProtein({ weightKg: 70, goalId: "x", meals: 3 })).toThrow();
  });
});

describe("Protein spec", () => {
  it("runs with defaults and validates", () => {
    expect(runSpec(spec).out.rows[0].value).toBe("84 g to 112 g");
    expect(isRejected(spec, { weight: "5" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateProtein(e.input).low).toBeCloseTo(e.low, 8);
  });
});
