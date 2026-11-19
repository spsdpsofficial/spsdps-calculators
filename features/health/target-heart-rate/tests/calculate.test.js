import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateHeartRateZones } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("calculateHeartRateZones", () => {
  it("age 30, Tanaka: max 187; Karvonen with resting 60: 50% = 123.5, 70% = 148.9 (Python reference)", () => {
    const r = calculateHeartRateZones({ age: 30, formulaId: "tanaka", restingHr: 60 });
    expect(r.max).toBeCloseTo(187, 8);
    expect(r.zones[0].low).toBeCloseTo(123.5, 8);
    expect(r.zones[1].high).toBeCloseTo(148.9, 8);
    expect(r.zones[4].high).toBeCloseTo(187, 8);
  });
  it("without resting HR uses percentages of max", () => {
    const r = calculateHeartRateZones({ age: 30, formulaId: "tanaka" });
    expect(r.method).toBe("percent-of-max");
    expect(r.zones[0].low).toBeCloseTo(93.5, 8);
    expect(r.zones[2].high).toBeCloseTo(149.6, 8);
  });
  it("classic formula is 220 − age", () => {
    expect(calculateHeartRateZones({ age: 30, formulaId: "classic" }).max).toBe(190);
  });
  it("rejects a resting rate above the maximum and an unknown formula", () => {
    expect(calculateHeartRateZones({ age: 90, formulaId: "classic", restingHr: 140 }).error).toBeTruthy();
    expect(() => calculateHeartRateZones({ age: 30, formulaId: "x" })).toThrow();
  });
});

describe("Target heart rate spec", () => {
  it("runs with and without resting rate and validates", () => {
    expect(runSpec(spec).out.rows[0].value).toBe("187 bpm");
    expect(runSpec(spec).out.table.rows[0][2]).toBe("94–112");
    expect(runSpec(spec, { resting: "60" }).out.table.rows[0][2]).toBe("124–136");
    expect(isRejected(spec, { age: "5" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateHeartRateZones(e.input).max).toBeCloseTo(e.max, 8);
  });
});
