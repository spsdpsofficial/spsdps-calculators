import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { splitBill } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("splitBill", () => {
  it("₹2,450 + 10% across 3 → ₹898.33 each", () => {
    const r = splitBill({ bill: 2450, tipPercent: 10, people: 3 });
    expect(r.tip).toBeCloseTo(245, 8);
    expect(r.total).toBeCloseTo(2695, 8);
    expect(r.share).toBeCloseTo(898.3333, 3);
  });
  it("rounding up gives ₹899 each and ₹2 extra", () => {
    const r = splitBill({ bill: 2450, tipPercent: 10, people: 3, roundUp: true });
    expect(r.share).toBe(899);
    expect(r.extra).toBeCloseTo(2, 8);
  });
  it("an exact share is not rounded up further", () => {
    expect(splitBill({ bill: 2400, tipPercent: 10, people: 4, roundUp: true }).share).toBe(660);
  });
  it("zero tip and one person", () => {
    expect(splitBill({ bill: 500, tipPercent: 0, people: 1 }).share).toBe(500);
  });
});

describe("Tip split spec", () => {
  it("runs with defaults and validates", () => {
    expect(runSpec(spec).out.rows[0].value).toBe("₹898.33");
    expect(runSpec(spec, { round: "yes" }).out.rows[0].value).toBe("₹899.00");
    expect(isRejected(spec, { people: "0" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(splitBill(e.input).share).toBe(e.share);
  });
});
