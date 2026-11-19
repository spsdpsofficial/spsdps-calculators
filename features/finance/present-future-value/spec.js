import { formatINR } from "@/lib/formatters";
import { futureValue, presentValue } from "./calculations/calculate";

const compounding = {
  id: "compounding",
  label: "Compounding",
  type: "select",
  default: "quarterly",
  options: [
    { value: "annual", label: "Yearly" },
    { value: "semiannual", label: "Half-yearly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "monthly", label: "Monthly" },
  ],
};

export const spec = {
  ariaLabel: "Present value and future value calculator",
  fields: [
    {
      id: "mode",
      label: "I want to find the",
      type: "select",
      default: "fv",
      options: [
        { value: "fv", label: "Future value of money I have today" },
        { value: "pv", label: "Present value of money I will get later" },
      ],
    },
    { id: "amount", label: "Amount", prefix: "₹", min: 1, max: 1e12, default: 100000 },
    { id: "rate", label: "Rate (per year)", suffix: "%", min: 0, max: 50, default: 8, step: "any" },
    { id: "years", label: "Number of years", suffix: "Yr", min: 0.25, max: 100, default: 5, step: "any" },
    compounding,
  ],
  run({ mode, amount, rate, years, compounding: freq }) {
    const input = { annualRatePercent: rate, years, compounding: freq };
    if (mode === "pv") {
      const pv = presentValue({ futureValue: amount, ...input });
      return {
        rows: [
          { label: "Present value (worth today)", value: formatINR(pv), emphasis: true },
          { label: "Amount received in the future", value: formatINR(amount) },
          { label: "Discount", value: formatINR(amount - pv) },
        ],
        notes: ["The rate is the discount rate: the return you could earn on the money elsewhere."],
      };
    }
    const fv = futureValue({ presentValue: amount, ...input });
    return {
      rows: [
        { label: "Future value", value: formatINR(fv), emphasis: true },
        { label: "Amount today", value: formatINR(amount) },
        { label: "Growth", value: formatINR(fv - amount) },
      ],
      notes: ["The rate is assumed constant. Taxes and charges are not deducted."],
    };
  },
};
