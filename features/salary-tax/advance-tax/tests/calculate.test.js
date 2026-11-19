import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateAdvanceTax } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("calculateAdvanceTax", () => {
  it("₹2.5L tax, ₹50k TDS → 15/45/75/100% of ₹2L on the statutory dates", () => {
    const r = calculateAdvanceTax({ fyStartYear: 2026, taxLiability: 250000, tdsTcs: 50000 });
    expect(r.netTax).toBe(200000);
    expect(r.schedule.map((s) => s.dueDate)).toEqual(["2026-06-15", "2026-09-15", "2026-12-15", "2027-03-15"]);
    expect(r.schedule.map((s) => s.instalment)).toEqual([30000, 60000, 60000, 50000]);
    expect(r.schedule.map((s) => s.cumulative)).toEqual([30000, 90000, 150000, 200000]);
  });
  it("is not needed below ₹10,000 net, but is needed at exactly ₹10,000", () => {
    expect(calculateAdvanceTax({ fyStartYear: 2026, taxLiability: 12000, tdsTcs: 3000 }).required).toBe(false);
    expect(calculateAdvanceTax({ fyStartYear: 2026, taxLiability: 10000 }).required).toBe(true);
  });
  it("presumptive taxpayers pay everything by 15 March; seniors without business are exempt", () => {
    const p = calculateAdvanceTax({ fyStartYear: 2026, taxLiability: 100000, kind: "presumptive" });
    expect(p.schedule).toHaveLength(1);
    expect(p.schedule[0]).toMatchObject({ dueDate: "2027-03-15", instalment: 100000 });
    expect(calculateAdvanceTax({ fyStartYear: 2026, taxLiability: 100000, kind: "senior" }).required).toBe(false);
  });
  it("TDS larger than tax gives zero", () => {
    expect(calculateAdvanceTax({ fyStartYear: 2026, taxLiability: 1000, tdsTcs: 5000 }).netTax).toBe(0);
  });
});

describe("Advance tax spec", () => {
  it("runs with defaults and validates", () => {
    const { out } = runSpec(spec);
    expect(out.table.rows[0]).toEqual(["15 June 2026", "15%", "₹30,000", "₹30,000"]);
    expect(runSpec(spec, { tax: "5000" }).out.rows[1].value).toBe("No");
    expect(isRejected(spec, { tax: "-1" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateAdvanceTax(e.input).schedule.map((s) => s.instalment)).toEqual(e.instalments);
  });
});
