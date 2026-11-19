import { formatDateLong } from "@/lib/formatters";
import { calculateCycles } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Ovulation and fertile window calculator",
  fields: [
    { id: "lmp", label: "First day of your last period", type: "date", default: "2026-11-01" },
    { id: "cycle", label: "Average cycle length", suffix: "Days", min: 21, max: 45, integer: true, default: 28, hint: "Counted from the first day of one period to the first day of the next." },
  ],
  run({ lmp, cycle }) {
    const cycles = calculateCycles({ lmp, cycleLength: cycle });
    const [first] = cycles;
    return {
      rows: [
        { label: "Estimated ovulation day", value: formatDateLong(first.ovulation), emphasis: true },
        { label: "Fertile window", value: `${formatDateLong(first.fertileStart)} to ${formatDateLong(first.fertileEnd)}` },
        { label: "Next period expected", value: formatDateLong(first.nextPeriod) },
      ],
      table: { title: "Next three cycles", caption: "Estimated dates for the next three cycles", columns: ["Period starts", "Ovulation", "Fertile window"], rows: cycles.map((c) => [formatDateLong(c.nextPeriod), formatDateLong(c.ovulation), `${formatDateLong(c.fertileStart)} – ${formatDateLong(c.fertileEnd)}`]) },
      notes: ["These are estimates based on a regular cycle. Ovulation can vary from cycle to cycle. This tool must not be used as a method of contraception. Speak to a doctor if you have irregular cycles or difficulty conceiving."],
    };
  },
};
