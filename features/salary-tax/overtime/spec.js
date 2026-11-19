import { formatINR } from "@/lib/formatters";
import { calculateOvertime } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Overtime pay calculator",
  fields: [
    { id: "wage", label: "Monthly wage", prefix: "₹", min: 1, max: 1e8, default: 26000, hint: "Basic pay plus dearness allowance is commonly used. Check your contract." },
    { id: "days", label: "Working days in a month", suffix: "Days", min: 1, max: 31, integer: true, default: 26 },
    { id: "hours", label: "Normal working hours a day", suffix: "Hrs", min: 1, max: 24, default: 8, step: "any" },
    { id: "ot", label: "Overtime hours in the month", suffix: "Hrs", min: 0, max: 400, default: 10, step: "any" },
    { id: "multiplier", label: "Overtime rate multiplier", suffix: "×", min: 1, max: 5, default: 2, step: "any", hint: "Many establishments pay twice the normal hourly rate. Use what your contract or state rules say." },
  ],
  run({ wage, days, hours, ot, multiplier }) {
    const r = calculateOvertime({ monthlyWage: wage, daysPerMonth: days, hoursPerDay: hours, overtimeHours: ot, multiplier });
    return {
      rows: [
        { label: "Overtime pay", value: formatINR(r.overtimePay, { decimals: 2 }), emphasis: true },
        { label: "Normal hourly rate", value: formatINR(r.hourlyRate, { decimals: 2 }) },
        { label: "Overtime hourly rate", value: formatINR(r.overtimeRate, { decimals: 2 }) },
        { label: "Wage plus overtime", value: formatINR(r.totalPay, { decimals: 2 }) },
      ],
      notes: ["Overtime rules depend on your employer, contract and state law. Statutory deductions such as PF, ESI and tax are not applied."],
    };
  },
};
