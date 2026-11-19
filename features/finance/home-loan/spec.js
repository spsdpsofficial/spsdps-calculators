import { formatINR } from "@/lib/formatters";
import { calculateHomeLoan } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Home loan calculator",
  fields: [
    { id: "value", label: "Property price", prefix: "₹", min: 100000, max: 1e10, default: 7500000, slider: { min: 500000, max: 100000000, step: 100000 } },
    { id: "down", label: "Down payment", suffix: "%", min: 0, max: 90, default: 20, step: "any", hint: "Banks usually fund up to 75–90% of the price, depending on the amount." },
    { id: "rate", label: "Interest rate (per year)", suffix: "%", min: 0.1, max: 30, default: 8.5, step: "any", slider: { min: 6, max: 14, step: 0.05 } },
    { id: "years", label: "Loan tenure", suffix: "Yr", min: 1, max: 40, integer: true, default: 20, slider: { min: 1, max: 30, step: 1 } },
    { id: "fee", label: "Processing fee (optional)", suffix: "%", min: 0, max: 5, default: 0.5, step: "any", optional: true, emptyValue: 0 },
  ],
  run({ value, down, rate, years, fee }) {
    const r = calculateHomeLoan({ propertyValue: value, downPaymentPercent: down, annualRatePercent: rate, tenureMonths: years * 12, feePercent: fee });
    return {
      chart: {
        ariaLabel: `Of ${formatINR(r.totalRepayment)} repaid, ${formatINR(r.loanAmount)} is principal and ${formatINR(r.totalInterest)} is interest.`,
        segments: [
          { label: "Principal", value: r.loanAmount, colorClass: "stroke-chart-a" },
          { label: "Interest", value: r.totalInterest, colorClass: "stroke-chart-b" },
        ],
        centerTop: "Monthly EMI",
        centerBottom: formatINR(r.emi),
      },
      rows: [
        { label: "Monthly EMI", value: formatINR(r.emi), emphasis: true },
        { label: "Loan amount", value: formatINR(r.loanAmount), swatchClass: "bg-chart-a" },
        { label: "Total interest", value: formatINR(r.totalInterest), swatchClass: "bg-chart-b" },
        { label: "Total repayment", value: formatINR(r.totalRepayment) },
        { label: "Down payment", value: formatINR(r.downPayment) },
        { label: "Processing fee", value: formatINR(r.fee) },
        { label: "Total cost of the home", value: formatINR(r.totalCost) },
      ],
      notes: ["Stamp duty, registration, GST on under-construction property, insurance and legal costs are not included. Floating rates can change during the loan."],
    };
  },
};
