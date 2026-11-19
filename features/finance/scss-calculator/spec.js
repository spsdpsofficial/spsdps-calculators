import { formatINR } from "@/lib/formatters";
import { SCSS_MAX_DEPOSIT, calculateScss } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Senior Citizen Savings Scheme calculator",
  fields: [
    { id: "deposit", label: "Deposit amount", prefix: "₹", min: 1000, max: SCSS_MAX_DEPOSIT, default: 1500000, hint: "Multiples of ₹1,000, up to ₹30,00,000 in the scheme." },
    { id: "rate", label: "Interest rate (per year)", suffix: "%", min: 0, max: 15, default: 8.2, step: "any", hint: "Enter the rate notified for your deposit date." },
  ],
  run({ deposit, rate }) {
    if (deposit % 1000 !== 0) return { error: "SCSS deposits must be in multiples of ₹1,000." };
    const r = calculateScss({ deposit, annualRatePercent: rate });
    return {
      rows: [
        { label: "Interest paid every quarter", value: formatINR(r.quarterly), emphasis: true },
        { label: "Approximate monthly income", value: formatINR(r.monthlyEquivalent) },
        { label: "Interest per year", value: formatINR(r.yearly) },
        { label: `Total interest over 5 years (${r.quarters} quarters)`, value: formatINR(r.totalInterest) },
        { label: "Principal returned at maturity", value: formatINR(deposit) },
      ],
      notes: ["Interest is paid out, not compounded, so the deposit stays constant. Eligibility is for senior citizens (generally 60 and above) and some early retirees. Interest is taxable and TDS may apply above a limit. Check official rules."],
    };
  },
};
