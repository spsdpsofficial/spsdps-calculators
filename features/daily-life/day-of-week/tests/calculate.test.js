import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { describeDate, isLeapYear, isoWeek } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("describeDate", () => {
  it("15 Aug 1947 was a Friday, day 227, ISO week 33 (Python reference)", () => {
    expect(describeDate("1947-08-15")).toMatchObject({ weekday: "Friday", dayOfYear: 227, isoWeek: 33, quarter: 3, leap: false });
  });
  it("13 Nov 2026: Friday, day 317, week 46", () => {
    expect(describeDate("2026-11-13")).toMatchObject({ weekday: "Friday", dayOfYear: 317, isoWeek: 46 });
  });
  it("ISO week edge cases across year ends", () => {
    expect(isoWeek("2021-01-03")).toEqual({ week: 53, weekYear: 2020 });
    expect(isoWeek("2024-12-30")).toEqual({ week: 1, weekYear: 2025 });
    expect(isoWeek("2026-01-01")).toEqual({ week: 1, weekYear: 2026 });
  });
  it("leap years follow the century rule", () => {
    expect([2000, 2024, 1900, 2100, 2023].map(isLeapYear)).toEqual([true, true, false, false, false]);
    expect(describeDate("2024-12-31").dayOfYear).toBe(366);
  });
});

describe("Day of week spec", () => {
  it("runs with defaults and rejects impossible dates", () => {
    expect(runSpec(spec).out.rows[0].value).toBe("Friday");
    expect(isRejected(spec, { date: "2025-02-30" })).toBe(true);
  });
  it("page example matches", () => {
    expect(describeDate(content.example.expected.input.date)).toMatchObject(content.example.expected.result);
  });
});
