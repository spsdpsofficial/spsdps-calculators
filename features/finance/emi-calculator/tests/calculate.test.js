import { describe, expect, it } from "vitest";
import { content } from "../content";
import { buildSchedule, calculateEmi, summariseByYear } from "../calculations/calculate";
import { LIMITS, validateEmiInput } from "../validation/validate";

const base = { principal: 1_000_000, annualRatePercent: 12, tenureMonths: 12 };

describe("calculateEmi", () => {
  it("matches the well-known reference: ₹10,00,000 at 12% for 1 year = ₹88,848.79", () => {
    const { emi, totalPayment, totalInterest } = calculateEmi(base);
    expect(emi).toBeCloseTo(88848.79, 2);
    expect(totalPayment).toBeCloseTo(1066185.46, 1);
    expect(totalInterest).toBeCloseTo(66185.46, 1);
  });

  it("matches an independent reference: ₹10,00,000 at 6.5% for 5 years", () => {
    const { emi, totalInterest } = calculateEmi({ principal: 1_000_000, annualRatePercent: 6.5, tenureMonths: 60 });
    expect(Math.round(emi)).toBe(19566);
    expect(Math.round(totalInterest)).toBe(173969);
  });

  it("handles a 0% rate as principal / months", () => {
    const { emi, totalInterest } = calculateEmi({ ...base, annualRatePercent: 0 });
    expect(emi).toBeCloseTo(1_000_000 / 12, 6);
    expect(totalInterest).toBeCloseTo(0, 6);
  });

  it("stays accurate for a tiny non-zero rate (no catastrophic cancellation)", () => {
    const { emi } = calculateEmi({ principal: 1_200_000, annualRatePercent: 0.0001, tenureMonths: 120 });
    expect(emi).toBeGreaterThan(10_000);
    expect(emi).toBeLessThan(10_001);
  });

  it("handles the longest tenure and largest amount without overflow", () => {
    const result = calculateEmi({ principal: LIMITS.principal.max, annualRatePercent: 50, tenureMonths: 480 });
    expect(Number.isFinite(result.emi)).toBe(true);
    expect(result.totalPayment).toBeGreaterThan(result.principal);
  });

  it("handles a one-month loan", () => {
    const { emi } = calculateEmi({ principal: 100_000, annualRatePercent: 12, tenureMonths: 1 });
    expect(emi).toBeCloseTo(101_000, 6);
  });

  it("keeps decimals in the principal", () => {
    const { emi } = calculateEmi({ principal: 250_000.5, annualRatePercent: 9, tenureMonths: 36 });
    expect(emi).toBeCloseTo(7949.9, 0);
  });

  it("matches the worked example shown on the page", () => {
    const { expected } = content.example;
    const result = calculateEmi(expected);
    expect(Math.round(result.emi)).toBe(expected.emi);
    expect(Math.round(result.totalInterest)).toBe(expected.totalInterest);
    expect(Math.round(result.totalPayment)).toBe(expected.totalPayment);
  });
});

describe("buildSchedule / summariseByYear", () => {
  const input = { principal: 1_500_000, annualRatePercent: 9.5, tenureMonths: 120 };

  it("repays exactly the principal and ends at a zero balance", () => {
    const rows = buildSchedule(input);
    expect(rows).toHaveLength(120);
    expect(rows.at(-1).balance).toBe(0);
    const principalPaid = rows.reduce((sum, row) => sum + row.principalPaid, 0);
    expect(principalPaid).toBeCloseTo(input.principal, 4);
  });

  it("total interest in the schedule equals totalInterest from calculateEmi", () => {
    const rows = buildSchedule(input);
    const interest = rows.reduce((sum, row) => sum + row.interest, 0);
    expect(interest).toBeCloseTo(calculateEmi(input).totalInterest, 4);
  });

  it("interest falls and principal rises over time", () => {
    const rows = buildSchedule(input);
    expect(rows[0].interest).toBeGreaterThan(rows.at(-1).interest);
    expect(rows[0].principalPaid).toBeLessThan(rows.at(-1).principalPaid);
  });

  it("groups into whole years, including a part-year tail", () => {
    expect(summariseByYear(buildSchedule(input))).toHaveLength(10);
    expect(summariseByYear(buildSchedule({ ...input, tenureMonths: 30 }))).toHaveLength(3);
  });
});

describe("validateEmiInput", () => {
  const good = { principal: "10,00,000", rate: "8.5", tenure: "5", tenureUnit: "years" };

  it("accepts good input, including Indian comma grouping", () => {
    const result = validateEmiInput(good);
    expect(result.valid).toBe(true);
    expect(result.values).toEqual({ principal: 1_000_000, annualRatePercent: 8.5, tenureMonths: 60 });
  });

  it("converts years to months and rounds fractional years", () => {
    expect(validateEmiInput({ ...good, tenure: "2.5" }).values.tenureMonths).toBe(30);
    expect(validateEmiInput({ ...good, tenure: "18", tenureUnit: "months" }).values.tenureMonths).toBe(18);
  });

  it.each([
    ["empty principal", { principal: "" }, "principal"],
    ["non-numeric principal", { principal: "abc" }, "principal"],
    ["negative-looking principal", { principal: "-5" }, "principal"],
    ["zero principal", { principal: "0" }, "principal"],
    ["too-large principal", { principal: "99999999999" }, "principal"],
    ["empty rate", { rate: "" }, "rate"],
    ["rate above the limit", { rate: "51" }, "rate"],
    ["exponent notation", { rate: "1e2" }, "rate"],
    ["empty tenure", { tenure: "" }, "tenure"],
    ["zero tenure", { tenure: "0" }, "tenure"],
    ["tenure above 40 years", { tenure: "41" }, "tenure"],
    ["tenure above 480 months", { tenure: "481", tenureUnit: "months" }, "tenure"],
  ])("rejects %s", (_name, override, field) => {
    const result = validateEmiInput({ ...good, ...override });
    expect(result.valid).toBe(false);
    expect(result.errors[field]).toBeTruthy();
  });

  it("allows a 0% rate", () => {
    expect(validateEmiInput({ ...good, rate: "0" }).valid).toBe(true);
  });

  it("reports several errors at once", () => {
    const result = validateEmiInput({ principal: "", rate: "", tenure: "", tenureUnit: "years" });
    expect(Object.keys(result.errors).sort()).toEqual(["principal", "rate", "tenure"]);
  });
});
