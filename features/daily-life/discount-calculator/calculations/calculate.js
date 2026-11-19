/** Apply a first discount and an optional second discount on the reduced price. */
export function calculateDiscount({ price, discountPercent, extraPercent = 0 }) {
  const afterFirst = price * (1 - discountPercent / 100);
  const finalPrice = afterFirst * (1 - extraPercent / 100);
  const saved = price - finalPrice;
  return {
    afterFirst,
    finalPrice,
    saved,
    effectivePercent: price === 0 ? 0 : (saved / price) * 100,
  };
}

/** Original price from the discounted price and the discount percentage. */
export function originalFromDiscounted({ finalPrice, discountPercent }) {
  if (discountPercent >= 100) return { error: "A discount of 100% or more cannot be reversed." };
  return { originalPrice: finalPrice / (1 - discountPercent / 100) };
}
