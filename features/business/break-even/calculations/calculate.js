/**
 * Break-even analysis. Contribution per unit = price − variable cost.
 * Units are rounded up, because a fraction of a unit cannot be sold.
 */
export function calculateBreakEven({ fixedCosts, price, variableCost, targetProfit = 0 }) {
  const contribution = price - variableCost;
  if (contribution <= 0) return { error: "The selling price must be higher than the variable cost per unit, otherwise every sale adds to your loss." };
  const breakEvenUnits = Math.ceil(fixedCosts / contribution);
  const targetUnits = Math.ceil((fixedCosts + targetProfit) / contribution);
  return {
    contribution,
    contributionRatio: (contribution / price) * 100,
    breakEvenUnits,
    breakEvenRevenue: breakEvenUnits * price,
    targetUnits,
    targetRevenue: targetUnits * price,
  };
}
