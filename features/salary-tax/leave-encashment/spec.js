import { formatINR } from "@/lib/formatters";
import { calculateLeaveEncashment } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Leave encashment calculator",
  fields: [
    { id: "salary", label: "Average monthly salary (last 10 months)", prefix: "₹", min: 1, max: 1e8, default: 100000, hint: "Basic pay plus dearness allowance (and commission on a fixed percentage of turnover). Average of the 10 months before retirement." },
    { id: "days", label: "Leave days encashed", suffix: "Days", min: 1, max: 10000, integer: true, default: 400 },
    {
      id: "timing",
      label: "When is the leave encashed?",
      type: "select",
      default: "leaving",
      options: [
        { value: "leaving", label: "On retirement, resignation or leaving the job" },
        { value: "during", label: "While still in service" },
      ],
    },
    {
      id: "employer",
      label: "Employer type",
      type: "select",
      default: "private",
      options: [
        { value: "private", label: "Private sector, PSU or other non-government" },
        { value: "government", label: "Central or state government" },
      ],
      showIf: (v) => v.timing === "leaving",
    },
    { id: "years", label: "Years of service with this employer", suffix: "Yr", min: 1, max: 60, integer: true, default: 20, showIf: (v) => v.timing === "leaving" && v.employer === "private" },
    { id: "taken", label: "Leave already taken or encashed earlier", suffix: "Days", min: 0, max: 20000, integer: true, default: 100, optional: true, emptyValue: 0, showIf: (v) => v.timing === "leaving" && v.employer === "private" },
  ],
  run({ salary, days, timing, employer, years, taken }) {
    const r = calculateLeaveEncashment({ avgMonthlySalary: salary, daysEncashed: days, yearsOfService: years ?? 0, leaveTaken: taken ?? 0, timing, employer: employer ?? "private" });
    const rows = [
      { label: "Leave encashment received", value: formatINR(r.received), emphasis: true },
      { label: "Exempt from tax", value: formatINR(r.exempt) },
      { label: "Taxable as salary", value: formatINR(r.taxable) },
      { label: "Value of one day's leave", value: formatINR(r.perDay, { decimals: 2 }) },
    ];
    return {
      rows,
      table: r.limits
        ? { title: "How the exemption is limited", caption: "The exemption is the lowest of these four amounts", columns: ["Limit", "Amount"], rows: [["Actual amount received", formatINR(r.limits.received)], ["10 months' average salary", formatINR(r.limits.tenMonthsSalary)], ["Statutory limit", formatINR(r.limits.statutory)], ["Cash value of leave entitlement", formatINR(r.limits.entitlement)]] }
        : undefined,
      notes: ["Exemption applies to leave encashed on retirement or leaving, under old and new regime rules as per the Income Tax Department's guidance. The ₹25 lakh limit applies to the total across all employers. Confirm the current rules."],
    };
  },
};
