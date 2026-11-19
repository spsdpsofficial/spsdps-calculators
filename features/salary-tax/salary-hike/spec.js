import { formatINR, formatPercent } from "@/lib/formatters";
import { calculateHike } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Salary hike calculator",
  fields: [
    { id: "current", label: "Current salary", prefix: "₹", min: 1, max: 10_000_000_000, default: "600000" },
    {
      id: "period",
      label: "Salary entered is",
      type: "select",
      default: "year",
      options: [
        { value: "year", label: "Per year" },
        { value: "month", label: "Per month" },
      ],
    },
    {
      id: "mode",
      label: "What do you know?",
      type: "select",
      default: "percent",
      options: [
        { value: "percent", label: "The hike percentage" },
        { value: "amount", label: "The new salary" },
      ],
    },
    { id: "hike", label: "Hike", suffix: "%", min: 0, max: 1000, default: "10", showIf: (raw) => raw.mode === "percent", slider: { min: 0, max: 100, step: 0.5 } },
    { id: "newSalary", label: "New salary", prefix: "₹", min: 1, max: 10_000_000_000, default: "720000", showIf: (raw) => raw.mode === "amount" },
  ],
  run({ current, period, mode, hike, newSalary }) {
    const r = calculateHike({ current, mode, hikePercent: hike, newSalary });
    const perMonth = period === "month";
    const yearly = (value) => (perMonth ? value * 12 : value);
    const monthly = (value) => (perMonth ? value : value / 12);
    return {
      rows: [
        { label: "Hike percentage", value: formatPercent(r.hikePercent), emphasis: true },
        { label: "New salary per year", value: formatINR(yearly(r.revised)) },
        { label: "New salary per month", value: formatINR(monthly(r.revised)) },
        { label: "Increase per year", value: formatINR(yearly(r.increase)) },
        { label: "Increase per month", value: formatINR(monthly(r.increase)) },
      ],
      notes: r.increase < 0 ? ["The new salary is lower than the current one, so this is a decrease."] : [],
    };
  },
};
