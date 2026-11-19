import { addDays } from "@/lib/helpers/dates";

export const LUTEAL_DAYS = 14;

/** Next `cycles` cycles from the start of the last period. Ovulation ≈ 14 days before the next period. */
export function calculateCycles({ lmp, cycleLength, cycles = 3 }) {
  return Array.from({ length: cycles }, (_, i) => {
    const start = addDays(lmp, cycleLength * (i + 1));
    const ovulation = addDays(start, -LUTEAL_DAYS);
    return { nextPeriod: start, ovulation, fertileStart: addDays(ovulation, -5), fertileEnd: addDays(ovulation, 1) };
  });
}
