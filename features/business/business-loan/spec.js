import { formatINR, formatPercent } from "@/lib/formatters";
import { calculateBusinessLoan } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Business loan calculator",
  fields: [
    { id: "principal", label: "Loan amount", prefix: "₹", min: 10000, max: 1e10, default: 2500000, slider: { min: 100000, max: 50000000, step: 50000 } },
    { id: "rate", label: "Interest rate (per year)", suffix: "%", min: 0.1, max: 40, default: 14, step: "any", slider: { min: 6, max: 30, step: 0.1 } },
    { id: "years", label: "Tenure", suffix: "Yr", min: 1, max: 30, integer: true, default: 5, slider: { min: 1, max: 15, step: 1 } },
    { id: "fee", label: "Processing fee", suffix: "%", min: 0, max: 10, default: 2, step: "any" },
    { id: "feeGst", label: "GST on processing fee", suffix: "%", min: 0, max: 100, default: 18, step: "any", hint: "Charged on the fee, not on the loan." },
    { id: "income", label: "Monthly business income (optional)", prefix: "₹", min: 0, max: 1e12, default: 400000, optional: true, emptyValue: 0, hint: "Used only to show how large the EMI is compared with your income." },
  ],
  run({ principal, rate, years, fee, feeGst, income }) {
    const r = calculateBusinessLoan({ principal, annualRatePercent: rate, tenureMonths: years * 12, feePercent: fee, feeGstPercent: feeGst, monthlyIncome: income });
    const rows = [
      { label: "Monthly EMI", value: formatINR(r.emi), emphasis: true },
      { label: "Total interest", value: formatINR(r.totalInterest), swatchClass: "bg-chart-b" },
      { label: "Total repayment", value: formatINR(r.totalPayment) },
      { label: "Processing fee incl. GST", value: formatINR(r.totalFees) },
      { label: "Total cost of borrowing (interest + fees)", value: formatINR(r.totalCost) },
      { label: "Amount you receive after fees", value: formatINR(r.amountReceived) },
    ];
    if (r.incomeShare !== null) rows.push({ label: "EMI as a share of monthly income", value: formatPercent(r.incomeShare, { maxDecimals: 1 }) });
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
      notes: ["Rate, fees and rules differ between lenders and schemes. Check the sanction letter. Prepayment or foreclosure charges are not included."],
    };
  },
};
