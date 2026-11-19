/** Future cost of something that costs `amount` today, and what `amount` will buy in `years`. */
export function calculateInflation({ amount, inflationPercent, years }) {
  const factor = (1 + inflationPercent / 100) ** years;
  return {
    futureCost: amount * factor,
    purchasingPower: amount / factor,
    increase: amount * factor - amount,
    powerLost: amount - amount / factor,
  };
}

/** Rate of inflation implied by a price moving from `oldPrice` to `newPrice` over `years`. */
export function impliedInflation({ oldPrice, newPrice, years }) {
  return ((newPrice / oldPrice) ** (1 / years) - 1) * 100;
}
