import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateDateDifference } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("calculateDateDifference", () => {
  it("1 Jan to 31 Dec 2026 is 364 days, 11 months 30 days", () => {
    const r = calculateDateDifference({ start: "2026-01-01", end: "2026-12-31", includeEnd: false });
    expect(r).toMatchObject({ years: 0, months: 11, days: 30, totalDays: 364, weeks: 52, extraDays: 0 });
    expect(r.weekdays + r.weekendDays).toBe(365);
  });
  it("includeEnd adds one day", () => {
    expect(calculateDateDifference({ start: "2026-01-01", end: "2026-12-31", includeEnd: true }).totalDays).toBe(365);
  });
  it("swaps reversed dates", () => {
    const r = calculateDateDifference({ start: "2026-12-31", end: "2026-01-01", includeEnd: false });
    expect(r.reversed).toBe(true);
    expect(r.totalDays).toBe(364);
  });
  it("same day is zero (one day when including the end)", () => {
    expect(calculateDateDifference({ start: "2026-05-05", end: "2026-05-05", includeEnd: false }).totalDays).toBe(0);
    expect(calculateDateDifference({ start: "2026-05-05", end: "2026-05-05", includeEnd: true }).totalDays).toBe(1);
  });
  it("counts a full week as 5 weekdays and 2 weekend days", () => {
    const r = calculateDateDifference({ start: "2026-11-09", end: "2026-11-15", includeEnd: false });
    expect(r.weekdays).toBe(5);
    expect(r.weekendDays).toBe(2);
  });
});

describe("Date difference spec", () => {
  it("runs with defaults and rejects invalid dates", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[1].value).toBe("364");
    expect(validateFields(spec.fields, { ...raw, end: "2026-02-31" }).valid).toBe(false);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateDateDifference(e.input)).toMatchObject(e.result);
  });
});
