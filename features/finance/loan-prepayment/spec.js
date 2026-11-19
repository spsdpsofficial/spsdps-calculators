import { formatINR } from "@/lib/formatters";
import { simulatePrepayment } from "./calculations/calculate";

const years = (months) => {
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y ? `${y} yr` : "", m ? `${m} mo` : ""].filter(Boolean).join(" ") || "0 mo";
};

export const spec = {
  ariaLabel: "Loan prepayment calculator",
  fields: [
    { id: "principal", label: "Original loan amount", prefix: "₹", min: 10000, max: 10_000_000_000, default: "3000000", slider: { min: 100000, max: 50_000_000, step: 50000 } },
    { id: "rate", label: "Interest rate (per year)", suffix: "%", min: 0.1, max: 40, default: "8.5", slider: { min: 5, max: 20, step: 0.05 } },
    { id: "years", label: "Original tenure", suffix: "Yr", min: 1, max: 40, integer: true, default: "20", slider: { min: 1, max: 30, step: 1 } },
    { id: "afterMonth", label: "Prepay after how many EMIs?", suffix: "EMIs", min: 0, max: 479, integer: true, default: "24", hint: "Use 0 to prepay right at the start." },
    { id: "prepayment", label: "Prepayment amount", prefix: "₹", min: 1, max: 10_000_000_000, default: "500000" },
    {
      id: "mode",
      label: "After prepaying, I want to",
      type: "select",
      default: "tenure",
      options: [
        { value: "tenure", label: "Keep the EMI and finish sooner" },
        { value: "emi", label: "Keep the end date and pay a lower EMI" },
      ],
    },
  ],
  run({ principal, rate, years: tenureYears, afterMonth, prepayment, mode }) {
    const tenureMonths = tenureYears * 12;
    if (afterMonth >= tenureMonths) return { error: "The prepayment must be made before the loan ends." };
    const r = simulatePrepayment({ principal, annualRatePercent: rate, tenureMonths, prepayment, afterMonth, mode });
    if (r.error) return { error: r.error };

    const rows = [
      { label: "Interest saved", value: formatINR(r.interestSaved), emphasis: true },
      { label: "Interest without prepayment", value: formatINR(r.originalInterest) },
      { label: "Interest with prepayment", value: formatINR(r.newInterest) },
      { label: "Balance before prepaying", value: formatINR(r.balanceBefore) },
    ];
    if (mode === "tenure") {
      rows.push(
        { label: "EMI (unchanged)", value: formatINR(r.emi) },
        { label: "New loan tenure", value: years(r.newTenureMonths) },
        { label: "Time saved", value: years(r.monthsSaved) },
      );
    } else {
      rows.push({ label: "Current EMI", value: formatINR(r.emi) }, { label: "New EMI", value: formatINR(r.newEmi) });
    }
    return { rows, notes: ["Banks may charge a prepayment fee on some loans. It is not included."] };
  },
};
