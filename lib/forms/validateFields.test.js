import { describe, expect, it } from "vitest";
import { initialValues, isValidIsoDate, validateFields } from "./validateFields";

const fields = [
  { id: "amount", label: "Amount", prefix: "₹", min: 1000, max: 10_000_000, default: "50000" },
  { id: "rate", label: "Rate", suffix: "%", min: 0, max: 50, default: "7" },
  { id: "years", label: "Years", integer: true, min: 1, max: 40, default: "5" },
  { id: "freq", label: "Frequency", type: "select", options: [{ value: "4", label: "Quarterly" }, { value: "12", label: "Monthly" }], default: "4" },
  { id: "dob", label: "Date of birth", type: "date", default: "2000-01-31" },
  { id: "at", label: "Start time", type: "time", default: "09:30" },
  { id: "extra", label: "Extra", optional: true, min: 0, default: "", showIf: (raw) => raw.freq === "12" },
];

describe("validateFields", () => {
  it("accepts the defaults and parses numbers", () => {
    const result = validateFields(fields, initialValues(fields));
    expect(result.valid).toBe(true);
    expect(result.values).toMatchObject({ amount: 50000, rate: 7, years: 5, freq: "4", dob: "2000-01-31", at: "09:30" });
    expect("extra" in result.values).toBe(false); // hidden field is skipped
  });

  it("reports range, integer, empty and non-numeric problems per field", () => {
    const raw = { ...initialValues(fields), amount: "10", rate: "", years: "2.5" };
    const { errors, valid } = validateFields(fields, raw);
    expect(valid).toBe(false);
    expect(errors.amount).toContain("₹1,000");
    expect(errors.rate).toBeTruthy();
    expect(errors.years).toContain("whole number");
    expect(validateFields(fields, { ...initialValues(fields), rate: "abc" }).errors.rate).toBeTruthy();
  });

  it("rejects unknown select options, bad dates and bad times", () => {
    const { errors } = validateFields(fields, { ...initialValues(fields), freq: "99", dob: "2025-02-30", at: "25:00" });
    expect(Object.keys(errors).sort()).toEqual(["at", "dob", "freq"]);
  });

  it("treats an empty optional number as its emptyValue and validates it when shown", () => {
    const shown = { ...initialValues(fields), freq: "12", extra: "" };
    expect(validateFields(fields, shown).values.extra).toBe(0);
    expect(validateFields(fields, { ...shown, extra: "-3" }).valid).toBe(false);
  });
});

describe("isValidIsoDate", () => {
  it("only accepts real calendar dates", () => {
    expect(isValidIsoDate("2024-02-29")).toBe(true);
    expect(isValidIsoDate("2025-02-29")).toBe(false);
    expect(isValidIsoDate("2025-13-01")).toBe(false);
    expect(isValidIsoDate("31-01-2025")).toBe(false);
    expect(isValidIsoDate(undefined)).toBe(false);
  });
});
