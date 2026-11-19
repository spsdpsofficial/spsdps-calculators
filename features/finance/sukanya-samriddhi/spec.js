import { formatINR } from "@/lib/formatters";
import { calculateSsy } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Sukanya Samriddhi Yojana calculator",
  fields: [
    { id: "deposit", label: "Yearly deposit", prefix: "₹", min: 250, max: 150000, default: 150000, hint: "Minimum ₹250 and maximum ₹1,50,000 per financial year." },
    { id: "rate", label: "Interest rate (per year)", suffix: "%", min: 0, max: 15, default: 8.2, step: "any", hint: "The government notifies the rate every quarter. Enter the current rate." },
  ],
  run({ deposit, rate }) {
    const r = calculateSsy({ yearlyDeposit: deposit, annualRatePercent: rate });
    return {
      chart: {
        ariaLabel: `Of an estimated maturity of ${formatINR(r.maturity)}, ${formatINR(r.invested)} is deposited and ${formatINR(r.interest)} is interest.`,
        segments: [
          { label: "Deposited", value: r.invested, colorClass: "stroke-chart-a" },
          { label: "Interest", value: r.interest, colorClass: "stroke-chart-b" },
        ],
        centerTop: "Deposit years",
        centerBottom: "15",
      },
      rows: [
        { label: "Estimated maturity value (after 21 years)", value: formatINR(r.maturity), emphasis: true },
        { label: "Total deposited (15 years)", value: formatINR(r.invested), swatchClass: "bg-chart-a" },
        { label: "Total interest", value: formatINR(r.interest), swatchClass: "bg-chart-b" },
      ],
      notes: ["An estimate. The scheme computes interest monthly on the lowest balance, and the rate changes each quarter, so the actual maturity can differ. Verify the rate and rules on India Post or your bank's website."],
      table: {
        title: "Year-wise balance",
        caption: "Estimated balance at the end of each year",
        columns: ["Year", "Balance"],
        rows: r.yearly.map((y) => [y.year, formatINR(y.balance)]),
      },
    };
  },
};
