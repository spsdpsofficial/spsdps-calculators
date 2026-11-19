import { PT_STATES } from "@/lib/tax/professionalTax";

const findSlab = (slabs, income) => slabs.find((slab) => income <= slab.upTo);

/**
 * Professional tax for a monthly gross salary in a state.
 * Returns the amount per deduction period, an average monthly figure and the yearly total.
 */
export function calculateProfessionalTax({ stateId, monthlyGross }) {
  const state = PT_STATES[stateId];
  if (!state) return { error: "Choose a state from the list." };

  if (state.period === "half-year") {
    const slab = findSlab(state.slabs, monthlyGross * 6);
    return { state, perPeriod: slab.amount, periodLabel: "half-year", monthly: slab.amount / 6, yearly: slab.amount * 2 };
  }

  const slab = findSlab(state.slabs, monthlyGross);
  const isTopSlab = slab.upTo === Infinity;
  const yearly =
    isTopSlab && state.februaryTopSlabAmount ? slab.amount * 11 + state.februaryTopSlabAmount : slab.amount * 12;
  return { state, perPeriod: slab.amount, periodLabel: "month", monthly: slab.amount, yearly, februaryAmount: isTopSlab ? state.februaryTopSlabAmount : undefined };
}
