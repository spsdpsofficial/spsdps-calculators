/**
 * Bill from a three-slab tariff the user enters (tariffs differ by state and consumer category).
 * Slab 1 covers the first `slab1Units`, slab 2 the next `slab2Units`, slab 3 everything after.
 */
export function calculateElectricityBill({ units, slab1Units, rate1, slab2Units, rate2, rate3, fixedCharge, dutyPercent }) {
  const u1 = Math.min(units, slab1Units);
  const u2 = Math.min(Math.max(units - slab1Units, 0), slab2Units);
  const u3 = Math.max(units - slab1Units - slab2Units, 0);
  const slabs = [
    { units: u1, rate: rate1, amount: u1 * rate1 },
    { units: u2, rate: rate2, amount: u2 * rate2 },
    { units: u3, rate: rate3, amount: u3 * rate3 },
  ];
  const energyCharge = slabs.reduce((sum, s) => sum + s.amount, 0);
  const subtotal = energyCharge + fixedCharge;
  const duty = (subtotal * dutyPercent) / 100;
  const total = subtotal + duty;
  return { slabs, energyCharge, fixedCharge, duty, total, averagePerUnit: units === 0 ? 0 : total / units };
}
