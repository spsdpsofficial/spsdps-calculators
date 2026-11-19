import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateAge } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("calculateAge", () => {
  it("1995-06-15 on 2026-11-11 is 31 years, 4 months, 27 days (Python dateutil reference)", () => {
    const r = calculateAge({ dob: "1995-06-15", asOf: "2026-11-11" });
    expect(r).toMatchObject({ years: 31, months: 4, days: 27, totalDays: 11472, totalMonths: 376, bornOn: "Thursday" });
    expect(r.next).toEqual({ date: "2027-06-15", daysUntil: 216, turningAge: 32 });
  });
  it("is zero on the birth date and shows the birthday as today", () => {
    const r = calculateAge({ dob: "2000-03-10", asOf: "2000-03-10" });
    expect(r).toMatchObject({ years: 0, months: 0, days: 0, totalDays: 0 });
    expect(calculateAge({ dob: "2000-03-10", asOf: "2026-03-10" }).next.daysUntil).toBe(0);
  });
  it("handles leap-day births", () => {
    expect(calculateAge({ dob: "2000-02-29", asOf: "2025-02-28" })).toMatchObject({ years: 25, months: 0, days: 0 });
  });
  it("rejects a birth date in the future", () => {
    expect(calculateAge({ dob: "2030-01-01", asOf: "2026-11-11" }).error).toBeTruthy();
  });
});

describe("Age spec", () => {
  it("validates dates (empty 'age on' allowed) and rejects impossible dates", () => {
    const raw = initialValues(spec.fields);
    expect(validateFields(spec.fields, raw).valid).toBe(true);
    expect(validateFields(spec.fields, { ...raw, dob: "2025-02-30" }).valid).toBe(false);
    expect(validateFields(spec.fields, { ...raw, asOf: "bad" }).valid).toBe(false);
  });
  it("uses an explicit 'age on' date and reports a future birth date", () => {
    const raw = { ...initialValues(spec.fields), asOf: "2026-11-11" };
    const { values } = validateFields(spec.fields, raw);
    expect(spec.run(values, raw).rows[0].value).toBe("31 years, 4 months, 27 days");
    expect(spec.run({ dob: "2999-01-01", asOf: "2026-11-11" }, raw).error).toBeTruthy();
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateAge(e.input)).toMatchObject(e.age);
  });
});
