import { formatCompactINR, formatINR } from "@/lib/formatters";
import { calculateEligibility } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Home loan eligibility calculator",
  fields: [
    { id: "income", label: "Monthly net income", prefix: "₹", min: 1000, max: 1e8, default: 100000, hint: "Take-home income, including co-applicant income if any." },
    { id: "existing", label: "Existing monthly EMIs", prefix: "₹", min: 0, max: 1e8, default: 10000, optional: true, emptyValue: 0 },
    { id: "foir", label: "Share of income for EMIs (FOIR)", suffix: "%", min: 10, max: 80, default: 45, step: "any", hint: "Lenders commonly allow roughly 40–60%, depending on income and policy." },
    { id: "rate", label: "Interest rate (per year)", suffix: "%", min: 0.1, max: 30, default: 8.5, step: "any" },
    { id: "years", label: "Loan tenure", suffix: "Yr", min: 1, max: 40, integer: true, default: 20 },
  ],
  run({ income, existing, foir, rate, years }) {
    const r = calculateEligibility({ monthlyIncome: income, existingEmi: existing, foirPercent: foir, annualRatePercent: rate, tenureMonths: years * 12 });
    if (!r.eligible) return { error: "Your existing EMIs already use up the share of income lenders allow, so there is no room for a new home loan EMI." };
    return {
      rows: [
        { label: "Estimated eligible loan", value: `${formatINR(r.loan)} (${formatCompactINR(r.loan)})`, emphasis: true },
        { label: "Maximum new EMI", value: formatINR(r.maxEmi) },
        { label: "Total EMIs lenders allow", value: formatINR(r.totalAllowed) },
        { label: "Existing EMIs", value: formatINR(existing) },
      ],
      notes: ["An estimate only. Banks also check your credit score, age, job stability and the property before sanctioning an amount."],
    };
  },
};
