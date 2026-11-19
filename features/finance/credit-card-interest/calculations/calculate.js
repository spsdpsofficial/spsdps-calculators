/**
 * Interest on an unpaid credit-card balance, charged daily:
 *   interest = balance × (monthly rate × 12 ÷ 100 ÷ 365) × days
 * GST (default 18%) is typically added on the interest charge; pass gstPercent = 0 to exclude it.
 */
export function cardInterest({ balance, monthlyRatePercent, days, gstPercent = 0 }) {
  const annualRate = (monthlyRatePercent * 12) / 100;
  const interest = (balance * annualRate * days) / 365;
  const gst = (interest * gstPercent) / 100;
  return { interest, gst, total: interest + gst, annualRatePercent: annualRate * 100, perDay: interest / days };
}
