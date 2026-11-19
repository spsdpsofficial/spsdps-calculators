/**
 * Compare unit prices of up to three products. A product is included when both its price and quantity are above zero.
 * `options` = [{ name, price, quantity }]. Returns them ranked cheapest first, with savings against the dearest.
 */
export function comparePrices(options) {
  const valid = options
    .filter((o) => o.price > 0 && o.quantity > 0)
    .map((o) => ({ ...o, unitPrice: o.price / o.quantity }));
  if (valid.length < 2) return { error: "Enter the price and quantity of at least two products." };
  const ranked = [...valid].sort((a, b) => a.unitPrice - b.unitPrice);
  const best = ranked[0];
  const worst = ranked[ranked.length - 1];
  return {
    ranked: ranked.map((o) => ({ ...o, extraPercent: ((o.unitPrice - best.unitPrice) / best.unitPrice) * 100 })),
    best,
    tie: best.unitPrice === worst.unitPrice,
    savingPercent: ((worst.unitPrice - best.unitPrice) / worst.unitPrice) * 100,
  };
}
