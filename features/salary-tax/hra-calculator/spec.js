import { formatINR } from "@/lib/formatters";
import { TAX_RATES } from "@/lib/tax/rates";
import { calculateHra } from "./calculations/calculate";

export const spec = {
  ariaLabel: "HRA calculator",
  fields: [
    { id: "basicDa", label: "Monthly basic salary + DA", prefix: "₹", min: 1, max: 100_000_000, default: "50000" },
    { id: "hra", label: "Monthly HRA received", prefix: "₹", min: 0, max: 100_000_000, default: "25000" },
    { id: "rent", label: "Monthly rent paid", prefix: "₹", min: 0, max: 100_000_000, default: "30000" },
    {
      id: "city",
      label: "City you live in",
      type: "select",
      default: "metro",
      options: [
        { value: "metro", label: `${TAX_RATES.hra.metroCities.join(", ")} (50%)` },
        { value: "other", label: "Any other city (40%)" },
      ],
    },
  ],
  run({ basicDa, hra, rent, city }) {
    const r = calculateHra({ basicDa, hraReceived: hra, rentPaid: rent, metro: city === "metro" });
    return {
      rows: [
        { label: "HRA exemption per month", value: formatINR(r.exempt), emphasis: true },
        { label: "HRA exemption per year", value: formatINR(r.exempt * 12) },
        { label: "Taxable HRA per month", value: formatINR(r.taxable) },
        { label: "Taxable HRA per year", value: formatINR(r.taxable * 12) },
        { label: "1. Actual HRA received", value: formatINR(r.limits.received) },
        { label: "2. Rent paid − 10% of salary", value: formatINR(r.limits.rentMinusTenPercent) },
        { label: `3. ${city === "metro" ? "50%" : "40%"} of salary`, value: formatINR(r.limits.percentOfSalary) },
      ],
      notes: ["The exemption is the lowest of the three amounts. HRA exemption is available only in the old tax regime."],
    };
  },
};
