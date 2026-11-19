import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { averageGrades, cgpaToPercent, parseGrades, percentToCgpa } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("grade maths", () => {
  it("CGPA 8.4 × 9.5 = 79.8% and back", () => {
    expect(cgpaToPercent(8.4)).toBeCloseTo(79.8, 10);
    expect(percentToCgpa(79.8)).toBeCloseTo(8.4, 10);
  });
  it("averages SGPAs; parses commas and spaces", () => {
    expect(averageGrades(parseGrades("8.2, 7.9 8.5").values)).toBeCloseTo(8.2, 10);
  });
  it("rejects bad grade lists", () => {
    expect(parseGrades("").error).toBeTruthy();
    expect(parseGrades("8, abc").error).toContain("abc");
    expect(parseGrades("11").error).toBeTruthy();
    expect(parseGrades("-1").error).toBeTruthy();
  });
});

describe("CGPA spec", () => {
  it("runs each mode", () => {
    expect(runSpec(spec).out.rows[0].value).toBe("79.8%");
    expect(runSpec(spec, { mode: "toCgpa" }).out.rows[0].value).toBe("8.4");
    expect(runSpec(spec, { mode: "average" }).out.rows[0].value).toBe("8.2");
    expect(runSpec(spec, { mode: "average", sgpas: "9, x" }).out.error).toBeTruthy();
    expect(isRejected(spec, { cgpa: "11" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(cgpaToPercent(e.cgpa, e.factor)).toBeCloseTo(e.percent, 10);
  });
});
