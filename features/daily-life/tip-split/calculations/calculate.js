/** Tip and bill split. `roundUp` makes each person pay a whole number of rupees, rounding up. */
export function splitBill({ bill, tipPercent, people, roundUp = false }) {
  const tip = (bill * tipPercent) / 100;
  const total = bill + tip;
  const exactShare = total / people;
  const share = roundUp ? Math.ceil(exactShare - 1e-9) : exactShare;
  const collected = share * people;
  return { tip, total, exactShare, share, collected, extra: collected - total };
}
