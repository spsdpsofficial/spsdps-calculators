/** Compound annual growth rate between a start and end value over `years` (may be fractional). */
export function calculateCagr({ startValue, endValue, years }) {
  const cagr = (endValue / startValue) ** (1 / years) - 1;
  const absoluteGain = endValue - startValue;
  return {
    cagrPercent: cagr * 100,
    absoluteGain,
    totalReturnPercent: (absoluteGain / startValue) * 100,
    // Years for money to double at this rate; undefined when the rate is not positive.
    doublingYears: cagr > 0 ? Math.log(2) / Math.log(1 + cagr) : null,
  };
}
