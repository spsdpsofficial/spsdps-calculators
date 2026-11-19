import { costFromPriceAndMarkup, fromCostAndPrice, priceFromCostAndMarkup } from "@/lib/business/pricing";

/** mode: "price" (cost + markup), "markup" (cost + price) or "cost" (price + markup). */
export function calculateMarkup({ mode, cost, price, markup }) {
  if (mode === "price") return priceFromCostAndMarkup(cost, markup);
  if (mode === "cost") return costFromPriceAndMarkup(price, markup);
  return fromCostAndPrice(cost, price);
}
