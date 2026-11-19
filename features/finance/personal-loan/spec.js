import { formatINR, formatPercent } from "@/lib/formatters";
import { calculatePersonalLoan } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Personal loan calculator",
  fields: [
    { id: "principal", label: "Loan amount", prefix: "₹", min: 10000, max: 1e8, default: 500000, slider: { min: 50000, max: 4000000, step: 10000 } },
    { id: "rate", label: "Interest rate (per year)", suffix: "%", min: 0.1, max: 50, default: 13, step: "any", slider: { min: 8, max: 30, step: 0.1 } },
    { id: "months", label: "Tenure", suffix: "Mo", min: 3, max: 120, integer: true, default: 36, slider: { min: 6, max: 84, step: 1 } },
    { id: "fee", label: "Processing fee", suffix: "%", min: 0, max: 10, default: 2, step: "any" },
    { id: "feeGst", label: "GST on processing fee", suffix: "%", min: 0, max: 100, default: 18, step: "any" },
    { id: "income", label: "Monthly income (optional)", prefix: "₹", min: 0, max: 1e10, default: "", optional: true, emptyValue: 0, hint: "Shows how much of your income the EMI takes." },
  ],
  run({ principal, rate, months, fee, feeGst, income }) {
    const r = calculatePersonalLoan({ principal, annualRatePercent: rate, tenureMonths: months, feePercent: fee, feeGstPercent: feeGst, monthlyIncome: income });
    const rows = [
      { label: "Monthly EMI", value: formatINR(r.emi), emphasis: true },
      { label: "Total interest", value: formatINR(r.totalInterest), swatchClass: "bg-chart-b" },
      { label: "Total repayment", value: formatINR(r.totalPayment) },
      { label: "Processing fee incl. GST", value: formatINR(r.totalFees) },
      { label: "Amount you receive", value: formatINR(r.netReceived) },
      { label: "Total cost of borrowing", value: formatINR(r.totalCost) },
      { label: "Effective interest rate including fees", value: formatPercent(r.effectiveRatePercent, { maxDecimals: 2 }) },
    ];
    if (r.incomeShare !== null) rows.push({ label: "EMI as a share of income", value: formatPercent(r.incomeShare, { maxDecimals: 1 }) });
    return {
      rows,
      chart: {
        ariaLabel: `Of ${formatINR(r.totalPayment)} repaid, ${formatINR(principal)} is principal and ${formatINR(r.totalInterest)} is interest.`,
        segments: [
          { label: "Principal", value: principal, colorClass: "stroke-chart-a" },
          { label: "Interest", value: r.totalInterest, colorClass: "stroke-chart-b" },
        ],
        centerTop: "Interest share",
        centerBottom: formatPercent((r.totalInterest / r.totalPayment) * 100, { maxDecimals: 1 }),
      },
      notes: ["The effective rate treats the fee as a cost you pay upfront, so it is higher than the quoted rate. Prepayment charges and insurance are not included."],
    };
  },
};
