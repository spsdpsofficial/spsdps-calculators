// Shared cost / price / margin / markup maths (used by Profit Margin and Markup calculators).
//   margin  = profit / selling price      markup = profit / cost
// Both are percentages. Functions return numbers (no rounding) or { error }.

export function fromCostAndPrice(cost, price) {
  const profit = price - cost;
  return {
    cost,
    price,
    profit,
    marginPercent: price === 0 ? 0 : (profit / price) * 100,
    markupPercent: cost === 0 ? 0 : (profit / cost) * 100,
  };
}

export function priceFromCostAndMarkup(cost, markupPercent) {
  return fromCostAndPrice(cost, cost * (1 + markupPercent / 100));
}

export function priceFromCostAndMargin(cost, marginPercent) {
  if (marginPercent >= 100) return { error: "A margin of 100% or more is not possible. Margin must be below 100%." };
  return fromCostAndPrice(cost, cost / (1 - marginPercent / 100));
}

export function costFromPriceAndMargin(price, marginPercent) {
  if (marginPercent >= 100) return { error: "A margin of 100% or more is not possible. Margin must be below 100%." };
  return fromCostAndPrice(price * (1 - marginPercent / 100), price);
}

export function costFromPriceAndMarkup(price, markupPercent) {
  return fromCostAndPrice(price / (1 + markupPercent / 100), price);
}

/** Result rows shared by both tools. */
export function pricingRows(r, money, percent) {
  return [
    { label: "Selling price", value: money(r.price) },
    { label: "Cost price", value: money(r.cost) },
    { label: "Profit", value: money(r.profit), emphasis: true },
    { label: "Profit margin (on selling price)", value: percent(r.marginPercent) },
    { label: "Markup (on cost)", value: percent(r.markupPercent) },
  ];
}
