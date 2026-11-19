/** Four common percentage questions. Each returns { value, ... } or { error }. */
export function percentOf(percent, base) {
  return { value: (percent / 100) * base };
}

export function whatPercent(part, whole) {
  if (whole === 0) return { error: "The total cannot be zero." };
  return { value: (part / whole) * 100 };
}

export function percentChange(from, to) {
  if (from === 0) return { error: "The starting value cannot be zero." };
  const change = to - from;
  return { value: (change / Math.abs(from)) * 100, change };
}

export function addOrSubtractPercent(base, percent, direction) {
  const amount = (percent / 100) * base;
  return { value: direction === "add" ? base + amount : base - amount, amount };
}
