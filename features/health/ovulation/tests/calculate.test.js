import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateCycles } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("calculateCycles", () => {
  it("LMP 1 Nov 2026, 28-day cycle → period 29 Nov, ovulation 15 Nov, window 10–16 Nov (Python reference)", () => {
    const [c] = calculateCycles({ lmp: "2026-11-01", cycleLength: 28 });
    expect(c).toEqual({ nextPeriod: "2026-11-29", ovulation: "2026-11-15", fertileStart: "2026-11-10", fertileEnd: "2026-11-16" });
  });
  it("a 35-day cycle moves ovulation to day 21", () => {
    const [c] = calculateCycles({ lmp: "2026-11-01", cycleLength: 35 });
    expect(c.ovulation).toBe("2026-11-22");
  });
  it("returns the requested number of cycles, each one cycle length apart", () => {
    const cycles = calculateCycles({ lmp: "2026-11-01", cycleLength: 28, cycles: 3 });
    expect(cycles.map((c) => c.nextPeriod)).toEqual(["2026-11-29", "2026-12-27", "2027-01-24"]);
  });
});

describe("Ovulation spec", () => {
  it("runs with defaults and validates", () => {
    const { out } = runSpec(spec);
    expect(out.rows[0].value).toBe("15 November 2026");
    expect(out.table.rows).toHaveLength(3);
    expect(isRejected(spec, { cycle: "50" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateCycles(e.input)[0]).toEqual(e.first);
  });
});
