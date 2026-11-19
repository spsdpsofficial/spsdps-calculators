import { formatINR } from "@/lib/formatters";
import { calculateNsc } from "./calculations/calculate";

export const spec = {
  ariaLabel: "NSC calculator",
  fields: [
    { id: "amount", label: "Investment amount", prefix: "₹", min: 1000, max: 1e9, default: 100000, hint: "Minimum ₹1,000, in multiples of ₹100. There is no maximum limit." },
    { id: "rate", label: "Interest rate (per year)", suffix: "%", min: 0, max: 15, default: 7.7, step: "any", hint: "The government notifies the rate every quarter. Enter the rate on your purchase date." },
  ],
  run({ amount, rate }) {
    const r = calculateNsc({ amount, annualRatePercent: rate });
    return {
      rows: [
        { label: "Maturity value after 5 years", value: formatINR(r.maturity), emphasis: true },
        { label: "Amount invested", value: formatINR(r.invested), swatchClass: "bg-chart-a" },
        { label: "Interest earned", value: formatINR(r.interest), swatchClass: "bg-chart-b" },
      ],
      chart: {
        ariaLabel: `Of ${formatINR(r.maturity)} at maturity, ${formatINR(r.invested)} is invested and ${formatINR(r.interest)} is interest.`,
        segments: [
          { label: "Invested", value: r.invested, colorClass: "stroke-chart-a" },
          { label: "Interest", value: r.interest, colorClass: "stroke-chart-b" },
        ],
        centerTop: "Term",
        centerBottom: "5 years",
      },
      notes: ["NSC interest is compounded yearly and paid at maturity. The rate is fixed for the full term from the date you buy. The interest is taxable, though the reinvested part of it may qualify for a deduction under old-regime provisions."],
      table: {
        title: "Year-wise growth",
        caption: "Value at the end of each year",
        columns: ["Year", "Value"],
        rows: r.yearly.map((y) => [y.year, formatINR(y.balance)]),
      },
    };
  },
};
