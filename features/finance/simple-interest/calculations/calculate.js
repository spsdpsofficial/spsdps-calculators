/** SI = P × R × T ÷ 100, T in years. Month and day periods are converted to years. */
export const toYears = (value, unit) => (unit === "months" ? value / 12 : unit === "days" ? value / 365 : value);

export function simpleInterest({ principal, annualRatePercent, time, unit }) {
  const years = toYears(time, unit);
  const interest = (principal * annualRatePercent * years) / 100;
  return { interest, total: principal + interest, years };
}
